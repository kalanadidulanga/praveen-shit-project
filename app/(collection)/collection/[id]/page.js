"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar, MapPin, Clock, AlertTriangle } from "lucide-react";

export default function CollectionDetailsPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`/api/collections/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Failed to fetch collection');
        
        setCollection(data.collection);
      } catch (error) {
        console.error('Error:', error);
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
      fetchCollection();
    }
  }, [params.id, toast]);

  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/collections/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'CANCELLED'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to cancel collection');
      }

      toast({
        title: "Collection Cancelled",
        description: "Your collection has been cancelled successfully.",
      });

      router.push('/collection');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      SCHEDULED: "bg-blue-100 text-blue-800",
      INPROGRESS: "bg-yellow-100 text-yellow-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800"
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                Collection Details
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {collection.product.name}
              </p>
            </div>
            <Badge className={getStatusBadge(collection.status)}>
              {collection.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Collection Date</p>
                    <p className="text-muted-foreground">
                      {new Date(collection.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Collection Time</p>
                    <p className="text-muted-foreground">
                      {new Date(collection.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Collection Address</p>
                    <p className="text-muted-foreground">{collection.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-medium">Quantity</p>
                  <p className="text-muted-foreground">{collection.quantity} kg</p>
                </div>

                <div>
                  <p className="font-medium">Collection Type</p>
                  <p className="text-muted-foreground capitalize">{collection.type}</p>
                </div>

                {collection.notes && (
                  <div>
                    <p className="font-medium">Additional Notes</p>
                    <p className="text-muted-foreground">{collection.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {collection.status === 'SCHEDULED' && (
              <div className="border-t pt-6 mt-6">
                <Button 
                  variant="destructive" 
                  onClick={handleCancel}
                  className="flex items-center"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Cancel Collection
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
} 