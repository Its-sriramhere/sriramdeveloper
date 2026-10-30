import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { ReactNode } from "react";

export function Button({
  children,
  href,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const styles = cn(
    "inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-sm border border-red px-6 text-sm font-semibold tracking-[0.08em] transition active:scale-[0.98]",
    variant === "primary"
      ? "bg-transparent text-white hover:bg-red"
      : "border-line bg-transparent text-white hover:border-red hover:bg-red",
    className
  );
  if (href) return <Link href={href} className={styles}>{children}</Link>;
  return <button className={styles}>{children}</button>;
}
