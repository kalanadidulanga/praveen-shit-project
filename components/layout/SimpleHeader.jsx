"use client";

import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChevronDown, User, LogOut, Leaf, BookOpen, Home, BarChart3, Award, MapPin, Settings, CreditCard, LayoutDashboard, Recycle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/LogoutButton";

const navItems = [
  { label: "Home", href: "/" },
  { 
    label: "Solutions", 
    href: "#", 
    dropdown: [
      { label: "For Individuals", href: "/solutions/individuals" },
      { label: "For Communities", href: "/solutions/communities" },
      { label: "For Businesses", href: "/solutions/businesses" },
      { label: "For Collectors", href: "/solutions/collectors" },
    ] 
  },
  { label: "Marketplace", href: "/marketplace" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
];

export function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [pointsCount, setPointsCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const isAuthenticated = !!user || !!session?.user;
  const userData = user || session?.user;

  useEffect(() => {
    // Fetch user points if authenticated
    if (isAuthenticated && userData?.id) {
      fetchUserPoints();
    }

    // Handle scroll effect
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated, userData, scrolled]);

  useEffect(() => {
    // Initial cart count
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const fetchUserPoints = async () => {
    try {
      // Skip fetching points for business users
      if (userData?.userType === 'BUSINESS') {
        setPointsCount(0);
        return;
      }

      const response = await fetch('/api/user/points');
      const data = await response.json();
      
      // Only set points if the request was successful and user is not a business
      if (response.ok && data.points !== undefined) {
        setPointsCount(data.points);
      } else {
        // Silently handle any errors by setting points to 0
        setPointsCount(0);
      }
    } catch (error) {
      // Silently handle any errors by setting points to 0
      console.error('Error fetching points:', error);
      setPointsCount(0);
    }
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('ecorecycleCart') || '[]');
    setCartCount(cart.length);
  };

  const handleLogout = async () => {
    try {
      // First, call your custom logout API endpoint
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Then use the auth context's logout function which calls NextAuth signOut
      await logout();
      
      // Close the mobile menu if open
      setMobileMenuOpen(false);
      
      // Show logout notification
      toast({
        title: "Logged out successfully",
        description: "You have been logged out from your account.",
        variant: "success",
      });
      
      // No need to navigate here as the auth context logout already does that
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md" 
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-18 items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-4" onClick={closeMenu}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md"
                  whileHover={{ boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)" }}
                >
                  <Leaf className="h-5 w-5" />
                  <motion.div
                    className="absolute h-full w-full rounded-full border border-green-400/50"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight">
                    Eco<span className="text-green-600">Recycle</span>
                  </span>
                  <span className="text-xs text-gray-500 -mt-1">Sustainable Future</span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            <NavLink href="/" icon={<Home className="h-4 w-4" />}>
              Home
            </NavLink>
            
            {/* Only show collection link for collector users */}
            {session?.user?.userType?.toUpperCase() === 'COLLECTOR' && (
              <NavLink href="/collection" icon={<Recycle className="h-4 w-4" />}>
                Collections
              </NavLink>
            )}
            
            {/* Hide marketplace for collectors */}
            {session?.user?.userType?.toUpperCase() !== 'COLLECTOR' && (
              <NavLink href="/marketplace" icon={<BarChart3 className="h-4 w-4" />}>
                Marketplace
              </NavLink>
            )}
            
            {/* Hide rewards for collectors */}
            {session?.user?.userType?.toUpperCase() !== 'COLLECTOR' && (
              <NavLink href="/rewards" icon={<Award className="h-4 w-4" />}>
                Rewards
              </NavLink>
            )}
            
            <NavLink href="/about" icon={<BookOpen className="h-4 w-4" />}>
              About
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {isAuthenticated ? (
              <>
                {/* Points Display - Hide for collectors and business users */}
                {userData?.userType?.toUpperCase() !== 'COLLECTOR' && userData?.userType !== 'BUSINESS' && (
                  <Link href="/rewards">
                    <motion.div 
                      className="hidden sm:flex items-center rounded-full bg-green-50 px-3 py-1 border border-green-100"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Award className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-800">{pointsCount} pts</span>
                    </motion.div>
                  </Link>
                )}

                {/* Shopping Cart - Updated with Link - Hide for collectors */}
                {userData?.userType?.toUpperCase() !== 'COLLECTOR' && (
                  <Link href="/marketplace/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-medium text-white">
                        {cartCount}
                      </span>
                    </Button>
                  </Link>
                )}

                {/* User Profile Dropdown - Shadcn Version */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 relative h-8 pl-2 pr-1 rounded-full">
                      <Avatar className="h-8 w-8 border border-green-100">
                        <AvatarImage src={userData?.image} alt={userData?.name || "User"} />
                        <AvatarFallback className="bg-green-100 text-green-800 font-medium">
                          {userData?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block max-w-[80px] truncate text-sm font-medium">
                        {userData?.name?.split(" ")[0] || "User"}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-56 bg-white"
                    align="end" 
                    sideOffset={8}
                  >
                    <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50">
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50">
                      <Link href="/dashboard" className="flex items-center w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem 
                      className="text-red-600 hover:bg-red-50 focus:text-red-600 focus:bg-red-50 cursor-pointer" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Post Product Button */}
                {userData?.userType?.toUpperCase() === 'INDIVIDUAL' && (
                  <Link href="/dashboard?tab=post" legacyBehavior>
                    <Button className="flex items-center gap-2" asChild>
                      <a>
                        <Plus className="h-4 w-4" />
                        Post Product
                      </a>
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b shadow-sm bg-white/95 backdrop-blur-sm md:hidden"
          >
            <Container>
              <div className="flex flex-col py-4 space-y-4">
                {isAuthenticated && (
                  <div className="p-4 rounded-lg bg-green-50 flex items-center space-x-3 mb-2">
                    <Avatar className="h-12 w-12 border-2 border-green-200">
                      <AvatarImage src={userData?.image} alt={userData?.name || "User"} />
                      <AvatarFallback className="bg-green-100 text-green-800 font-medium text-lg">
                        {userData?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{userData?.name || "User"}</p>
                      {/* Only show points for non-collector, non-business users */}
                      {userData?.userType?.toUpperCase() !== 'COLLECTOR' && userData?.userType !== 'BUSINESS' && (
                        <Link href="/rewards" className="flex items-center text-green-700 text-sm">
                          <Award className="h-3 w-3 mr-1" />
                          <span>{pointsCount} points</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                <MobileNavLink href="/" onClick={closeMenu}>
                  <Home className="h-5 w-5 mr-3" />
                  Home
                </MobileNavLink>
                
                {/* Hide marketplace for collectors in mobile menu */}
                {session?.user?.userType?.toUpperCase() !== 'COLLECTOR' && (
                  <MobileNavLink href="/marketplace" onClick={closeMenu}>
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Marketplace
                  </MobileNavLink>
                )}
                
                {/* Only show collection link for collector users in mobile menu */}
                {session?.user?.userType?.toUpperCase() === 'COLLECTOR' && (
                  <MobileNavLink href="/collection" onClick={closeMenu}>
                    <Recycle className="h-5 w-5 mr-3" />
                    Collections
                  </MobileNavLink>
                )}
                
                {/* Hide rewards for collectors in mobile menu */}
                {session?.user?.userType?.toUpperCase() !== 'COLLECTOR' && (
                  <MobileNavLink href="/rewards" onClick={closeMenu}>
                    <Award className="h-5 w-5 mr-3" />
                    Rewards
                  </MobileNavLink>
                )}
                
                <MobileNavLink href="/about" onClick={closeMenu}>
                  <BookOpen className="h-5 w-5 mr-3" />
                  About
                </MobileNavLink>

                {isAuthenticated ? (
                  <>
                    <hr className="border-gray-200 my-2" />
                    <MobileNavLink href="/dashboard" onClick={closeMenu}>
                      <User className="h-5 w-5 mr-3" />
                      Dashboard
                    </MobileNavLink>
                    <MobileNavLink href="/profile" onClick={closeMenu}>
                      <User className="h-5 w-5 mr-3" />
                      Profile Settings
                    </MobileNavLink>
                    <div className="mt-4">
                      <LogoutButton 
                        variant="outline" 
                        fullWidth 
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      />
                    </div>
                  </>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/login" onClick={closeMenu}>
                        Log In
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-gradient-to-r from-green-500 to-green-600">
                      <Link href="/register" onClick={closeMenu}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Style for dropdown items */}
      <style jsx global>{`
        .dropdown-item {
          @apply flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors;
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="group relative mx-2 flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
    >
      <span className="flex items-center gap-1.5">
        {icon}
        {children}
      </span>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 