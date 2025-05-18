import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userType = session.user.userType?.toUpperCase() || 'INDIVIDUAL';

    // Initialize dashboard data
    let dashboardData = {
      collections: [],
      products: [],
      points: 0,
      totalCollections: 0,
      totalProducts: 0,
      totalOrders: 0,
      recentActivity: []
    };

    try {
      // Base query for collections
      const collections = await prisma.collection.findMany({
        where: {
          userId: userId
        },
        select: {
          id: true,
          type: true,
          date: true,
          status: true,
          address: true,
          wasteType: true,
          quantity: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
              phoneNumber: true,
              address: true
            }
          }
        },
        orderBy: {
          date: 'desc'
        },
        take: 5
      });

      // Base query for orders
      const orders = await prisma.order.findMany({
        where: {
          buyerId: userId
        },
        select: {
          id: true,
          status: true,
          totalPrice: true,
          createdAt: true,
          buyer: {
            select: {
              name: true,
              email: true,
              phoneNumber: true,
              address: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      });

      // Update base data
      dashboardData.collections = collections || [];
      dashboardData.totalCollections = collections?.length || 0;

      // Add role-specific data
      switch (userType) {
        case 'INDIVIDUAL':
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              points: true
            }
          });
          
          const individualOrders = await prisma.order.count({
            where: { buyerId: userId }
          });

          dashboardData = {
            ...dashboardData,
            points: user?.points || 0,
            totalOrders: individualOrders || 0
          };
          break;

        case 'BUSINESS':
          const businessOrders = await prisma.order.findMany({
            where: { buyerId: userId },
            select: {
              totalPrice: true,
              quantity: true,
              status: true,
              createdAt: true,
              listing: {
                select: {
                  title: true,
                  wasteType: true
                }
              }
            }
          });
          
          dashboardData = {
            ...dashboardData,
            orders: businessOrders || [],
            totalOrders: businessOrders?.length || 0,
            totalSpent: businessOrders?.reduce((sum, order) => 
              sum + (parseFloat(order.totalPrice) || 0), 0) || 0
          };
          break;

        case 'COLLECTOR':
          const collectorProducts = await prisma.product.findMany({
            where: { 
              sellerId: userId
            },
            select: {
              id: true,
              name: true,
              price: true,
              category: true,
              quantity: true,
              inStock: true,
              createdAt: true
            }
          });

          // Get all listings by this collector
          const collectorListings = await prisma.listing.findMany({
            where: {
              userId: userId
            },
            select: {
              id: true
            }
          });

          // Get listing IDs for the query
          const listingIds = collectorListings.map(listing => listing.id);

          // Get orders for those listings
          const collectorOrders = await prisma.order.findMany({
            where: {
              listingId: {
                in: listingIds
              }
            },
            select: {
              id: true,
              status: true,
              totalPrice: true,
              quantity: true,
              createdAt: true,
              listingId: true,
              buyerId: true,
              listing: {
                select: {
                  title: true,
                  wasteType: true,
                  price: true
                }
              },
              buyer: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  phoneNumber: true,
                  address: true,
                  userType: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
          
          // Log the orders for debugging
          console.log(`Found ${collectorOrders.length} orders for collector listings: ${JSON.stringify(listingIds)}`);
          if (collectorOrders.length > 0) {
            console.log('Order IDs:', collectorOrders.map(order => order.id));
            console.log('Buyer IDs:', collectorOrders.map(order => order.buyerId));
            console.log('Listing IDs:', collectorOrders.map(order => order.listingId));
          }
          
          dashboardData = {
            ...dashboardData,
            products: collectorProducts || [],
            orders: collectorOrders || [],
            totalProducts: collectorProducts?.length || 0,
            totalOrders: collectorOrders?.length || 0,
            totalRevenue: collectorOrders?.reduce((sum, order) => 
              sum + (parseFloat(order.totalPrice) || 0), 0) || 0
          };
          break;
      }

      // Format recent activity based on user type
      let recentActivityItems = [];
      
      // Add collections to recent activity
      if (collections && collections.length > 0) {
        recentActivityItems.push(
          ...collections.map(c => ({
            type: 'collection',
            title: `Collection ${(c.status || 'scheduled').toLowerCase()}`,
            description: `${c.wasteType || 'Mixed Waste'} - ${c.quantity || 0}kg`,
            date: c.date ? new Date(c.date).toISOString() : new Date().toISOString(),
            status: c.status
          }))
        );
      }
      
      // Add orders to recent activity with more details
      if (orders && orders.length > 0) {
        // For business users, include more order details
        if (userType === 'BUSINESS') {
          recentActivityItems.push(
            ...orders.map(o => {
              let statusDescription = '';
              
              // Create descriptive status message based on order status
              switch(o.status) {
                case 'PENDING':
                  statusDescription = 'Waiting for collector approval';
                  break;
                case 'ACCEPTED':
                  statusDescription = 'Order accepted by collector';
                  break;
                case 'PAID':
                  statusDescription = 'Payment received';
                  break;
                case 'DELIVERED':
                  statusDescription = 'Materials delivered';
                  break;
                case 'COMPLETED':
                  statusDescription = 'Order fulfilled successfully';
                  break;
                case 'CANCELLED':
                  statusDescription = 'Order was cancelled';
                  break;
                default:
                  statusDescription = 'Order placed';
              }
              
              return {
                type: 'order',
                title: `Order ${(o.status || 'placed').toLowerCase()}`,
                description: o.listing ? 
                  `${o.listing.title || 'Waste Collection'} - ${statusDescription}` : 
                  `Order #${o.id} - ${statusDescription}`,
                date: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
                status: o.status,
                orderId: o.id
              };
            })
          );
        } else {
          // For other user types, use simpler format
          recentActivityItems.push(
            ...orders.map(o => ({
              type: 'order',
              title: `Order ${(o.status || 'placed').toLowerCase()}`,
              description: o.listing ? 
                `${o.listing.title || 'Waste Collection'}` : 
                `Order #${o.id}`,
              date: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
              status: o.status,
              orderId: o.id
            }))
          );
        }
      }
      
      // Sort by date (newest first) and limit to 5 items
      dashboardData.recentActivity = recentActivityItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      return NextResponse.json({
        success: true,
        ...dashboardData
      });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
} 