interface LanguageBadgeProps {
  flag: string;
  name: string;
}

export function LanguageBadge({ flag, name }: LanguageBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground shadow-sm hover:shadow-md transition-shadow cursor-default">
      <span className="text-base">{flag}</span>
      {name}
    </span>
  );
}
