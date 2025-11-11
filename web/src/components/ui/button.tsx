import { cn } from "@/src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const ButtonVariants = cva(
  "flex w-full text-white cursor-pointer items-center rounded-md h-11 justify-center transition-colors duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 active:bg-primary/80 disabled:bg-zinc-300 disabled:cursor-auto",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof ButtonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(ButtonVariants({ variant, className }))}
      type="button"
      {...props}
    />
  );
}
