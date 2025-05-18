"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ChevronDown, Plus, Eye, ShoppingCart, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAuth } from "@/lib/auth";

// Add this helper function before the MarketplacePage component
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Recently';
  }
};

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [randomId, setRandomId] = useState(null);
  
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const userData = session?.user;
  const { user } = useAuth();

  // Updated fetch products function
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (categoryFilter !== "all") {
          params.append("category", categoryFilter);
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        console.log('Raw product data:', data.products); // Debug log
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter, toast]);

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Categories
  const categories = [
    { id: "all", name: "All Products" },
    { id: "accessories", name: "Accessories" },
    { id: "home", name: "Home & Living" },
    { id: "furniture", name: "Furniture" },
    { id: "stationery", name: "Stationery" },
    { id: "kitchen", name: "Kitchen" }
  ];

  const viewDetails = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/marketplace/${productId}`);
  };

  // Add pagination controls
  const Pagination = () => (
    <div className="flex justify-center gap-2 mt-8">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
      >
        Previous
      </Button>
      <span className="flex items-center px-4">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => setPage(p => p + 1)}
      >
        Next
      </Button>
    </div>
  );

  useEffect(() => {
    setRandomId(Math.random());
  }, []);

  // Add these functions before the return statement
  const handleSchedulePickup = (e, productId) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    router.push(`/collection/schedule/${productId}`);
  };

  const handlePlaceOrder = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/marketplace/order/${productId}`);
  };

  const handleUpdateListing = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/marketplace/edit/${productId}`);
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold">Eco-Friendly Marketplace</h1>
        <p className="text-muted-foreground">
          Discover products made from recycled materials
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Link 
            key={product._id}
            href={`/marketplace/${product._id}`}
          >
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group border border-gray-100">
              <div className="relative">
                {/* Product Image with Overlay */}
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {!product.inStock && (
                      <Badge className="bg-red-500 text-white px-2 py-1">Out of Stock</Badge>
                    )}
                    {product.isNew && (
                      <Badge className="bg-blue-500 text-white px-2 py-1">New Arrival</Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-amber-500 text-white px-2 py-1">-{product.discount}%</Badge>
                    )}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300">
                    <Button 
                      onClick={(e) => viewDetails(product._id, e)} 
                      variant="default" 
                      size="icon" 
                      className="bg-white text-gray-800 hover:bg-gray-100 rounded-full h-9 w-9 shadow-md"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to cart functionality
                        const cart = JSON.parse(localStorage.getItem('ecorecycleCart') || '[]');
                        const existingProductIndex = cart.findIndex(item => item._id === product._id);
                        
                        if (existingProductIndex >= 0) {
                          cart[existingProductIndex].quantity += 1;
                        } else {
                          cart.push({
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                            discount: product.discount || 0
                          });
                        }
                        
                        localStorage.setItem('ecorecycleCart', JSON.stringify(cart));
                        
                        // Dispatch event for header to update cart count
                        setTimeout(() => {
                          window.dispatchEvent(new Event('cartUpdated'));
                        }, 0);
                        
                        toast({
                          title: "Added to Cart",
                          description: `${product.name} has been added to your cart`,
                          variant: "success"
                        });
                      }}
                      variant="default" 
                      size="icon" 
                      className="bg-white text-gray-800 hover:bg-gray-100 rounded-full h-9 w-9 shadow-md"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* View Details Strip */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-green-600 text-white py-1 px-4 flex items-center justify-center cursor-pointer transform transition-transform duration-300 ${
                    hoveredProduct === product._id ? 'translate-y-0' : 'translate-y-full'
                  } ${!product.inStock ? 'bg-gray-400' : ''}`}
                  onClick={(e) => viewDetails(product._id, e)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </div>
              </div>
              
              {/* Product Content */}
              <div className="p-4">
                {/* Category */}
                <Badge variant="outline" className="text-xs px-2 py-0 border-green-200 text-green-700 bg-green-50 mb-2">
                  {product.category}
                </Badge>
                
                {/* Product Name */}
                <h3 className="font-medium text-base line-clamp-1 mt-1 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Add Seller Information */}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.seller.userType === 'business' ? 'Business Seller' : 'Individual Seller'}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    Posted by {product.seller.name}
                  </span>
                </div>

                {/* Add Posted Date */}
                <div className="text-xs text-gray-500 mt-1">
                  Posted {product.createdAt ? formatDate(product.createdAt) : 'Recently'}
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mt-3 line-clamp-2 mb-4 min-h-[2.5rem]">
                  {product.description}
                </p>
                
                {/* Modified Price and Seller section */}
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through mr-1">
                        ₹{product.price}
                      </span>
                    )}
                    <span className="font-medium text-green-600">
                      ₹{product.discount > 0 
                        ? Math.round(product.price - (product.price * product.discount / 100)) 
                        : product.price}
                    </span>
                  </div>
                  {product.rewardPoints > 0 && (
                    <div className="flex items-center space-x-1">
                      <Award className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-green-600">{product.rewardPoints} pts</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {!loading && sortedProducts.length > 0 && <Pagination />}
    </Container>
  );
} 