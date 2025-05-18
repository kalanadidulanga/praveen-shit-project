import { Container } from "@/components/layout/Container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, Users, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: <Recycle className="h-12 w-12 text-primary" />,
    title: "Waste Marketplace",
    description: "Buy and sell plastic waste with transparent pricing in Sri Lankan Rupees."
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Community Engagement",
    description: "Connect with like-minded individuals and communities focused on sustainability."
  },
  {
    icon: <Truck className="h-12 w-12 text-primary" />,
    title: "Logistics Management",
    description: "Streamlined collection and delivery process with real-time tracking."
  },
  {
    icon: <CreditCard className="h-12 w-12 text-primary" />,
    title: "Reward System",
    description: "Earn incentives for your contributions to plastic waste management."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/50" id="features">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We&apos;re Making a <span className="gradient-text">Difference</span></h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our platform connects waste collectors, communities, and businesses to create
            a sustainable ecosystem for plastic recycling.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md hover:shadow-xl transition-all duration-300 eco-card group overflow-hidden"
            >
              <CardHeader className="relative pb-0">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full transition-all duration-300 group-hover:scale-150"></div>
                <div className="relative z-10 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-2">
                  {feature.icon}
                </div>
                <CardTitle className="relative z-10 text-xl mb-1">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-foreground/80 text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Add a CTA banner */}
        <div className="mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to join the movement?</h3>
              <p className="text-muted-foreground">Start your sustainability journey today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-primary hover:bg-white/90 shadow-md" asChild>
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-foreground hover:bg-white/10" asChild>
                <Link href="/#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 