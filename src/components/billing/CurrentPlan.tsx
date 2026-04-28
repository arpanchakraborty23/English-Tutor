import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CreditCard, Download, ExternalLink } from "lucide-react";

interface CurrentPlanProps {
  plan: {
    id: string;
    name: string;
    price: number;
    sessionsUsed: number;
    sessionsLimit: number;
    renewalDate: string;
    status: "active" | "paused" | "cancelled";
  };
  onCancel?: () => void;
  onResume?: () => void;
}

export function CurrentPlan({ plan, onCancel, onResume }: CurrentPlanProps) {
  const usagePercent = (plan.sessionsUsed / plan.sessionsLimit) * 100;

  return (
    <Card className="p-6 border-[#E5E9EE]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-[#0F1923]">{plan.name} Plan</h3>
            <Badge
              variant={plan.status === "active" ? "default" : "secondary"}
              className={cn(
                "text-xs",
                plan.status === "active" && "bg-[#D1FAE5] text-[#10B981] hover:bg-[#D1FAE5]",
                plan.status === "paused" && "bg-[#FEF3C7] text-[#F59E0B] hover:bg-[#FEF3C7]",
                plan.status === "cancelled" && "bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FEE2E2]"
              )}
            >
              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-[#0F1923]">
            ${plan.price}<span className="text-sm font-normal text-[#9CA3AF]">/month</span>
          </p>
        </div>
        {plan.status === "active" && (
          <Button variant="outline" size="sm" className="text-[#EF4444] border-[#EF4444]/20 hover:bg-[#FEF2F2]">
            Cancel Plan
          </Button>
        )}
        {plan.status === "paused" && (
          <Button variant="outline" size="sm" onClick={onResume}>
            Resume Plan
          </Button>
        )}
      </div>

      {/* Usage Meter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#6B7280]">Sessions Used</span>
          <span className="text-sm font-medium text-[#0F1923]">
            {plan.sessionsUsed} / {plan.sessionsLimit === -1 ? "∞" : plan.sessionsLimit}
          </span>
        </div>
        {plan.sessionsLimit !== -1 && (
          <Progress value={usagePercent} className="h-2 bg-[#F3F4F6]" />
        )}
        {plan.sessionsLimit === -1 && (
          <div className="h-2 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full" />
        )}
      </div>

      {/* Renewal Info */}
      <div className="flex items-center gap-3 text-sm text-[#6B7280]">
        <Calendar className="w-4 h-4" />
        <span>Next billing date: {plan.renewalDate}</span>
      </div>
    </Card>
  );
}

interface UsageMeterProps {
  sessionsUsed: number;
  sessionsLimit: number;
  storageUsed?: string;
  storageLimit?: string;
}

export function UsageMeter({ sessionsUsed, sessionsLimit, storageUsed, storageLimit }: UsageMeterProps) {
  const sessionPercent = sessionsLimit === -1 ? 100 : (sessionsUsed / sessionsLimit) * 100;

  return (
    <Card className="p-5 border-[#E5E9EE]">
      <h4 className="text-sm font-semibold text-[#0F1923] mb-4">Current Month Usage</h4>

      <div className="space-y-4">
        {/* Sessions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#6B7280]">Sessions</span>
            <span className="text-sm font-medium text-[#0F1923]">
              {sessionsUsed} / {sessionsLimit === -1 ? "Unlimited" : sessionsLimit}
            </span>
          </div>
          {sessionsLimit !== -1 ? (
            <Progress value={sessionPercent} className="h-2 bg-[#F3F4F6]" />
          ) : (
            <div className="h-2 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full" />
          )}
        </div>

        {/* Storage */}
        {storageUsed && storageLimit && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7280]">Storage</span>
              <span className="text-sm font-medium text-[#0F1923]">
                {storageUsed} / {storageLimit}
              </span>
            </div>
            <Progress value={50} className="h-2 bg-[#F3F4F6]" />
          </div>
        )}
      </div>
    </Card>
  );
}

interface InvoiceHistoryProps {
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "failed";
    invoiceUrl?: string;
  }>;
}

export function InvoiceHistory({ invoices }: InvoiceHistoryProps) {
  return (
    <Card className="p-5 border-[#E5E9EE]">
      <h4 className="text-sm font-semibold text-[#0F1923] mb-4">Invoice History</h4>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E9EE]">
              <th className="text-left py-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Invoice</th>
              <th className="text-left py-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Date</th>
              <th className="text-left py-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">Status</th>
              <th className="text-right py-3 text-xs font-medium text-[#9CA3AF] uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-[#E5E9EE] last:border-0">
                <td className="py-3 text-sm text-[#0F1923]">#{invoice.id}</td>
                <td className="py-3 text-sm text-[#6B7280]">{invoice.date}</td>
                <td className="py-3 text-sm font-medium text-[#0F1923]">${invoice.amount}</td>
                <td className="py-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      invoice.status === "paid" && "bg-[#D1FAE5] text-[#10B981] border-[#10B981]/20",
                      invoice.status === "pending" && "bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/20",
                      invoice.status === "failed" && "bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]/20"
                    )}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </td>
                <td className="py-3 text-right">
                  <Button variant="ghost" size="sm" className="gap-2 text-[#6B7280]">
                    <Download className="w-4 h-4" />
                    PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

interface PaymentMethodProps {
  card: {
    brand: string;
    last4: string;
    expiry: string;
  };
  onUpdate?: () => void;
}

export function PaymentMethod({ card, onUpdate }: PaymentMethodProps) {
  return (
    <Card className="p-5 border-[#E5E9EE]">
      <h4 className="text-sm font-semibold text-[#0F1923] mb-4">Payment Method</h4>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-8 rounded-lg bg-gradient-to-r from-[#1A1F71] to-[#2B5BB9] flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#0F1923]">
              {card.brand} ending in {card.last4}
            </p>
            <p className="text-xs text-[#9CA3AF]">Expires {card.expiry}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onUpdate}>
          Update
        </Button>
      </div>
    </Card>
  );
}
