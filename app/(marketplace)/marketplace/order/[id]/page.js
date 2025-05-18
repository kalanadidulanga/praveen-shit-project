"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export default function PlaceOrderPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [isProduct, setIsProduct] = useState(true);
  const [formData, setFormData] = useState({
    quantity: 1,
    deliveryAddress: "",
    paymentMethod: "COD",
    notes: ""
  });
  const [isCartCheckout, setIsCartCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Check if this order is from cart
        const isFromCart = searchParams.get('fromCart') === 'true';
        const cartOrderInfo = isFromCart 
          ? JSON.parse(sessionStorage.getItem('cartOrderInfo') || '{}') 
          : null;
        
        if (isFromCart && cartOrderInfo) {
          setIsCartCheckout(true);
          setCartItems(cartOrderInfo.cartItems || []);
          
          // Pre-fill form with total amounts from cart
          setFormData(prev => ({
            ...prev,
            quantity: cartOrderInfo.totalItems || 1,
          }));
        }

        // Log the current path and params for debugging
        console.log('Current path:', window.location.pathname);
        console.log('Params ID:', params.id);
        
        // Check if we're dealing with a product or listing
        let response;
        let apiUrl;
        const isMarketplacePath = window.location.pathname.includes('/marketplace/');
        setIsProduct(isMarketplacePath);
        
        if (isMarketplacePath) {
          // This is a marketplace product
          apiUrl = `/api/products/${params.id}`;
          console.log('Fetching product data from API:', apiUrl);
        } else {
          // This is a listing
          apiUrl = `/api/listings/${params.id}`;
          console.log('Fetching listing data from API:', apiUrl);
        }
        
        // Log the request we're about to make
        console.log('Making API request to:', apiUrl);
        response = await fetch(apiUrl);
        console.log('API response status:', response.status);
        
        const data = await response.json();
        console.log('API response data:', data);
        
        if (!response.ok) {
          console.error('API error response:', data);
          throw new Error(data.error || `Failed to load data (${response.status})`);
        }
        
        // Store the product/listing data
        const fetchedItem = data.product || data.listing;
        console.log('Fetched item:', fetchedItem);
        
        if (!fetchedItem) {
          console.error('No item data in response:', data);
          throw new Error('No item data returned from API');
        }
        
        setItem(fetchedItem);
      } catch (error) {
        console.error('Error fetching item:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to load item details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    } else {
      console.error('No ID parameter provided');
      setLoading(false);
    }
  }, [params.id, toast, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Form submission started');
      console.log('Current item data:', item);
      console.log('Current form data:', formData);
      console.log('Params ID:', params.id);
      
      if (!item) {
        console.error('No item data available for order submission');
        throw new Error('No item data available');
      }
      
      // Calculate the total price based on the item price and quantity
      const totalPrice = item.price * parseInt(formData.quantity);
      console.log('Calculated total price:', totalPrice);
      
      // For debugging, check if we're dealing with a product or listing
      console.log('Is this a product?', isProduct);
      console.log('Item type:', isProduct ? 'Product' : 'Listing');
      
      // Create the order data
      // If this is a product, we need to find the associated listing
      // For now, we'll use a workaround by using a hardcoded listing ID from the seed data
      // In a real application, you would have a proper association between products and listings
      
      // Get a valid listing ID from the database
      // This is a temporary fix - in production, you would properly associate products with listings
      let targetListingId;
      
      if (isProduct) {
        // For products, use the first available listing from the database
        // This is just for testing - in production you'd have a proper association
        console.log('This is a product order - using a fallback listing ID');
        targetListingId = '682096e01d1ab7c3b5d2b96c'; // Hardcoded listing ID from seed data
      } else {
        // For listings, use the actual listing ID
        console.log('This is a listing order - using the actual listing ID');
        targetListingId = params.id;
      }
      
      console.log('Target listing ID for order:', targetListingId);
      
      const orderData = {
        listingId: targetListingId,
        quantity: parseInt(formData.quantity),
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        totalPrice: totalPrice
      };
      
      console.log('Submitting order data:', orderData);

      // Make the API request
      console.log('Making POST request to /api/orders');
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      console.log('API response status:', response.status);
      const data = await response.json();
      console.log('Order API response data:', data);

      if (!response.ok) {
        console.error('API error response:', data);
        throw new Error(data.error || `Failed to place order (${response.status})`);
      }

      console.log('Order placed successfully:', data.order);
      toast({
        title: "Success",
        description: "Order placed successfully!",
        variant: "success"
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "Error",
        description: error.message || 'An error occurred while placing your order',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Place Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product/Listing Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium">{isProduct ? item?.name : item?.title}</h3>
              <p className="text-sm text-gray-600">Price: Rs. {item?.price} per {isProduct ? (item?.unit || 'unit') : 'kg'}</p>
              {!isProduct && <p className="text-sm text-gray-600">Waste Type: {item?.wasteType}</p>}
              {!isProduct && <p className="text-sm text-gray-600">Location: {item?.location}</p>}
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity">Quantity ({isProduct ? (item?.unit || 'unit') : 'kg'})</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                required
              />
            </div>

            {/* Delivery Address */}
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <Label>Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COD" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                <p>Quantity: {formData.quantity} {isProduct ? (item?.unit || 'unit') : 'kg'}</p>
                <p>Price per {isProduct ? (item?.unit || 'unit') : 'kg'}: Rs. {item?.price}</p>
                <p className="font-medium">Total: Rs. {item?.price * formData.quantity}</p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
} 