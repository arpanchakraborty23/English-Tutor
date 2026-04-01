interface LanguageBadgeProps {
  flag: string;
  name: string;
}

export function LanguageBadge({ flag, name }: LanguageBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground shadow-sm hover:shadow-md hover:border-primary/40 transition-all cursor-default select-none">
      <span className="text-base leading-none" role="img" aria-label={`${name} flag`}>
        {flag}
      </span>
      {name}
    </span>
  );
}
