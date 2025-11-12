import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

const iconButton = cva(
  "flex items-center justify-center rounded-lg  transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "size-6",
        md: "size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface IconButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof iconButton> {
  icon: ReactNode;
}

export function IconButton({
  icon,
  size,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={iconButton({ size, className })}
      type="button"
      {...props}
    >
      {icon}
    </button>
  );
}
