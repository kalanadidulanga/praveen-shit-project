import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const testimonials = [
  {
    quote: "This platform has transformed how our community in Colombo handles plastic waste. We've seen a 40% increase in recycling rates.",
    author: "Priya Perera",
    role: "Community Leader, Colombo",
    avatar: "/images/avatars/avatar-1.png"
  },
  {
    quote: "As a waste collector in Kandy, I've been able to increase my income by 30% while contributing to a cleaner environment.",
    author: "Rajesh Kumar",
    role: "Waste Collector, Kandy",
    avatar: "/images/avatars/avatar-2.png"
  },
  {
    quote: "Our business now sources 50% of our plastic raw materials through this platform, reducing costs and our environmental footprint in Galle.",
    author: "Ananya Jayawardena",
    role: "Business Owner, Galle",
    avatar: "/images/avatars/avatar-3.png"
  }
];

export function TestimonialSection() {
  return (
    <section className="py-24 bg-background" id="testimonials">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Hear from the people and organizations making a difference through our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-primary/5 shadow-sm">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-primary/40 mb-4" />
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline">
            <Link href="/register">Join Our Community</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
} 