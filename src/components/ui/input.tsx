import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg bg-fp-primary-darker px-3 py-2 text-sm ring-offset-fp-primary transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-fp-primary-hover-darker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fp-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
