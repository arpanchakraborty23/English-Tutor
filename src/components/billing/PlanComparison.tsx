import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Building2 } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Perfect for trying out AI Tutor",
    features: [
      "3 sessions per month",
      "Basic subjects",
      "Email support",
      "Standard AI model",
    ],
    limitations: [
      "No code editor",
      "Limited sessions",
    ],
    cta: "Current Plan",
    popular: false,
    icon: Sparkles,
    color: "#6B7280",
  },
  {
    id: "basic",
    name: "Basic",
    price: 19,
    description: "Great for regular learners",
    features: [
      "20 sessions per month",
      "All subjects included",
      "Priority email support",
      "Advanced AI model",
      "Code editor access",
    ],
    limitations: [],
    cta: "Upgrade to Basic",
    popular: true,
    icon: Crown,
    color: "#10B981",
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    description: "For serious learners",
    features: [
      "Unlimited sessions",
      "All subjects included",
      "24/7 priority support",
      "Premium AI model",
      "Advanced code editor",
      "Session recordings",
      "Export notes",
    ],
    limitations: [],
    cta: "Upgrade to Pro",
    popular: false,
    icon: Crown,
    color: "#6366F1",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    description: "Custom solutions for teams",
    features: [
      "Everything in Pro",
      "Team management",
      "Custom AI models",
      "Analytics dashboard",
      "SSO authentication",
      "Dedicated support",
      "Custom integrations",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
    icon: Building2,
    color: "#F59E0B",
  },
];

interface PlanComparisonProps {
  currentPlan?: string;
  onUpgrade?: (planId: string) => void;
}

export function PlanComparison({ currentPlan = "free", onUpgrade }: PlanComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {plans.map((plan) => {
        const Icon = plan.icon;
        const isCurrent = currentPlan === plan.id;

        return (
          <Card
            key={plan.id}
            className={cn(
              "relative p-5 border-[#E5E9EE] transition-all duration-300",
              plan.popular && "border-[#10B981] ring-2 ring-[#10B981]/20",
              !plan.popular && "hover:border-[#D1D5DB]"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#10B981] text-white text-xs">Most Popular</Badge>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${plan.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: plan.color }} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F1923]">{plan.name}</h3>
              </div>
            </div>

            <div className="mb-4">
              {plan.price !== null ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#0F1923]">${plan.price}</span>
                  <span className="text-[#9CA3AF]">/month</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-[#0F1923]">Custom</span>
              )}
              <p className="text-sm text-[#6B7280] mt-1">{plan.description}</p>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-[#374151]">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={cn(
                "w-full",
                isCurrent
                  ? "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#F3F4F6]"
                  : plan.popular
                    ? "bg-[#10B981] hover:bg-[#059669] text-white"
                    : "bg-[#0F1923] hover:bg-[#1F2937] text-white"
              )}
              disabled={isCurrent}
              onClick={() => onUpgrade?.(plan.id)}
            >
              {isCurrent ? "Current Plan" : plan.cta}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
