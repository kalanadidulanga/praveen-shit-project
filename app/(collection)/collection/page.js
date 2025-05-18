"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { ShoppingBag, CheckCircle, Clock3, AlertCircle, XCircle, Package } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function CollectionPage() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check if user is a collector, if not redirect to home
    if (session?.user) {
      if (session.user.userType?.toUpperCase() !== 'COLLECTOR') {
        router.push('/');
        toast({
          title: "Access Restricted",
          description: "Only collectors can access this page",
          variant: "destructive",
        });
      } else {
        fetchOrders();
      }
    }
  }, [session, router, toast]);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders for collector...");
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch orders');
      
      console.log(`Orders API response:`, data);
      
      if (data.success && Array.isArray(data.orders)) {
        // Sort orders by created date
        const sorted = data.orders.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log(`Sorted ${sorted.length} orders`);
        setOrders(sorted);
      } else {
        console.log("No orders returned or invalid response format");
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load orders",
        variant: "destructive",
      });
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    // Toggle expanded state if already fetched
    if (orderDetails[orderId]) {
      setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
      return;
    }

    try {
      console.log(`Fetching details for order ${orderId}...`);
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch order details');
      
      console.log(`Order details:`, data.order);
      
      // Save details to state
      setOrderDetails(prev => ({
        ...prev,
        [orderId]: data.order
      }));
      
      // Expand this order
      setExpandedOrderId(orderId);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  // Helper to get status badge for orders
  const getOrderStatusBadge = (status) => {
    switch(status) {
      case 'PENDING':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'ACCEPTED':
        return <Badge className="bg-blue-500">Accepted</Badge>;
      case 'PAID':
        return <Badge className="bg-purple-500">Paid</Badge>;
      case 'DELIVERED':
        return <Badge className="bg-indigo-500">Delivered</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };
  
  // Helper to get icon for order status
  const getOrderStatusIcon = (status) => {
    switch(status) {
      case 'PENDING':
        return <Clock3 className="h-5 w-5 text-yellow-500" />;
      case 'ACCEPTED':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'PAID':
        return <ShoppingBag className="h-5 w-5 text-purple-500" />;
      case 'DELIVERED':
        return <Package className="h-5 w-5 text-indigo-500" />;
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      console.log(`Updating order ${orderId} status to ${newStatus}...`);
      
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Status update failed:', data);
        throw new Error(data.error || 'Failed to update order status');
      }
      
      console.log('Status update successful:', data);
      
      // Update the orders list
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      // Update the order details
      if (orderDetails[orderId]) {
        setOrderDetails(prev => ({
          ...prev,
          [orderId]: { ...prev[orderId], status: newStatus }
        }));
      }
      
      toast({
        title: "Status updated",
        description: `Order status has been updated to ${newStatus}`,
        variant: "success"
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: error.message || 'An error occurred while updating the order status',
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="h-[70vh] flex items-center justify-center">
          <div className="animate-pulse text-center">
            <h2 className="text-xl font-semibold">Loading data...</h2>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">
            Manage customer orders and update their status
          </p>
        </div>
        
        <div className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Orders</h2>
            <Link href="/marketplace">
              <Button>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Products
        </Button>
            </Link>
      </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium">No orders yet</h3>
                <p className="text-gray-500 text-center mt-2 mb-6">
                  No orders have been placed yet.
                </p>
                <Link href="/marketplace">
                  <Button>Browse Marketplace</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          {getOrderStatusIcon(order.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">Order #{order.id.substring(0, 8)}</h3>
                            {getOrderStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Product:</span> {order.listing?.title || "Unknown Product"}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Buyer:</span> {order.buyer?.name || "Unknown User"}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Quantity: {order.quantity} items
                          </p>
                          <p className="text-sm font-medium text-green-600 mt-1">
                            Total: ₹{order.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <div className="text-gray-500 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => fetchOrderDetails(order.id)}
                        >
                          {expandedOrderId === order.id ? "Hide Details" : "View Details"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Expanded Order Details */}
                    {expandedOrderId === order.id && orderDetails[order.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">Order Information</h4>
                            <p className="text-sm">
                              <span className="font-medium">Order Date:</span>{" "}
                              {new Date(orderDetails[order.id].createdAt).toLocaleString()}
                            </p>
                            <p className="text-sm mt-1">
                              <span className="font-medium">Payment Method:</span>{" "}
                              {orderDetails[order.id].paymentMethod || "COD"}
                            </p>
                            {orderDetails[order.id].notes && (
                              <p className="text-sm mt-1">
                                <span className="font-medium">Notes:</span>{" "}
                                {orderDetails[order.id].notes}
                              </p>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Buyer Information</h4>
                            {orderDetails[order.id].buyer && (
                              <>
                                <p className="text-sm">
                                  <span className="font-medium">Name:</span>{" "}
                                  {orderDetails[order.id].buyer.name}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Email:</span>{" "}
                                  {orderDetails[order.id].buyer.email}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Phone:</span>{" "}
                                  {orderDetails[order.id].buyer.phoneNumber || "Not provided"}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Delivery Address:</span>{" "}
                                  {orderDetails[order.id].deliveryAddress || "Not specified"}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Status Update Buttons */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <h4 className="w-full font-semibold mb-2">Update Status:</h4>
                          {order.status !== 'ACCEPTED' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                              onClick={() => handleStatusUpdate(order.id, 'ACCEPTED')}
                            >
                              Accept Order
                            </Button>
                          )}
                          {(order.status === 'ACCEPTED' || order.status === 'PENDING') && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-purple-50 text-purple-600 hover:bg-purple-100"
                              onClick={() => handleStatusUpdate(order.id, 'PAID')}
                            >
                              Mark as Paid
                            </Button>
                          )}
                          {(order.status === 'PAID' || order.status === 'ACCEPTED') && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              onClick={() => handleStatusUpdate(order.id, 'DELIVERED')}
                            >
                              Mark as Delivered
                            </Button>
                          )}
                          {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-green-50 text-green-600 hover:bg-green-100"
                              onClick={() => handleStatusUpdate(order.id, 'COMPLETED')}
                            >
                              Complete Order
                            </Button>
                          )}
                          {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                              onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}
                            >
                              Cancel Order
                            </Button>
                          )}
                        </div>
            </div>
          )}
                  </CardContent>
            </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
} 