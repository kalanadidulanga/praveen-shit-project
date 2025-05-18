"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const WASTE_TYPES = [
  "PET Bottles",
  "HDPE Containers",
  "PVC",
  "LDPE Films",
  "PP",
  "PS",
  "Mixed Plastics"
];

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
];

export default function ScheduleCollectionForProduct() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    address: "",
    wasteType: "",
    quantity: "",
    notes: ""
  });

  // Fetch product details if ID is provided
  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error);
        
        setProduct(data.product);
        // Pre-fill waste type based on product
        setFormData(prev => ({
          ...prev,
          wasteType: data.product.plasticType || "Mixed Plastics"
        }));
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive"
        });
      }
    };

    fetchProduct();
  }, [params.id, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.type || !formData.date || !formData.time || !formData.address || !formData.wasteType || !formData.quantity) {
        throw new Error("Please fill in all required fields");
      }

      // Combine date and time
      const dateTime = new Date(`${formData.date}T${formData.time}`);

      // Prepare data for API - exclude productId
      const collectionData = {
        type: formData.type.toUpperCase(),
        date: dateTime.toISOString(),
        address: formData.address,
        wasteType: formData.wasteType,
        quantity: parseFloat(formData.quantity),
        notes: formData.notes || undefined
      };

      // Submit to API
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collectionData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule collection');
      }

      // Calculate points if product exists
      const pointsMessage = product 
        ? ` You will earn ${product.rewardPoints * parseFloat(formData.quantity)} points when completed.`
        : '';

      toast({
        title: "Success!",
        description: "Collection scheduled successfully." + pointsMessage,
        variant: "success",
      });

      router.push('/collection');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/collection" className="hover:text-foreground">
            Collection
          </Link>
          <span className="mx-2">/</span>
          <span>Schedule Collection</span>
          {product && (
            <>
              <span className="mx-2">/</span>
              <span>{product.name}</span>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {product ? `Schedule Collection for ${product.name}` : 'Schedule Plastic Waste Collection'}
          </CardTitle>
          <CardDescription>
            {product 
              ? `Schedule a collection for ${product.quantity}${product.unit} of ${product.plasticType}`
              : 'Request a pickup for your plastic waste or schedule a drop-off'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Collection Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Collection Type</label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select collection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PICKUP">Pickup from my location</SelectItem>
                  <SelectItem value="DROPOFF">Drop-off at collection center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
                className="bg-white"
              />
            </div>

            {/* Time */}
            <div>
              <label className="text-sm font-medium mb-2 block">Time</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                className="bg-white"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium mb-2 block">Address</label>
              <Textarea
                placeholder="Collection address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="bg-white"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity (kg)</label>
              <Input
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                min="1"
                required
                className="bg-white"
              />
            </div>

            {/* Waste Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Waste Type</label>
              <Select
                value={formData.wasteType}
                onValueChange={(value) => setFormData({ ...formData, wasteType: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  {WASTE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium mb-2 block">Additional Notes</label>
              <Textarea
                placeholder="Any special instructions (optional)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-white"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href={product ? `/marketplace/${product._id}` : "/collection"}>
                  Cancel
                </Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Scheduling..." : "Schedule Collection"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
} 