"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Recycle,
  Calendar,
  Award,
  Truck,
  ChevronRight,
  CreditCard,
  TrendingUp,
  User,
  ShoppingBag,
  Package,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState({
    collections: [],
    products: [],
    points: 0,
    totalCollections: 0,
    totalProducts: 0,
    totalOrders: 0,
    recentActivity: [],
    totalSpent: 0,
    totalRevenue: 0,
    orders: [],
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get tab from URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get("tab");
      if (tab && ["overview", "products", "post"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData();
      fetchUserProducts();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch dashboard data");
      }

      setDashboardData({
        collections: data.collections || [],
        products: data.products || [],
        points: data.points || 0,
        totalCollections: data.totalCollections || 0,
        totalProducts: data.totalProducts || 0,
        totalOrders: data.totalOrders || 0,
        recentActivity: data.recentActivity || [],
        totalSpent: data.totalSpent || 0,
        totalRevenue: data.totalRevenue || 0,
        orders: data.orders || [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load dashboard data",
        variant: "destructive",
      });
    }
  };

  const fetchUserProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/products/user");
      const data = await response.json();

      if (response.ok && data.success) {
        setUserProducts(data.products || []);
      } else {
        throw new Error(data.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching user products:", error);
      toast({
        title: "Error",
        description: error.message || "Could not load your products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Remove the deleted product from the local state
        setUserProducts(
          userProducts.filter((product) => product.id !== productId)
        );
        toast({
          title: "Success",
          description: "Product deleted successfully",
          variant: "success",
        });
      } else {
        throw new Error(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: error.message || "Could not delete product",
        variant: "destructive",
      });
    }
  };

  // Calculate total recycled quantity
  const totalRecycled = dashboardData.collections.reduce(
    (sum, collection) => sum + (parseFloat(collection.quantity) || 0),
    0
  );

  // Calculate total order weight for business users
  const totalOrderWeight = dashboardData.orders.reduce(
    (sum, order) => sum + (parseFloat(order.quantity) || 0),
    0
  );

  const getStatsCards = () => {
    if (!session?.user?.userType) return [];

    switch (session.user.userType) {
      case "individual":
        return [
          {
            title: "Total Collections",
            value: dashboardData.totalCollections,
            icon: Recycle,
            description: "Scheduled waste collections",
          },
          {
            title: "Points Earned",
            value: dashboardData.points,
            icon: Award,
            description: "Total recycling points",
          },
          {
            title: "Orders Placed",
            value: dashboardData.totalOrders,
            icon: ShoppingBag,
            description: "Products purchased",
          },
          {
            title: "Active Collections",
            value: dashboardData.collections.filter(
              (c) => c.status === "SCHEDULED"
            ).length,
            icon: Truck,
            description: "Pending collections",
          },
        ];
      case "business":
        return [
          {
            title: "Total Orders",
            value: dashboardData.totalOrders,
            icon: ShoppingBag,
            description: "Bulk orders placed",
          },
          {
            title: "Active Orders",
            value:
              dashboardData.orders?.filter((o) => o.status === "PENDING")
                .length || 0,
            icon: Package,
            description: "Pending deliveries",
          },
          {
            title: "Total Spent",
            value: `₹${dashboardData.totalSpent || 0}`,
            icon: CreditCard,
            description: "Purchase value",
          },
          {
            title: "Market Trends",
            value: dashboardData.marketTrends || "Stable",
            icon: TrendingUp,
            description: "Price trends",
          },
        ];
      case "collector":
        return [
          {
            title: "Collections Made",
            value: dashboardData.totalCollections,
            icon: Recycle,
            description: "Total collections",
          },
          {
            title: "Active Requests",
            value: dashboardData.collections.filter(
              (c) => c.status === "SCHEDULED"
            ).length,
            icon: Truck,
            description: "Pending pickups",
          },
          {
            title: "Products Listed",
            value: dashboardData.totalProducts,
            icon: Package,
            description: "Active listings",
          },
          {
            title: "Total Revenue",
            value: `₹${dashboardData.totalRevenue || 0}`,
            icon: CreditCard,
            description: "Earnings",
          },
        ];
      default:
        return [];
    }
  };

  // Only render the dashboard content if authenticated and not loading
  if (authLoading || !user) {
    return (
      <Container>
        <div className="h-[70vh] flex items-center justify-center">
          <div className="animate-pulse text-center">
            <h2 className="text-xl font-semibold">Loading dashboard...</h2>
          </div>
        </div>
      </Container>
    );
  }

  // Render the dashboard with tabs
  return (
    <Container>
      <div className="space-y-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            {user?.userType?.toUpperCase() === "INDIVIDUAL" && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setActiveTab("post")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Post New Product
              </Button>
            )}
          </div>
        </div>

        {user?.userType?.toUpperCase() === "INDIVIDUAL" && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="post">Post Product</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-green-800/70">Total Recycled</p>
                        <h3 className="text-2xl font-bold text-green-950">{totalRecycled.toFixed(1)} kg</h3>
                        <p className="text-xs text-green-800/60">Since you joined</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100/80 flex items-center justify-center">
                        <Recycle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400" 
                        style={{ width: `${Math.min(totalRecycled / 5, 100)}%` }} 
                      />
                    </div>
                    <p className="mt-2 text-xs text-green-800/70">
                      {totalRecycled > 50 
                        ? "Amazing progress! Keep it up" 
                        : "Every bit helps the planet"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-800/70">Reward Points</p>
                        <h3 className="text-2xl font-bold text-blue-950">{dashboardData.points} pts</h3>
                        <p className="text-xs text-blue-800/60">Available to redeem</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-100/80 flex items-center justify-center">
                        <Award className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Link 
                        href="/rewards" 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center group"
                      >
                        Redeem Points
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-purple-800/70">Collections</p>
                        <h3 className="text-2xl font-bold text-purple-950">{dashboardData.totalCollections}</h3>
                        <p className="text-xs text-purple-800/60">Total scheduled pickups</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-100/80 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Link 
                        href="/collections" 
                        className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors flex items-center group"
                      >
                        Schedule Pickup
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-amber-800/70">Orders</p>
                        <h3 className="text-2xl font-bold text-amber-950">{dashboardData.totalOrders}</h3>
                        <p className="text-xs text-amber-800/60">Products purchased</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-amber-100/80 flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Link 
                        href="/marketplace" 
                        className="text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors flex items-center group"
                      >
                        Shop Now
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Two Column Layout for Timeline and Impact */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Timeline */}
                <Card className="lg:col-span-2 border-none shadow-md">
                  <CardHeader className="border-b bg-slate-50/50">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-green-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {dashboardData.recentActivity.length > 0 ? (
                      <div className="divide-y">
                        {dashboardData.recentActivity.slice(0, 4).map((activity, index) => (
                          <div key={index} className="p-4 hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className={`mt-1.5 h-8 w-8 rounded-full flex items-center justify-center
                                ${activity.type === 'collection' 
                                  ? 'bg-green-100 text-green-600' 
                                  : activity.type === 'order' 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-gray-100 text-gray-600'}`}>
                                {activity.type === 'collection' 
                                  ? <Recycle className="h-4 w-4" /> 
                                  : activity.type === 'order' 
                                    ? <ShoppingBag className="h-4 w-4" /> 
                                    : <User className="h-4 w-4" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <h4 className="font-medium text-slate-900">{activity.title}</h4>
                                  <time className="text-xs text-slate-500">
                                    {new Date(activity.date).toLocaleDateString(undefined, { 
                                      month: 'short', 
                                      day: 'numeric', 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </time>
                                </div>
                                <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
                                {activity.status && (
                                  <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${activity.status === 'PENDING' 
                                      ? 'bg-yellow-100 text-yellow-800' 
                                      : activity.status === 'COMPLETED' 
                                        ? 'bg-green-100 text-green-800' 
                                        : activity.status === 'CANCELLED' 
                                          ? 'bg-red-100 text-red-800' 
                                          : 'bg-blue-100 text-blue-800'}`}>
                                    {activity.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <Calendar className="h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No recent activity</h3>
                        <p className="mt-1 text-sm text-slate-500 max-w-sm">
                          You don't have any activity yet. Start by scheduling a collection or shopping at the marketplace.
                        </p>
                      </div>
                    )}
                    {dashboardData.recentActivity.length > 0 && (
                      <div className="p-4 border-t">
                        <Link href="/activity" className="text-sm text-green-600 hover:text-green-700 transition-colors flex items-center justify-center">
                          View All Activity
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Environmental Impact */}
                <Card className="border-none shadow-md">
                  <CardHeader className="border-b bg-slate-50/50">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                      Environmental Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-50 mb-4">
                        <Recycle className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">{totalRecycled.toFixed(1)} kg</h3>
                      <p className="text-sm text-slate-600">Plastic waste diverted from landfill</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">CO₂ Reduction</span>
                          <span className="text-green-600 font-medium">{(totalRecycled * 2.5).toFixed(1)} kg</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${Math.min((totalRecycled * 2.5) / 100 * 100, 100)}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Water Saved</span>
                          <span className="text-blue-600 font-medium">{(totalRecycled * 22).toFixed(1)} L</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${Math.min((totalRecycled * 22) / 1000 * 100, 100)}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Energy Saved</span>
                          <span className="text-amber-600 font-medium">{(totalRecycled * 5.8).toFixed(1)} kWh</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: `${Math.min((totalRecycled * 5.8) / 100 * 100, 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <Link href="/impact" className="block text-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                      View Detailed Environmental Impact Report
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6 mt-6">
              <h2 className="text-2xl font-semibold">My Products</h2>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Loading your products...</p>
                </div>
              ) : userProducts.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      No Products Yet
                    </h3>
                    <p className="text-gray-500 mb-6 text-center max-w-md">
                      You haven't posted any products yet. Start selling your
                      recycled products to earn more rewards!
                    </p>
                    <Button onClick={() => setActiveTab("post")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Product
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden group border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-xl"
                    >
                      <div className="aspect-video w-full relative overflow-hidden rounded-t-xl">
                        <img
                          src={
                            product.image || "/images/placeholder-product.jpg"
                          }
                          alt={product.name}
                          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {/* Enhanced discount badge with animation */}
                        {product.discount > 0 && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-2 group-hover:scale-110 transition-all duration-300">
                            -{product.discount}% OFF
                          </div>
                        )}
                        {/* New status indicator */}
                        <div className="absolute bottom-3 left-3 bg-green-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                          In Stock
                        </div>
                      </div>

                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-green-700 transition-colors duration-300">
                            {product.name}
                          </h3>
                          <div className="flex flex-col items-end">
                            {product.discount > 0 ? (
                              <>
                                <span className="font-extrabold text-lg text-green-600">
                                  ₹
                                  {(
                                    (product.price * (100 - product.discount)) /
                                    100
                                  ).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500 line-through -mt-1">
                                  ₹{product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="font-extrabold text-lg text-green-600">
                                ₹{product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full">
                            {product.category}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            Added{" "}
                            {new Date(
                              product.createdAt || Date.now()
                            ).toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                router.push(`/marketplace/edit/${product.id}`)
                              }
                              className="rounded-full hover:bg-green-50 hover:text-green-700 transition-all duration-300"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-500 hover:bg-red-600 rounded-full transition-all duration-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="post" className="space-y-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Post New Product</h2>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("products")}
                >
                  Cancel
                </Button>
              </div>

              <Card>
                <CardContent className="pt-6">
                  {/* Here you can either include your product creation form directly 
                      or use an iframe/component to load the existing create form */}
                  <div className="text-center py-6">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => router.push("/marketplace/create")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Product
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* For other user types, keep the original dashboard layout */}
        {user?.userType?.toUpperCase() !== "INDIVIDUAL" && (
          <div className="space-y-6">
            {/* Original dashboard content */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {/* Welcome Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Hello, {user?.name || "User"}!</p>
                  <p className="text-sm text-muted-foreground">
                    Your account type: {session?.user?.userType || "Individual"}
                  </p>
                  <Link
                    href="/profile"
                    className="text-primary hover:underline mt-4 inline-block"
                  >
                    View Profile <ChevronRight className="inline h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              {/* Reward Points Card */}
              {session?.user?.userType !== "BUSINESS" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Reward Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {dashboardData.points} pts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your current balance
                    </p>
                    <Link
                      href="/rewards"
                      className="text-primary hover:underline mt-4 inline-block"
                    >
                      View Rewards <ChevronRight className="inline h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Impact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  {session?.user?.userType === "BUSINESS" ? (
                    <>
                      <p className="text-3xl font-bold">
                        {totalOrderWeight.toFixed(1)} kg
                      </p>
                      <p className="text-sm text-muted-foreground">
                        total plastic waste ordered
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-3xl font-bold">
                        {totalRecycled.toFixed(1)} kg
                      </p>
                      <p className="text-sm text-muted-foreground">
                        plastic recycled
                      </p>
                    </>
                  )}
                  <Link
                    href="/impact"
                    className="text-primary hover:underline mt-4 inline-block"
                  >
                    View Impact <ChevronRight className="inline h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {getStatsCards().map((card, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      {/* Activity type indicator */}
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "collection"
                            ? "bg-green-500"
                            : activity.status === "PENDING"
                            ? "bg-yellow-500"
                            : activity.status === "ACCEPTED"
                            ? "bg-blue-500"
                            : activity.status === "PAID"
                            ? "bg-purple-500"
                            : activity.status === "DELIVERED"
                            ? "bg-indigo-500"
                            : activity.status === "COMPLETED"
                            ? "bg-green-600"
                            : activity.status === "CANCELLED"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      />

                      {/* Activity details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{activity.title}</p>
                          {activity.type === "order" && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                activity.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : activity.status === "ACCEPTED"
                                  ? "bg-blue-100 text-blue-800"
                                  : activity.status === "PAID"
                                  ? "bg-purple-100 text-purple-800"
                                  : activity.status === "DELIVERED"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : activity.status === "COMPLETED"
                                  ? "bg-green-100 text-green-800"
                                  : activity.status === "CANCELLED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {activity.status}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                        {activity.type === "order" &&
                          session?.user?.userType === "business" && (
                            <Link
                              href={`/orders/${activity.orderId}`}
                              className="text-xs text-primary hover:underline mt-1 inline-block"
                            >
                              View Order Details
                            </Link>
                          )}
                      </div>

                      {/* Activity date */}
                      <time className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(activity.date).toLocaleDateString()}
                      </time>
                    </div>
                  ))}
                  {dashboardData.recentActivity.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Container>
  );
}
