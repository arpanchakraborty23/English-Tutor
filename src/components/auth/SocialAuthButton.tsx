import React from "react";
import { Button } from "@/components/ui/button";

interface SocialAuthButtonProps {
  provider: "google" | "github";
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const PROVIDERS = {
  google: {
    label: "Continue with Google",
    icon: "🔍",
  },
  github: {
    label: "Continue with GitHub",
    icon: "🐙",
  },
};

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  const { label, icon } = PROVIDERS[provider];

  return (
    <Button
      variant="outline"
      className="w-full h-10"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <span className="mr-2 text-lg">{icon}</span>
      {label}
    </Button>
  );
};
