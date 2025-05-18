"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function LogoutButton({ variant = "default", size = "default", className, fullWidth = false }) {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      
      // First confirm - using browser's built-in confirm dialog
      if (window.confirm("Are you sure you want to log out?")) {
        // Call the server logout endpoint first
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Then use the auth context logout
        await logout();
        
        toast({
          title: "Logged out successfully",
          description: "You have been safely logged out from your account.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${fullWidth ? 'w-full' : ''} ${className || ''}`}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </>
      )}
    </Button>
  );
} 