"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export default function CreateProductForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      // Validate form data
      if (!formData.name || !formData.price || !formData.category || 
          !formData.description || !formData.image || !formData.quantity || 
          !formData.plasticType) {
        throw new Error('Please fill in all required fields');
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      toast({
        title: "Success",
        description: "Product created successfully!",
      });

      router.push('/dashboard?tab=products');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price (Rs)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
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
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            name="category" 
            value={formData.category}
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="home">Home & Living</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="stationery">Stationery</SelectItem>
              <SelectItem value="kitchen">Kitchen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="plasticType">Plastic Type</Label>
          <Select 
            name="plasticType"
            value={formData.plasticType}
            onValueChange={(value) => handleSelectChange('plasticType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select plastic type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PET">PET</SelectItem>
              <SelectItem value="HDPE">HDPE</SelectItem>
              <SelectItem value="PVC">PVC</SelectItem>
              <SelectItem value="LDPE">LDPE</SelectItem>
              <SelectItem value="PP">PP</SelectItem>
              <SelectItem value="PS">PS</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <div className="flex gap-3">
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="flex-1"
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
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
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
} 