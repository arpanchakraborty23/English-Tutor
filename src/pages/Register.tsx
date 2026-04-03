import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  const password = watch("password", "");
  const termsAccepted = watch("termsAccepted", false);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // TODO: Call API endpoint
      console.log("Registration attempt:", data);
      toast.success("Account created! Let's set up your learning journey.");
      // Redirect to onboarding wizard
      localStorage.setItem("user_email", data.email);
      localStorage.setItem("user_fullName", data.fullName);
      navigate("/onboarding");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: "google" | "github") => {
    // TODO: Implement social signup
    toast.info(`${provider} signup coming soon`);
  };

  return (
    <AuthLayout title="Create account" subtitle="Join millions learning English every day">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs font-medium text-destructive">{errors.fullName.message}</p>
          )}
        </div>

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

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="pr-10"
            />
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-destructive">{errors.password.message}</p>
          )}
          {password && (
            <div className="space-y-1">
              <div className="flex gap-1 h-1">
                {[0, 1, 2, 3].map((i) => {
                  let strength = 0;
                  if (password.length >= 8) strength++;
                  if (password.length >= 12) strength++;
                  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
                  if (/\d/.test(password)) strength++;
                  if (/[^a-zA-Z\d]/.test(password)) strength++;
                  strength = Math.min(strength, 4);

                  const colors = ["bg-muted", "bg-destructive", "bg-yellow-500", "bg-blue-500", "bg-success"];
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-colors ${
                        i < strength ? colors[strength] : "bg-muted"
                      }`}
                    />
                  );
                })}
              </div>
              {password && (
                <p className="text-xs font-medium text-muted-foreground">
                  Password strength indicator
                </p>
              )}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs font-medium text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms & Privacy Checkbox */}
        <div className="flex items-start gap-3">
          <Controller
            name="termsAccepted"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground cursor-pointer">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-xs font-medium text-destructive">{errors.termsAccepted.message}</p>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? "Creating account..." : "Create account"}
        </Button>

        {/* Divider */}
        <div className="relative">
          <Separator className="my-4" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            Or sign up with
          </span>
        </div>

        {/* Social Auth */}
        <div className="space-y-3">
          <SocialAuthButton
            provider="google"
            onClick={() => handleSocialSignup("google")}
            disabled={isLoading}
          />
          <SocialAuthButton
            provider="github"
            onClick={() => handleSocialSignup("github")}
            disabled={isLoading}
          />
        </div>

        {/* Sign in link */}
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
