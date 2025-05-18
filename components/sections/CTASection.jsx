import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-primary/10" id="cta">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Movement for a Plastic-Free Future
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Whether you&apos;re an individual, community, business, or waste collector, your participation makes a difference. 
            Join our platform today and be part of the solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium" asChild>
              <Link href="/register">
                Register Now
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-medium" asChild>
              <Link href="/marketplace">
                Browse Marketplace
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 p-6 bg-background rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Ready to make an impact?</h3>
            <p className="text-muted-foreground mb-0">
              Download our mobile app to start your plastic waste management journey on the go.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" className="gap-2" asChild>
                <a href="#" aria-label="Download on Google Play">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/>
                    <path d="M18 14.5V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1Z"/>
                    <path d="M12 19v3"/>
                    <path d="M9 19v3"/>
                    <path d="M15 19v3"/>
                    <path d="M12 12v.01"/>
                  </svg>
                  Google Play
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="#" aria-label="Download on App Store">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m14.5 4.5-5 5c2.5-1.5 5.5-.5 7 1.5 1.5 2 1 5.5-1 7.5 2-2 2.5-5 1-7-1.5-2-4-3-7-1.5l5-5"/>
                  </svg>
                  App Store
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 