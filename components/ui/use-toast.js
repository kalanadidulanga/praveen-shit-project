"use client";

import * as React from "react";
import { ToastContext } from "./toast";

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Export a toast function that needs to be used with useToast
export const toast = {
  // This is just a placeholder, users will need to get the actual toast function from useToast
  __placeholder: true,
}; 