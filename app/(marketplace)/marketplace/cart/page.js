"use client";

import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus, CreditCard, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  // Load cart data
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('ecorecycleCart');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 5000 ? 0 : 350;
  const total = subtotal + shipping;

  // Create memoized update functions
  const updateItemQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item._id === productId 
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      );
      localStorage.setItem('ecorecycleCart', JSON.stringify(updatedItems));
      
      // Use a timeout to dispatch the event after render
      setTimeout(() => {
        window.dispatchEvent(new Event('cartUpdated'));
      }, 0);
      
      return updatedItems;
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item._id !== productId);
      localStorage.setItem('ecorecycleCart', JSON.stringify(updatedItems));
      
      // Use a timeout to dispatch the event after render
      setTimeout(() => {
        window.dispatchEvent(new Event('cartUpdated'));
      }, 0);
      
      return updatedItems;
    });
  }, []);

  // Handle direct checkout for all items in cart
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    // Combine all cart items into a single order
    // We'll redirect to the first item's order page and pass info about other items
    const firstProductId = cartItems[0]._id;
    
    // Store additional cart info in session storage to be accessed by order page
    sessionStorage.setItem('cartOrderInfo', JSON.stringify({
      isCartCheckout: true,
      cartItems: cartItems,
      totalItems: cartItems.length,
      subtotal: subtotal,
      shipping: shipping,
      total: total
    }));

    // Redirect to order page for first product
    router.push(`/marketplace/order/${firstProductId}?fromCart=true`);
    
    toast({
      title: "Proceeding to Checkout",
      description: `Preparing your order with ${cartItems.length} items`,
      variant: "success"
    });
  };

  // Show loading state
  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center min-h-[300px] items-center">
          <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Link href="/marketplace">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
      
      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/marketplace">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {cartItems.map((item) => (
                  <div 
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b last:border-b-0 last:pb-0 first:pt-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          Unit Price: ₹{item.price.toLocaleString()}
                        </span>
                        {item.discount > 0 && (
                          <span className="text-sm text-green-600">
                            -{item.discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Price & Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-semibold">
                        ₹{((item.price * (1 - (item.discount || 0) / 100)) * item.quantity).toLocaleString()}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-0 h-auto"
                        onClick={() => removeItem(item._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Replace Checkout with direct Buy Now */}
                <Button 
                  className="w-full mt-6 bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Buy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
} 