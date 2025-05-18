"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SimpleFooter } from "@/components/layout/SimpleFooter";

export default function CollectionLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check authorization when session is loaded
    if (status === "loading") return;

    // If not logged in, redirect to login
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    // Check if user is a collector
    const isCollector = session.user?.userType?.toUpperCase() === 'COLLECTOR';
    
    if (!isCollector) {
      // Redirect non-collectors to home
      router.push('/');
      
      toast({
        title: "Access Restricted",
        description: "Only collectors can access this page",
        variant: "destructive",
      });
      
      return;
    }
    
    // User is authorized
    setAuthorized(true);
  }, [session, status, pathname, router, toast]);

  // Show nothing while checking authorization
  if (!authorized) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Render children when authorized
  return (
    <>
      <SimpleHeader />
      <main className="min-h-screen bg-gradient-to-b from-white to-primary/5 pb-20 pt-10">
        {children}
      </main>
      <SimpleFooter />
    </>
  );
} 