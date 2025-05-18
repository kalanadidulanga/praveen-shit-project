import { Container } from "@/components/layout/Container";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Register & Create Profile",
    description: "Sign up as an individual, community, business, or waste collector. Complete your profile with relevant details."
  },
  {
    number: "02",
    title: "Collect & Categorize",
    description: "Collect plastic waste and categorize it by type (PET, HDPE, PVC) and condition for better matching with buyers."
  },
  {
    number: "03",
    title: "List & Connect",
    description: "List your plastic waste on the marketplace or find waste to purchase. Connect with other users in your area."
  },
  {
    number: "04",
    title: "Schedule & Deliver",
    description: "Arrange pickup or delivery through our logistics system. Track your waste in real-time until completion."
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-background" id="how-it-works">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our platform makes it easy to participate in the circular economy for plastic waste.
            Here&apos;s how to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-[50%] w-full h-0.5 bg-muted hidden lg:block" />
              )}
              <div className="flex flex-col items-center text-center z-10 relative bg-background p-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <span className="text-primary font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Benefits for All Participants</h3>
              <p className="text-muted-foreground mb-6">Our ecosystem creates value for all stakeholders while reducing plastic waste in the environment.</p>
              
              <ul className="space-y-3">
                {[
                  "Income for waste collectors",
                  "Recycled materials for businesses",
                  "Cleaner environment for communities",
                  "Rewards for active participation"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <CheckIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button asChild>
                  <Link href="/register">Join Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-xl mb-1">Tons of Plastic</p>
                <p className="text-muted-foreground">Recycled across Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 