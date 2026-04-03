import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branded illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex-col items-center justify-center p-12">
        <div className="max-w-md text-center space-y-8">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl mb-4">English Tutor</h1>
            <p className="text-muted-foreground text-lg">
              Master English at your own pace with personalized lessons designed just for you.
            </p>
          </div>
          
          {/* Decorative illustration placeholder */}
          <div className="space-y-4 mt-12">
            <div className="h-64 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl flex items-center justify-center">
              <div className="text-6xl">📚</div>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>✨ AI-powered personalization</p>
              <p>🎯 Adaptive learning paths</p>
              <p>🌍 Learn from native speakers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground text-sm sm:text-base">{subtitle}</p>}
          </div>

          {/* Form content */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
