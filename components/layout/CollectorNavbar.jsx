import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function CollectorNavbar() {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container">
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/collector" className="font-semibold text-lg">
            EcoRecycle Collector
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
} 