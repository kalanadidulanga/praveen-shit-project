"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SimpleFooter } from "@/components/layout/SimpleFooter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const router = useRouter();
  const { register, error } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "INDIVIDUAL",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.userType
      );

      if (success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully.",
          variant: "success",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Registration failed",
          description: error || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Registration failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SimpleHeader />
      <main className="flex justify-center items-center min-h-screen py-10 bg-gradient-to-b from-white to-primary/5">
        <Container className="max-w-md">
          <Card className="w-full shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Create an account
              </CardTitle>
              <CardDescription className="text-center">
                Join our community of waste management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>User Type</Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="INDIVIDUAL" id="individual" />
                      <Label htmlFor="individual" className="cursor-pointer">
                        Individual
                      </Label>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <RadioGroupItem value="COMMUNITY" id="community" />
                      <Label htmlFor="community" className="cursor-pointer">Community</Label>
                    </div> */}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BUSINESS" id="business" />
                      <Label htmlFor="business" className="cursor-pointer">
                        Business
                      </Label>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <RadioGroupItem value="COLLECTOR" id="collector" />
                      <Label htmlFor="collector" className="cursor-pointer">Waste Collector</Label>
                    </div> */}
                  </RadioGroup>
                </div>
                {error && (
                  <div className="text-sm text-destructive">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </Container>
      </main>
      <SimpleFooter />
    </>
  );
}
