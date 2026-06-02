"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card = ({ className, children, glow, ...props }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-black/5 bg-white/50 p-6 backdrop-blur-md transition-colors hover:border-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-[80px]" />
      )}
      {children}
    </motion.div>
  );
};
