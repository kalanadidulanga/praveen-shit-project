import { Container } from "./Container";
import Link from "next/link";

export function SimpleFooter() {
  return (
    <footer className="bg-muted/30 py-12 border-t">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M7.5 4.27h9c.85 0 1.5.65 1.5 1.5v5c0 .84-.65 1.5-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-5c0-.84.65-1.5 1.5-1.5z"/>
                  <path d="M7 11.27v5c0 .84.65 1.5 1.5 1.5h9c.85 0 1.5-.66 1.5-1.5v-5"/>
                  <path d="M3.5 7.27h4"/>
                  <path d="M5.5 5.27v4"/>
                  <path d="M18 16.27c.5 1.22 1.06 2.65 1.18 3"/>
                  <path d="M12 20.27c.5-1.03 1.76-3.67 2.5-5"/>
                  <path d="M10 20.27c-1.5-3.33-2.5-5-2.5-5"/>
                </svg>
              </div>
              <span className="font-bold">EcoRecycle</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Connecting communities for a plastic-free future through innovative waste management solutions.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social}`} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v8"/>
                      <path d="M8 12h8"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link href="#collection" className="text-muted-foreground hover:text-primary transition-colors">Collection</Link></li>
              <li><Link href="#rewards" className="text-muted-foreground hover:text-primary transition-colors">Rewards</Link></li>
              <li><Link href="#logistics" className="text-muted-foreground hover:text-primary transition-colors">Logistics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-muted text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EcoRecycle. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
} 