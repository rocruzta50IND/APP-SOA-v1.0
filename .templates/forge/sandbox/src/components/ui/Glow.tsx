import { cn } from "@/lib/utils";

export function Glow({
  className,
  color = "bg-primary",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn(
        "absolute -z-10 blur-[100px] rounded-full opacity-20",
        color,
        className
      )}
    />
  );
}
