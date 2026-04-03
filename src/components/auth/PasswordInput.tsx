import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  showStrength?: boolean;
  disabled?: boolean;
  name?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder = "••••••••",
  value,
  onChange,
  onBlur,
  error,
  showStrength = false,
  disabled = false,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Calculate password strength (0-4)
  const calculateStrength = (password: string): number => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const strength = calculateStrength(value);

  const getStrengthColor = (s: number): string => {
    switch (s) {
      case 0:
        return "bg-muted";
      case 1:
        return "bg-destructive";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  const getStrengthLabel = (s: number): string => {
    switch (s) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {showStrength && value && (
        <div className="space-y-1">
          <div className="flex gap-1 h-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-colors ${
                  i < strength ? getStrengthColor(strength) : "bg-muted"
                }`}
              />
            ))}
          </div>
          {strength > 0 && (
            <p className={`text-xs font-medium ${
              strength === 4 ? "text-success" : strength === 3 ? "text-blue-500" : strength === 2 ? "text-yellow-500" : "text-destructive"
            }`}>
              {getStrengthLabel(strength)} password
            </p>
          )}
        </div>
      )}

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
};
