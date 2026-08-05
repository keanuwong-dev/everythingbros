import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  variant?: "light" | "light-alt" | "dark" | "dark-alt";
  embedded?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variants = {
  light: "bg-white text-slate-600",
  "light-alt": "bg-slate-50 text-slate-600",
  dark: "bg-navy-950 text-slate-300",
  "dark-alt": "bg-navy-900 text-slate-300",
};

/** Mobile: panels can grow so content isn't clipped. Desktop: fixed viewport panel. */
export const PANEL_CLASS =
  "box-border shrink-0 pt-[calc(var(--header-height)+env(safe-area-inset-top,0px)+var(--panel-top-gap))] pb-[max(1rem,env(safe-area-inset-bottom))] min-h-[100svh] h-auto max-h-none overflow-visible md:h-[100svh] md:min-h-[100svh] md:max-h-[100svh] md:overflow-hidden";

type PagePartProps = {
  variant?: SectionProps["variant"];
  className?: string;
  children: React.ReactNode;
  panel?: boolean;
  snap?: boolean;
  hero?: boolean;
  contentAlign?: "center" | "start";
};

export function PagePart({
  variant = "light",
  className,
  children,
  panel = true,
  snap = true,
  hero = false,
  contentAlign = "center",
}: PagePartProps) {
  return (
    <div
      data-snap-panel={panel && snap ? true : undefined}
      className={cn(
        variants[variant],
        "relative flex flex-col overflow-hidden",
        panel && PANEL_CLASS,
        panel && snap && "md:snap-start",
        !panel && "min-h-0",
        className,
      )}
    >
      {hero && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]"
        />
      )}
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col max-md:overflow-visible md:overflow-hidden",
          contentAlign === "center" ? "justify-center" : "justify-start",
          hero && "md:pb-[8vh]",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Section({
  id,
  variant = "light",
  embedded = false,
  fill,
  className,
  children,
}: SectionProps & { fill?: boolean }) {
  const shouldFill = fill ?? embedded;

  const content = (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        shouldFill && "flex min-h-0 flex-1 flex-col overflow-hidden",
      )}
    >
      {children}
    </div>
  );

  if (embedded) {
    return (
      <section
        id={id}
        className={cn(
          shouldFill && "flex min-h-0 flex-1 flex-col overflow-hidden",
          !shouldFill && "[&:not(:first-child)]:pt-5 md:[&:not(:first-child)]:pt-6",
          id &&
            "scroll-mt-[calc(var(--header-height)+env(safe-area-inset-top,0px)+var(--panel-top-gap))]",
          className,
        )}
      >
        {content}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn("py-12 md:py-20 lg:py-28", variants[variant], className)}
    >
      {content}
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  dark = false,
  centered = false,
  compact = false,
  className,
}: {
  title: string;
  subtitle?: string;
  dark?: boolean;
  centered?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shrink-0",
        compact ? "mb-3 md:mb-4" : "mb-10 md:mb-14",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "font-bold leading-tight tracking-tight",
          compact ? "text-2xl md:text-2xl" : "text-3xl md:text-4xl",
          dark ? "text-white" : "text-navy-950",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl",
            compact
              ? "mt-2 text-sm leading-relaxed md:mt-1.5 md:text-sm"
              : "mt-3 text-lg leading-relaxed",
            centered && "mx-auto",
            dark ? "text-slate-400" : "text-slate-600",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function SectionAnchor({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-[calc(var(--header-height)+env(safe-area-inset-top,0px)+var(--panel-top-gap))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
