import { cn } from "@/lib/utils";

export function Container({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 