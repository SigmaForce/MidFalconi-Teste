import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const inputVariants = cva(
  "p-3 w-full h-10 placeholder:text-placeholder border-[#3C393F] border rounded-sm focus:border-secondary outline-none text-foreground",
  {
    variants: {
      hasIcon: {
        true: "pr-10",
      },
    },
  }
);

const containerVariants = cva("flex flex-col gap-2 justify-baseline w-full", {
  variants: {
    variant: {
      full: "max-w-full",
      md: "lg:max-w-md",
      lg: "lg:max-w-lg",
      sm: "lg:max-w-sm",
    },
  },
  defaultVariants: {
    variant: "full",
  },
});

interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof containerVariants> {
  icon?: React.ReactNode;
}

export function Input({ className, variant, icon, ...props }: InputProps) {
  return (
    <div className={containerVariants({ variant })}>
      <div className="relative w-full">
        <input
          className={inputVariants({ className, hasIcon: !!icon })}
          {...props}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6D78] pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
