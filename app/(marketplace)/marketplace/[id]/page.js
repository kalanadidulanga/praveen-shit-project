"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Recycle, 
  Minus, 
  Plus, 
  Share2
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const userData = session?.user;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // Skip fetching if we're on the create route
      if (params.id === 'create') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        if (!params.id) {
          throw new Error('Invalid product ID');
        }

        const response = await fetch(`/api/products/${params.id}`, {
          // Add cache: 'no-store' to prevent caching issues
          cache: 'no-store'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch product');
        }

        const data = await response.json();
        console.log('Fetched product:', data); // Debug log
        
        if (!data.product) {
          throw new Error('Product data is missing');
        }

        setProduct(data.product);
        
        // Fetch related products
        if (data.product?.category) {
          const relatedResponse = await fetch(
            `/api/products?category=${data.product.category}&limit=4&exclude=${data.product._id}`,
            { cache: 'no-store' }
          );
          
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            setRelatedProducts(relatedData.products || []);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, toast]);

  const handleBuyNow = () => {
    if (!product || !product.inStock) return;
    
    try {
      // Redirect to order page
      router.push(`/marketplace/order/${product._id}`);
      
      toast({
        title: "Proceed to Buy",
        description: `Redirecting to purchase ${product.name}`,
        variant: "success"
      });
    } catch (error) {
      console.error('Error navigating to buy page:', error);
      toast({
        title: "Error",
        description: "Failed to process purchase",
        variant: "destructive"
      });
    }
  };

  // Add role-specific actions
  const RoleSpecificActions = () => {
    switch (userData.userType) {
      case 'business':
        return <Button>Place Bulk Order</Button>;
      case 'collector':
        return (
          <>
            <Button>Edit Listing</Button>
            <Button>Remove Listing</Button>
          </>
        );
      default:
        return <Button>Schedule Collection</Button>;
    }
  };

  // If we're on the create route, don't try to fetch product details
  if (params.id === 'create') {
    return null;
  }

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error || 'Product not found'}</p>
          <Link href="/marketplace" className="mt-4 inline-block">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  // Set up product images
  const productImages = product.images || [product.image];

  return (
    <Container className="py-8">
      {/* Breadcrumb & Back Button */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="pl-0">
          <Link href="/marketplace" className="flex items-center text-gray-600 hover:text-green-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          
          {/* Thumbnail Images - show only if we have multiple images */}
          {productImages.length > 1 && (
            <div className="flex gap-2 mt-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-green-500' : 'ring-1 ring-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="mb-4">
              {product.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-600">
                    Rs {(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </p>
                  <p className="text-gray-500 line-through">
                    Rs {product.price.toFixed(2)}
                  </p>
                  <Badge className="bg-red-500">-{product.discount}%</Badge>
                </div>
              ) : (
                <p className="text-2xl font-bold text-green-600">
                  Rs {product.price.toFixed(2)}
                </p>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <Badge className={product.inStock ? 'bg-green-500' : 'bg-red-500'} variant="default">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
              
              {product.isNew && (
                <Badge className="ml-2 bg-blue-500" variant="default">
                  New Arrival
                </Badge>
              )}
            </div>
            
            {/* Variants - only show if product has variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Options</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedVariant === index
                          ? 'bg-green-100 border-green-500 text-green-700 border'
                          : 'bg-gray-100 border-gray-200 text-gray-800 border'
                      } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setSelectedVariant(index)}
                      disabled={!variant.inStock}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center border rounded-md w-fit">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-10 w-14 flex items-center justify-center border-x">
                  {quantity}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setQuantity(q => q + 1)}
                  className="h-10 w-10 rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="lg"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
            
            {/* Product Meta */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-gray-500" />
                <span>Free delivery on orders over Rs 5,000</span>
              </div>
              <div className="flex items-center text-sm">
                <ShieldCheck className="h-4 w-4 mr-2 text-gray-500" />
                <span>1 year warranty on all products</span>
              </div>
              <div className="flex items-center text-sm">
                <Recycle className="h-4 w-4 mr-2 text-gray-500" />
                <span>Made from 100% recycled materials</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="impact">Sustainability Impact</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Product Specifications</h3>
              <ul className="space-y-2">
                {product.material && (
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium">{product.material}</span>
                  </li>
                )}
                {product.dimensions && (
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-medium">{product.dimensions}</span>
                  </li>
                )}
                {product.weight && (
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{product.weight}</span>
                  </li>
                )}
                <li className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Seller</span>
                  <span className="font-medium">{product.seller?.name || "EcoRecycle"}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Care Instructions</h3>
              <p className="text-gray-700">
                {product.careInstructions || "Clean with a damp cloth. Avoid exposure to direct sunlight for prolonged periods."}
              </p>
              
              {product.warranty && (
                <>
                  <h3 className="text-lg font-medium mt-4 mb-2">Warranty</h3>
                  <p className="text-gray-700">{product.warranty}</p>
                </>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="impact">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-green-800 mb-3">Environmental Impact</h3>
            <p className="text-gray-700 mb-4">
              {product.sustainabilityImpact || 
                "This product is made from recycled materials, helping to reduce waste and conserve resources. By choosing this product, you're contributing to a circular economy and reducing your environmental footprint."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-green-700 mb-1">Recycled Materials</h4>
                <p className="text-sm text-gray-600">Made from 100% post-consumer recycled materials</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-green-700 mb-1">Carbon Footprint</h4>
                <p className="text-sm text-gray-600">75% less carbon emissions than conventional products</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-green-700 mb-1">Local Production</h4>
                <p className="text-sm text-gray-600">Produced locally to reduce transportation emissions</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
              <p className="text-gray-700">
                We offer free standard shipping on all orders over Rs 5,000. Orders are typically processed within 1-2 business days. 
                Delivery times vary by location but usually take 3-5 business days.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Return Policy</h3>
              <p className="text-gray-700">
                If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund. 
                Items must be unused and in their original packaging. Please note that the customer is responsible for return shipping costs.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/marketplace/${relatedProduct._id}`} key={relatedProduct._id}>
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 group">
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Status Badges */}
                    {!relatedProduct.inStock && (
                      <Badge className="absolute top-3 left-3 bg-red-500">Out of Stock</Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-green-600">
                        Rs {relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Role-specific actions */}
      <RoleSpecificActions />
    </Container>
  );
} 