"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Calendar, 
  Package, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  DollarSign, 
  BarChart3, 
  RefreshCcw, 
  ClipboardList, 
  ShoppingCart,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Eye,
  CircleCheck,
  CircleX,
  Clock,
  AlertTriangle
} from "lucide-react";
import { CollectorNavbar } from "@/components/layout/CollectorNavbar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CollectorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  
  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    collections: [],
    orders: [],
    totalCollections: 0,
    totalOrders: 0,
    totalRevenue: 0,
    products: [],
    totalProducts: 0
  });
  
  // Orders state
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  
  // Dashboard loading states
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData();
      fetchOrders();
    }
  }, [session]);
  
  // Apply filters when orders, statusFilter, searchQuery, or sortBy change
  useEffect(() => {
    if (orders.length > 0) {
      applyFilters();
    } else {
      setFilteredOrders([]);
    }
  }, [orders, statusFilter, searchQuery, sortBy]);
  
  // Apply filters to orders
  const applyFilters = () => {
    let result = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'ALL') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(order => 
        order.buyer?.name?.toLowerCase().includes(query) ||
        order.listing?.title?.toLowerCase().includes(query) ||
        order.listing?.wasteType?.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-desc':
        result.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case 'price-asc':
        result.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      default:
        break;
    }
    
    setFilteredOrders(result);
  };

  const fetchDashboardData = async () => {
    try {
      setDashboardLoading(true);
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      if (data.success) {
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive"
      });
    } finally {
      setDashboardLoading(false);
    }
  };
  
  const fetchOrders = async () => {
    try {
      console.log('🔄 Collector page: Starting to fetch orders...');
      setOrdersLoading(true);
      const response = await fetch('/api/orders');
      console.log('📡 Collector page: API response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Collector page: Received data:', {
        success: data.success,
        orderCount: data.orders?.length || 0,
        totalCount: data.totalCount
      });
      
      if (data.success && data.orders) {
        // Log all order IDs for debugging
        console.log('📝 Collector page: Order IDs:', data.orders.map(order => order.id));
        
        console.log('✅ Collector page: Successfully set orders data');
        setOrders(data.orders);
        // Also set filtered orders directly to ensure all orders are displayed initially
        setFilteredOrders(data.orders);
      } else {
        console.error('❌ Collector page: API returned error:', data.error);
      }
    } catch (error) {
      console.error('❌ Collector page: Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      });
    } finally {
      console.log('🏁 Collector page: Finished orders fetch attempt');
      setOrdersLoading(false);
    }
  };
  
  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };
  
  // Handle order status update
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      // Show loading toast
      toast({
        title: "Updating order status",
        description: "Please wait...",
      });
      
      // Call the API to update the order status
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update order status');
      }
      
      // Show success toast
      toast({
        title: "Status updated",
        description: `Order status has been updated to ${newStatus}`,
        variant: "success"
      });
      
      // Refresh orders to show the updated status
      fetchOrders();
      
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: error.message || 'An error occurred while updating the order status',
        variant: "destructive"
      });
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'SCHEDULED':
      case 'PENDING':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'IN_PROGRESS':
      case 'INPROGRESS':
      case 'ACCEPTED':
      case 'PAID':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'COMPLETED':
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'SCHEDULED':
      case 'PENDING':
        return <Clock className="h-4 w-4" />;
      case 'IN_PROGRESS':
      case 'INPROGRESS':
      case 'ACCEPTED':
      case 'PAID':
        return <AlertTriangle className="h-4 w-4" />;
      case 'COMPLETED':
      case 'DELIVERED':
        return <CircleCheck className="h-4 w-4" />;
      case 'CANCELLED':
        return <CircleX className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Loading skeleton component for orders
  const OrdersLoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <TableRow key={i}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
            <TableCell key={j}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
  
  // Empty state component
  const EmptyState = ({ title, description, icon }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
    </div>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <CollectorNavbar />
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Collector Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your waste collection business</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => router.push('/marketplace/create')} className="gap-2">
                  <Package className="h-4 w-4" />
                  Create New Listing
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                  <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                    <Truck className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {dashboardLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <div className="text-2xl font-bold">{dashboardData.totalCollections || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Total waste collections</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                    <ShoppingCart className="h-4 w-4 text-green-700 dark:text-green-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {dashboardLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <div className="text-2xl font-bold">{dashboardData.totalOrders || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Orders from buyers</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                    <DollarSign className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {dashboardLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <div className="text-2xl font-bold">${dashboardData.totalRevenue?.toFixed(2) || '0.00'}</div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Total earnings</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900">
                    <Package className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {dashboardLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <div className="text-2xl font-bold">{dashboardData.totalProducts || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Active listings</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Tabs Navigation */}
            <Tabs defaultValue="orders" className="space-y-6" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="orders" className="text-sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="collections" className="text-sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Collections
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="bg-white dark:bg-gray-800 pb-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <CardTitle className="text-xl">Orders Management</CardTitle>
                        <CardDescription>View and manage all your received orders</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={fetchOrders} disabled={ordersLoading} className="gap-2">
                        <RefreshCcw className="h-3.5 w-3.5" />
                        {ordersLoading ? 'Refreshing...' : 'Refresh'}
                      </Button>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 pb-4 border-b">
                      <div className="flex-1">
                        <div className="relative max-w-xs">
                          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={handleStatusChange}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ALL">All Statuses</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="ACCEPTED">Accepted</SelectItem>
                            <SelectItem value="PAID">Paid</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select value={sortBy} onValueChange={handleSortChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date-desc">Newest first</SelectItem>
                            <SelectItem value="date-asc">Oldest first</SelectItem>
                            <SelectItem value="price-desc">Price: High to low</SelectItem>
                            <SelectItem value="price-asc">Price: Low to high</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px] rounded-md">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Listing</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ordersLoading ? (
                            <OrdersLoadingSkeleton />
                          ) : filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                              <TableRow key={order.id} className="hover:bg-muted/50">
                                <TableCell className="font-medium">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div className="flex flex-col">
                                      <span className="font-medium">{order.buyer.name}</span>
                                      <span className="text-xs text-muted-foreground">{order.buyer.phoneNumber || 'No phone'}</span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="max-w-[200px] truncate" title={order.listing?.title || 'N/A'}>
                                    {order.listing?.title || 'N/A'}
                                    {order.listing?.wasteType && (
                                      <span className="text-xs text-muted-foreground block">
                                        Type: {order.listing.wasteType}
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">{order.quantity} kg</TableCell>
                                <TableCell className="text-right font-medium">${order.totalPrice?.toFixed(2)}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Badge className={getStatusColor(order.status)}>
                                      {getStatusIcon(order.status)}
                                      <span className="ml-1">{order.status}</span>
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                        <ChevronDown className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View details
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                      {order.status !== 'PENDING' && (
                                        <DropdownMenuItem onClick={() => handleOrderStatusUpdate(order.id, 'PENDING')}>
                                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                                          Set as Pending
                                        </DropdownMenuItem>
                                      )}
                                      {order.status !== 'ACCEPTED' && (
                                        <DropdownMenuItem onClick={() => handleOrderStatusUpdate(order.id, 'ACCEPTED')}>
                                          <CircleCheck className="h-4 w-4 mr-2 text-blue-500" />
                                          Accept Order
                                        </DropdownMenuItem>
                                      )}
                                      {order.status !== 'PAID' && (
                                        <DropdownMenuItem onClick={() => handleOrderStatusUpdate(order.id, 'PAID')}>
                                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                                          Mark as Paid
                                        </DropdownMenuItem>
                                      )}
                                      {order.status !== 'DELIVERED' && (
                                        <DropdownMenuItem onClick={() => handleOrderStatusUpdate(order.id, 'DELIVERED')}>
                                          <Truck className="h-4 w-4 mr-2 text-purple-500" />
                                          Mark as Delivered
                                        </DropdownMenuItem>
                                      )}
                                      {order.status !== 'COMPLETED' && (
                                        <DropdownMenuItem onClick={() => handleOrderStatusUpdate(order.id, 'COMPLETED')}>
                                          <CircleCheck className="h-4 w-4 mr-2 text-green-600" />
                                          Complete Order
                                        </DropdownMenuItem>
                                      )}
                                      {order.status !== 'CANCELLED' && (
                                        <DropdownMenuItem onClick={() => handleOrderStatusUpdate(order.id, 'CANCELLED')}>
                                          <CircleX className="h-4 w-4 mr-2 text-red-500" />
                                          Cancel Order
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <Phone className="h-4 w-4 mr-2" />
                                        Contact buyer
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="h-[400px] text-center">
                                <EmptyState 
                                  title="No orders found" 
                                  description={searchQuery || statusFilter !== 'ALL' ? 
                                    "Try adjusting your filters or search query" : 
                                    "You don't have any orders yet. Create some listings to start receiving orders."}
                                  icon={<ShoppingCart className="h-6 w-6 text-muted-foreground" />}
                                />
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Collections Tab */}
              <TabsContent value="collections" className="space-y-4">
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <CardTitle className="text-xl">Recent Collections</CardTitle>
                        <CardDescription>View your recent waste collection activities</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {collectionsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : dashboardData.collections && dashboardData.collections.length > 0 ? (
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Waste Type</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboardData.collections.map((collection) => (
                            <TableRow key={collection.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">
                                {new Date(collection.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  {collection.user.name}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 max-w-[200px] truncate">
                                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                  <span title={collection.address}>{collection.address}</span>
                                </div>
                              </TableCell>
                              <TableCell>{collection.wasteType}</TableCell>
                              <TableCell className="text-right">{collection.quantity} kg</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(collection.status)}>
                                  {getStatusIcon(collection.status)}
                                  <span className="ml-1">{collection.status}</span>
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <EmptyState 
                        title="No collections found" 
                        description="You don't have any waste collections yet."
                        icon={<Truck className="h-6 w-6 text-muted-foreground" />}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </main>
    </div>
  );
} 