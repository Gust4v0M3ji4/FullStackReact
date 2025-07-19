// src/components/form/Input.tsx
import { cn } from "@/lib/utils";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="text-sm text-gray-700 dark:text-gray-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-violet-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
