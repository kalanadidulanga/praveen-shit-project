"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Auth context
const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Auth provider
export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  // Use effect to update user when session changes
  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      
      // If we have user points, add them to the user state
      const fetchUserPoints = async () => {
        try {
          // You can replace this with actual API call when ready
          const points = session.user.points || 0;
          setUser({
            ...session.user,
            points
          });
        } catch (error) {
          console.error("Failed to fetch user points:", error);
        }
      };
      
      fetchUserPoints();
    } else if (status !== 'loading') {
      setUser(null);
    }
  }, [session, status]);
  
  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        setError(result.error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || 'Login failed');
      return false;
    }
  };
  
  // Register function
  const register = async (name, email, password, userType) => {
    try {
      setError(null);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, userType }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return false;
      }
      
      // Auto-login after registration
      return await login(email, password);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || 'Registration failed');
      return false;
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      // Clear any local state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userPreferences');
        // Add any other local storage items you need to clear
      }
      
      // Use NextAuth's signOut
      await signOut({ redirect: false });
      
      // Clear the user state
      setUser(null);
      
      // Navigate to home page
      router.push('/');
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message || 'Logout failed');
    }
  };
  
  // Function to check session expiry
  useEffect(() => {
    const checkSession = async () => {
      // If we have a session and a JWT, check if it's expired
      if (session?.expires) {
        const expiryDate = new Date(session.expires);
        const now = new Date();
        
        // If session is expired or about to expire in 5 minutes, log out
        if (expiryDate < new Date(now.getTime() + 5 * 60 * 1000)) {
          console.log('Session expired or about to expire, logging out...');
          await logout();
        }
      }
    };
    
    // Check on load
    checkSession();
    
    // Set up interval to check periodically
    const interval = setInterval(checkSession, 60 * 1000); // Check every minute
    
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    // Redirect authenticated users away from auth pages
    if (status === 'authenticated' && window.location.pathname.match(/^\/login|^\/register/)) {
      router.replace('/dashboard')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      // Check session validity periodically
      const checkSession = async () => {
        try {
          const response = await fetch('/api/auth/validate-session');
          const data = await response.json();
          
          if (!data.valid) {
            // If session is invalid, log out
            await signOut({ redirect: false });
            setUser(null);
            router.push('/login');
          }
        } catch (error) {
          console.error('Session validation error:', error);
        }
      };

      // Check immediately and then every minute
      checkSession();
      const interval = setInterval(checkSession, 60000);

      return () => clearInterval(interval);
    }
  }, [session, router]);
  
  return (
    <AuthContext.Provider value={{
      user: user,
      loading: status === 'loading',
      error,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth hook for easy use
export function useAuth() {
  return useContext(AuthContext);
} 