import { Button } from "@/components/ui/button";
import { HeroImage } from "./HeroImage";
import { Container } from "@/components/layout/Container";
import { WavyBackground } from "./WavyBackground";
import { LeafIcon, Recycle, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <WavyBackground className="relative overflow-hidden py-20 md:pb-56" id="home">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
          {/* Hero Content */}
          <div className="flex flex-col gap-6 mobile-center sm:mobile-center md:items-start">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <LeafIcon className="h-4 w-4" />
                Eco-Friendly Solution
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Transform Plastic Waste Into 
              <div className="gradient-text mt-1">Sustainable Value</div>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
              Join our platform connecting waste collectors, communities and businesses to create 
              a sustainable ecosystem for plastic recycling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="font-medium group" asChild>
                <Link href="/register">
                  Get Started
                  <Sparkles className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-medium" asChild>
                <a href="#how-it-works">
                  <Recycle className="mr-2 h-4 w-4" />
                  Learn More
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-8 w-full md:w-auto justify-center md:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-background shadow-sm"
                    style={{
                      backgroundImage: `url(https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg)`,
                      backgroundSize: 'cover'
                    }}
                  />
                ))}
              </div>
              <div className="text-sm bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="font-semibold text-primary">500+</span> members joined
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <HeroImage />
        </div>
      </Container>
    </WavyBackground>
  );
} 