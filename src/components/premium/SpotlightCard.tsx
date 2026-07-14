import React from 'react';
import { cn } from '@/lib/utils';

export function SpotlightCard({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl glass-panel p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,155,42,0.15)] hover:border-[#C89B2A]/40 group",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C89B2A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
