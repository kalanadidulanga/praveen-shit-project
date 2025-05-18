"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Award, Gift, ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RewardsPage() {
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect business users away from rewards page
    if (session?.user?.userType === 'BUSINESS') {
      router.push('/dashboard');
      return;
    }

    fetchUserPoints();
    fetchAvailableRewards();
  }, [session]);

  const fetchUserPoints = async () => {
    try {
      const response = await fetch('/api/user/points');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUserPoints(data.points);
    } catch (error) {
      console.error('Error fetching points:', error);
      toast({
        title: "Error",
        description: "Failed to fetch points balance",
        variant: "destructive",
      });
    }
  };

  const fetchAvailableRewards = async () => {
    try {
      const response = await fetch('/api/rewards');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setRewards(data.rewards);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
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
      {/* Points Overview */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Rewards Center</h1>
        <p className="text-muted-foreground mb-4">Redeem your recycling points for eco-friendly rewards</p>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-1">Your Available Points</h2>
              <p className="opacity-90 mb-4">Earn more by recycling plastic and participating in eco-activities</p>
              <div className="flex items-center">
                <Award className="h-8 w-8 mr-2" />
                <span className="text-3xl font-bold">{userPoints} points</span>
              </div>
            </div>
            <div className="hidden md:block">
              <Leaf className="h-16 w-16 opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward._id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <Badge variant={userPoints >= reward.points ? "success" : "secondary"}>
                  {reward.points} points
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{reward.description}</p>
              
              <Link href={`/rewards/${reward._id}`}>
                <Button 
                  className="w-full group-hover:bg-green-600"
                  variant={userPoints >= reward.points ? "default" : "outline"}
                  disabled={userPoints < reward.points}
                >
                  {userPoints >= reward.points ? (
                    <span className="flex items-center">
                      Redeem Now <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  ) : (
                    "Not Enough Points"
                  )}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
} 