import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import {
  ButtonOrnament,
  buttonClasses,
} from "@/components/ui/buttonStyles";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      <ButtonOrnament />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
