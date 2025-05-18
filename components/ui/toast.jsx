"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export const ToastContext = createContext({
  toast: () => {},
  toasts: [],
  removeToast: () => {},
});

export function ToastProvider({ children, onContextChange }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const contextValue = { toast: addToast, toasts, removeToast };
  
  useEffect(() => {
    if (onContextChange) {
      onContextChange(contextValue);
    }
  }, [onContextChange, contextValue]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full md:max-w-sm">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export const toast = (props) => {
  if (typeof window !== 'undefined') {
    const toastProvider = document.querySelector('[data-toast-provider="true"]');
    if (!toastProvider || !window.__TOAST_CONTEXT__) {
      console.error("toast function was called outside of ToastProvider");
      return;
    }
    return window.__TOAST_CONTEXT__.toast(props);
  }
  console.error("toast function was called in a non-browser environment");
};

function Toast({ id, title, description, variant = "default", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      className={cn(
        "bg-white border rounded-md shadow-lg p-4 flex items-start space-x-4 animate-in slide-in-from-right-full",
        variant === "destructive" && "border-destructive bg-destructive/10",
        variant === "success" && "border-green-500 bg-green-100"
      )}
    >
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
} 