import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calculator } from "lucide-react";

interface PricingTier {
  daily: number;
  monthly: number;
  monthlyPrice: number;
  perRequest: number;
}

const pricingTiers: PricingTier[] = [
  { daily: 1000, monthly: 30000, monthlyPrice: 43.42, perRequest: 0.00145 },
  { daily: 2000, monthly: 60000, monthlyPrice: 69.47, perRequest: 0.00116 },
  { daily: 5000, monthly: 150000, monthlyPrice: 101.86, perRequest: 0.00068 },
  { daily: 10000, monthly: 300000, monthlyPrice: 175.34, perRequest: 0.00058 },
  { daily: 15000, monthly: 450000, monthlyPrice: 219.17, perRequest: 0.00049 },
  { daily: 20000, monthly: 600000, monthlyPrice: 263.00, perRequest: 0.00044 },
  { daily: 25000, monthly: 750000, monthlyPrice: 313.88, perRequest: 0.00042 },
  { daily: 30000, monthly: 900000, monthlyPrice: 364.85, perRequest: 0.00041 },
  { daily: 50000, monthly: 1500000, monthlyPrice: 657.07, perRequest: 0.00044 },
  { daily: 100000, monthly: 3000000, monthlyPrice: 1314.13, perRequest: 0.00044 },
  { daily: 150000, monthly: 4500000, monthlyPrice: 1752.59, perRequest: 0.00039 },
];

const getTierStyle = (index: number) => {
  if (index === 0) return { badge: "bg-green-100 text-green-800", ring: "ring-green-300" };
  if (index === 1) return { badge: "bg-yellow-100 text-yellow-800", ring: "ring-yellow-300" };
  if (index === 2) return { badge: "bg-blue-100 text-blue-800", ring: "ring-blue-300" };
  return { badge: "bg-gray-100 text-gray-800", ring: "ring-gray-200" };
};

const formatMonthly = (monthly: number): string => {
  if (monthly >= 1_000_000) return `${(monthly / 1_000_000).toFixed(1)}M`;
  if (monthly >= 1_000) return `${(monthly / 1_000).toFixed(0)}K`;
  return monthly.toString();
};

export const PricingSection = () => {
  return (
    <section className="py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 inline-flex items-center px-2 py-1">
            <DollarSign className="w-4 h-4 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">API Pricing (INR)</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Transparent and affordable pricing for your API needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => {
            const { badge, ring } = getTierStyle(index);
            return (
              <Card key={index} className={`border border-muted shadow-sm transition-all ring-2 ${ring}`}>
                <CardHeader className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className={badge}>
                      Tier {index + 1}
                    </Badge>
                    <Calculator className="w-4 h-4 text-muted" />
                  </div>
                  <CardTitle className="text-2xl font-semibold">
                    ₹{tier.monthlyPrice.toFixed(2)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">per month</p>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Daily Requests</span>
                    <span className="font-medium">{tier.daily.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly Total</span>
                    <span className="font-medium">~{formatMonthly(tier.monthly)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Per Request Cost</span>
                    <span className="font-medium">₹{tier.perRequest.toFixed(5)}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
