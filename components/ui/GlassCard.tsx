import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded bg-surface hairline p-6 shadow-[0_20px_60px_-20px_rgba(122,0,0,0.5)]",
        className
      )}
    >
      {children}
    </div>
  );
}
