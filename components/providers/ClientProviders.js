"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../../lib/auth";
import { ToastProvider } from "../ui/toast";

// Add this wrapper component
export function InternalToastProvider({ children }) {
  // Store a reference to the toast context on window
  const setToastContext = (context) => {
    if (typeof window !== 'undefined') {
      window.__TOAST_CONTEXT__ = context;
    }
  };

  return (
    <ToastProvider onContextChange={setToastContext} data-toast-provider="true">
      {children}
    </ToastProvider>
  );
}

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <InternalToastProvider>
          {children}
        </InternalToastProvider>
      </AuthProvider>
    </SessionProvider>
  );
}