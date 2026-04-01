import { type ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
        {icon}
      </div>
      <h3 className="font-heading text-lg mb-1.5">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </article>
  );
}
