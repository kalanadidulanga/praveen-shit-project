"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Container } from "@/components/layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProductPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    quantity: "",
    unit: "kg",
    plasticType: "",
    rewardPoints: "0",
    discount: "0"
  });

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch product');
        }

        if (data.product) {
          // Check if the product belongs to the current user
          if (data.product.sellerId !== session.user.id) {
            toast({
              title: "Unauthorized",
              description: "You can only edit your own products",
              variant: "destructive",
            });
            router.push('/dashboard?tab=products');
            return;
          }

          // Populate the form data
          setFormData({
            name: data.product.name || "",
            price: data.product.price?.toString() || "",
            category: data.product.category || "",
            description: data.product.description || "",
            image: data.product.image || "",
            quantity: data.product.quantity?.toString() || "",
            unit: data.product.unit || "kg",
            plasticType: data.product.plasticType || "",
            rewardPoints: data.product.rewardPoints?.toString() || "0",
            discount: data.product.discount?.toString() || "0"
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: error.message || "Could not load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, session, router, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form data
      if (!formData.name || !formData.price || !formData.category || 
          !formData.description || !formData.image || !formData.quantity || 
          !formData.plasticType) {
        throw new Error('Please fill in all required fields');
      }

      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      toast({
        title: "Success",
        description: "Product updated successfully",
        variant: "success",
      });

      // Redirect back to products tab in dashboard
      router.push('/dashboard?tab=products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="py-12 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading product information...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <Button 
            variant="outline"
            onClick={() => router.push('/dashboard?tab=products')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RAW_MATERIALS">Raw Materials</SelectItem>
                        <SelectItem value="RECYCLED_PRODUCTS">Recycled Products</SelectItem>
                        <SelectItem value="CRAFT_ITEMS">Craft Items</SelectItem>
                        <SelectItem value="UPCYCLED_GOODS">Upcycled Goods</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="plasticType">Plastic Type *</Label>
                    <Select 
                      value={formData.plasticType} 
                      onValueChange={(value) => handleSelectChange('plasticType', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plastic type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PET">PET (Type 1)</SelectItem>
                        <SelectItem value="HDPE">HDPE (Type 2)</SelectItem>
                        <SelectItem value="PVC">PVC (Type 3)</SelectItem>
                        <SelectItem value="LDPE">LDPE (Type 4)</SelectItem>
                        <SelectItem value="PP">PP (Type 5)</SelectItem>
                        <SelectItem value="PS">PS (Type 6)</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                        <SelectItem value="MIXED">Mixed Plastics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <div className="flex gap-3">
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="flex-1"
                        required
                      />
                      <Select 
                        value={formData.unit} 
                        onValueChange={(value) => handleSelectChange('unit', value)}
                        className="w-1/3"
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="g">Grams (g)</SelectItem>
                          <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                          <SelectItem value="ton">Tons</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL *</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rewardPoints">Reward Points</Label>
                    <Input
                      id="rewardPoints"
                      name="rewardPoints"
                      type="number"
                      min="0"
                      value={formData.rewardPoints}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push('/dashboard?tab=products')}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
} 