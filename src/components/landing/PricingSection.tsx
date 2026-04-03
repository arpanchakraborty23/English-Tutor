import { Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Casual learners",
    features: [
      "1 language",
      "5 lessons per day",
      "Basic AI tutor",
      "Daily streaks",
      "Mobile app access",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    description: "Serious learners",
    features: [
      "All 40+ languages",
      "Unlimited lessons",
      "Advanced AI conversations",
      "Progress analytics",
      "Priority support",
      "30-day money-back guarantee",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Teams",
    price: "$7",
    period: "/user/mo",
    description: "Companies & groups",
    features: [
      "Bulk seats",
      "Admin dashboard",
      "Business vocabulary tracks",
      "Team analytics",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-label mb-4">PRICING</h2>
          <h3
            className="text-4xl md:text-5xl font-bold text-text mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start free. Upgrade when you're ready.
          </h3>
          <p className="text-text-2 mb-8">No credit card required to get started.</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingCycle === "monthly"
                  ? "bg-accent text-bg"
                  : "text-text-2 hover:text-text"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingCycle === "annual"
                  ? "bg-accent text-bg"
                  : "text-text-2 hover:text-text"
              }`}
            >
              Annual
              <span className="ml-2 text-xs font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.featured
                  ? "md:scale-105 ring-2"
                  : ""
              }`}
              style={{
                backgroundColor: plan.featured ? "linear-gradient(135deg, #0F2027, #1E3A2F)" : "var(--surface-2)",
                border: plan.featured ? "2px solid var(--accent)" : "1px solid var(--border)",
                borderImage: plan.featured
                  ? "linear-gradient(135deg, #0F2027, #1E3A2F) 1"
                  : undefined,
              }}
            >
              {/* Most Popular Badge */}
              {plan.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-bg"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Most Popular
                </div>
              )}

              <div className="p-8 space-y-6">
                {/* Plan Name */}
                <div>
                  <h4 className="text-2xl font-bold text-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {plan.name}
                  </h4>
                  <p className="text-text-2 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
                      {plan.price}
                    </span>
                    <span className="text-text-2">{plan.period}</span>
                  </div>
                  {billingCycle === "annual" && (
                    <p className="text-accent text-sm mt-2">📦 Billed annually</p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to="/register"
                  className={`w-full py-3 rounded-lg font-semibold transition-all text-center block ${
                    plan.featured
                      ? "btn-primary-landing"
                      : "btn-ghost-landing"
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features List */}
                <div className="space-y-3 py-6 border-t" style={{ borderColor: "var(--border)" }}>
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <Check size={18} className="text-accent flex-shrink-0" />
                      <span className="text-text-2 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
