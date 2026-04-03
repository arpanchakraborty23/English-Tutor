import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordState {
  state: "form" | "success" | "error";
  email?: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<ForgotPasswordState>({ state: "form" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // TODO: Call API endpoint to send password reset email
      console.log("Password reset requested for:", data.email);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Reset link sent to your email!");
      setFormState({ state: "success", email: data.email });
    } catch (error) {
      toast.error("Email not found. Please try another address.");
      setFormState({ state: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!formState.email) return;
    setIsLoading(true);
    try {
      // TODO: Call API endpoint to resend email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Reset link sent again!");
    } catch (error) {
      toast.error("Failed to resend. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={formState.state === "form" ? "Reset password" : "Check your email"}
      subtitle={
        formState.state === "form"
          ? "Enter your email and we'll send you a link to reset your password"
          : "We've sent a password reset link to your email"
      }
    >
      {formState.state === "form" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading} size="lg">
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>

          {/* Back to login */}
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </div>
        </form>
      ) : formState.state === "success" ? (
        <div className="space-y-6">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
            <p className="text-sm text-foreground mb-2">
              We've sent a password reset link to:
            </p>
            <p className="font-medium text-primary break-all">{formState.email}</p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>The link will expire in 24 hours. Check your spam folder if you don't see the email.</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResend}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Resending..." : "Resend link"}
            </Button>

            <Link to="/login">
              <Button variant="outline" className="w-full" size="lg">
                Back to login
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </AuthLayout>
  );
};

export default ForgotPassword;
