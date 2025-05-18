"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
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

export default function ScheduleCollection() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    address: "",
    wasteType: "",
    quantity: "",
    notes: ""
  });

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

      // Prepare data for API
      const collectionData = {
        type: formData.type.toUpperCase(), // Match the enum case
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

      toast({
        title: "Success!",
        description: "Collection scheduled successfully",
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
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span>Schedule Collection</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Plastic Waste Collection</CardTitle>
          <CardDescription>
            Request a pickup for your plastic waste or schedule a drop-off
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

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Time</label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData({ ...formData, time: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Collection Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Collection Address</label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter your full address"
                required
              />
            </div>

            {/* Waste Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Waste Type</label>
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

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Approx. Quantity (kg)</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Enter approximate weight in kilograms"
                required
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special instructions for collection"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/collection">Cancel</Link>
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