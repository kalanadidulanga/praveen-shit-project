"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { Award, Gift, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RewardDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reward, setReward] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    fetchRewardDetails();
    fetchUserPoints();
  }, [params.id]);

  const fetchRewardDetails = async () => {
    try {
      const response = await fetch(`/api/rewards/${params.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setReward(data.reward);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reward details",
        variant: "destructive"
      });
      router.push('/rewards');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await fetch('/api/user/points');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUserPoints(data.points);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRedeem = async () => {
    try {
      const response = await fetch(`/api/rewards/${params.id}/redeem`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      toast({
        title: "Success!",
        description: "Reward redeemed successfully. Check your email for details.",
        variant: "success"
      });

      router.push('/rewards');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
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
      <Link href="/rewards" className="inline-flex items-center text-muted-foreground hover:text-green-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Rewards
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{reward.name}</CardTitle>
              <CardDescription className="mt-2">{reward.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-semibold">{reward.points} points</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">Your Points Balance</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg">{userPoints} points available</span>
                {userPoints >= reward.points ? (
                  <span className="text-green-600 font-medium">Sufficient points!</span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Need {reward.points - userPoints} more points
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Reward Details</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {reward.details?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <Button
              onClick={handleRedeem}
              disabled={userPoints < reward.points}
              className="w-full"
            >
              {userPoints >= reward.points ? (
                <span className="flex items-center justify-center">
                  <Gift className="mr-2 h-5 w-5" />
                  Redeem Reward
                </span>
              ) : (
                "Not Enough Points"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
} 