import { cn } from "@/lib/utils";

export function Card({
  dark = false,
  className,
  children,
}: {
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        dark
          ? "border border-white/10 bg-navy-800"
          : "border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
