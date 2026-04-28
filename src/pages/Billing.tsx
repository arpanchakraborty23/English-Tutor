import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, FileText, Settings, Download } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const currentPlanData = {
  id: "basic",
  name: "Basic",
  price: 19,
  sessionsUsed: 14,
  sessionsLimit: 20,
  renewalDate: "May 15, 2026",
  status: "active" as const,
};

const invoicesData = [
  { id: "INV-001", date: "Apr 15, 2026", amount: 19, status: "paid" as const },
  { id: "INV-002", date: "Mar 15, 2026", amount: 19, status: "paid" as const },
  { id: "INV-003", date: "Feb 15, 2026", amount: 19, status: "paid" as const },
];

const paymentMethodData = {
  brand: "Visa",
  last4: "4242",
  expiry: "12/2027",
};

const plans = [
  { id: "free", name: "Free", price: 0, sessions: "3/month", features: ["Text chat", "1 subject"] },
  { id: "basic", name: "Basic", price: 19, sessions: "20/month", features: ["Voice + avatar", "3 subjects", "Progress tracking"] },
  { id: "pro", name: "Pro", price: 49, sessions: "Unlimited", features: ["All features", "Code editor", "Priority AI", "All subjects"] },
];

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const usagePercent = (currentPlanData.sessionsUsed / currentPlanData.sessionsLimit) * 100;

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed} 
        onCollapsedChange={setIsSidebarCollapsed} 
      />

      <div className={cn(
        "transition-all duration-300",
        isSidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
      )}>
        <DashboardHeader />

        <main className="p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-[#374151]" style={{ fontFamily: "'Lora', serif" }}>Billing</h1>
              <p className="text-[13px] text-[#9CA3AF] mt-1">Manage your subscription and payments</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 bg-white border border-[#E8E4DC] rounded-lg p-1">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-[#CCFBF1] data-[state=active]:text-[#0D9488] gap-2 rounded-md text-[13px]"
                >
                  <CreditCard className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="plans" 
                  className="data-[state=active]:bg-[#CCFBF1] data-[state=active]:text-[#0D9488] gap-2 rounded-md text-[13px]"
                >
                  <FileText className="w-4 h-4" />
                  Plans
                </TabsTrigger>
                <TabsTrigger 
                  value="invoices" 
                  className="data-[state=active]:bg-[#CCFBF1] data-[state=active]:text-[#0D9488] gap-2 rounded-md text-[13px]"
                >
                  <Download className="w-4 h-4" />
                  Invoices
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                {/* Current Plan */}
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[13px] font-semibold text-[#374151]">Current Plan</h3>
                      <p className="text-[11px] text-[#9CA3AF]">Your subscription details</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#CCFBF1] text-[#0D9488] text-[11px] font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#F3F4F6]">
                    <div>
                      <p className="text-lg font-semibold text-[#374151]">{currentPlanData.name} Plan</p>
                      <p className="text-[13px] text-[#6B7280]">${currentPlanData.price}/month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] text-[#9CA3AF]">Next billing</p>
                      <p className="text-[13px] font-medium text-[#374151]">{currentPlanData.renewalDate}</p>
                    </div>
                  </div>
                </Card>

                {/* Usage */}
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Usage This Month</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#6B7280]">Sessions Used</span>
                        <span className="font-medium text-[#374151]">{currentPlanData.sessionsUsed} / {currentPlanData.sessionsLimit}</span>
                      </div>
                      <div className="h-2 bg-[#E5E9EE] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0D9488] rounded-full transition-all" 
                          style={{ width: `${usagePercent}%` }} 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[12px] mb-1">
                        <span className="text-[#6B7280]">Storage Used</span>
                        <span className="font-medium text-[#374151]">2.4 GB / 10 GB</span>
                      </div>
                      <div className="h-2 bg-[#E5E9EE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '24%' }} />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Payment Method */}
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[13px] font-semibold text-[#374151]">Payment Method</h3>
                    <button className="text-[12px] text-[#0D9488] hover:underline">Edit</button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F3F4F6]">
                    <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-[10px] font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#374151]">•••• {paymentMethodData.last4}</p>
                      <p className="text-[11px] text-[#9CA3AF]">Expires {paymentMethodData.expiry}</p>
                    </div>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h4 className="text-[13px] font-semibold text-[#374151] mb-4">Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 rounded-lg border border-[#E8E4DC] bg-white hover:bg-[#F3F4F6] text-[12px] text-[#374151] transition-colors">
                      Add Payment Method
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-[#E8E4DC] bg-white hover:bg-[#F3F4F6] text-[12px] text-[#374151] transition-colors">
                      Update Plan
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-[#EF4444]/20 bg-white hover:bg-[#FEF2F2] text-[12px] text-[#EF4444] transition-colors">
                      Cancel Subscription
                    </button>
                  </div>
                </Card>
              </TabsContent>

              {/* Plans Tab */}
              <TabsContent value="plans" className="space-y-4">
                <Card className="p-5 border-[#E8E4DC] bg-white rounded-xl shadow-sm">
                  <h3 className="text-[13px] font-semibold text-[#374151] mb-4">Choose Your Plan</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all",
                          currentPlanData.id === plan.id
                            ? "border-[#0D9488] bg-[#CCFBF1]/30"
                            : "border-[#E8E4DC] bg-white hover:border-[#0D9488]/30"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-[14px] font-semibold text-[#374151]">{plan.name}</h4>
                          {currentPlanData.id === plan.id && (
                            <span className="px-2 py-0.5 rounded bg-[#0D9488] text-white text-[10px]">Current</span>
                          )}
                        </div>
                        <p className="text-2xl font-bold text-[#374151] mb-1">
                          ${plan.price}<span className="text-[13px] font-normal text-[#6B7280]">/mo</span>
                        </p>
                        <p className="text-[11px] text-[#6B7280] mb-3">{plan.sessions} sessions</p>
                        <ul className="space-y-1 mb-4">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="text-[12px] text-[#374151] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {currentPlanData.id !== plan.id && (
                          <button className={cn(
                            "w-full py-2 rounded-lg text-[12px] font-medium transition-colors",
                            plan.price === 0 
                              ? "border border-[#E8E4DC] text-[#6B7280] hover:bg-[#F3F4F6]"
                              : "bg-[#0D9488] text-white hover:bg-[#0F766E]"
                          )}>
                            {plan.price === 0 ? "Downgrade" : "Upgrade"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Invoices Tab */}
              <TabsContent value="invoices">
                <Card className="border-[#E8E4DC] bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#E8E4DC]">
                    <h3 className="text-[13px] font-semibold text-[#374151]">Invoice History</h3>
                  </div>
                  <div className="divide-y divide-[#E8E4DC]">
                    {invoicesData.map((invoice) => (
                      <div key={invoice.id} className="px-5 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-medium text-[#374151]">{invoice.date}</p>
                          <p className="text-[11px] text-[#9CA3AF]">{invoice.id}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-semibold text-[#374151]">${invoice.amount}</span>
                          <span className="px-2 py-0.5 rounded bg-[#CCFBF1] text-[#0D9488] text-[10px] font-medium capitalize">
                            {invoice.status}
                          </span>
                          <button className="p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280]">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Billing;
