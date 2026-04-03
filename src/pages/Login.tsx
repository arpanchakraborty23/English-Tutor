import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const DEMO_CREDENTIALS = {
  email: "demo@example.com",
  password: "DemoPassword123!",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");

  const handleUseDemoAccount = () => {
    setValue("email", DEMO_CREDENTIALS.email);
    setValue("password", DEMO_CREDENTIALS.password);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Call API endpoint
      console.log("Login attempt:", data);
      toast.success("Login successful!");
      // TODO: Set auth token and redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    // TODO: Implement social login
    toast.info(`${provider} login coming soon`);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue learning">
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

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Demo Account Button */}
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-muted-foreground mb-2">🧪 Demo Account (for testing):</p>
          <div className="space-y-1 text-xs mb-3">
            <p><span className="font-medium">Email:</span> {DEMO_CREDENTIALS.email}</p>
            <p><span className="font-medium">Password:</span> {DEMO_CREDENTIALS.password}</p>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleUseDemoAccount}
            className="w-full"
          >
            Use Demo Account
          </Button>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        {/* Divider */}
        <div className="relative">
          <Separator className="my-4" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Social Auth */}
        <div className="space-y-3">
          <SocialAuthButton
            provider="google"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
          />
          <SocialAuthButton
            provider="github"
            onClick={() => handleSocialLogin("github")}
            disabled={isLoading}
          />
        </div>

        {/* Sign up link */}
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Create one
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
