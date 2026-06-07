"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function ThemeGlows() {
  const pathname = usePathname();
  const isProd = pathname === "/production";
  return (
    <>
      <div className={cn("absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none -z-10", isProd && "bg-emerald-500/5")} />
      <div className={cn("absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/2 blur-[150px] rounded-full pointer-events-none -z-10", isProd && "bg-emerald-500/2")} />
    </>
  );
}