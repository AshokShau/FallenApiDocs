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
  {
    daily: 1000,
    monthly: 30000,
    monthlyPrice: 43.42,
    perRequest: 0.00145,
  },
  {
    daily: 2000,
    monthly: 60000,
    monthlyPrice: 69.47,
    perRequest: 0.00116,
  },
  {
    daily: 5000,
    monthly: 150000,
    monthlyPrice: 101.86,
    perRequest: 0.00068,
  },
  {
    daily: 10000,
    monthly: 300000,
    monthlyPrice: 175.34,
    perRequest: 0.00058,
  },
  {
    daily: 15000,
    monthly: 450000,
    monthlyPrice: 219.17,
    perRequest: 0.00049,
  },
  {
    daily: 20000,
    monthly: 600000,
    monthlyPrice: 263.00,
    perRequest: 0.00044,
  },
  {
    daily: 25000,
    monthly: 750000,
    monthlyPrice: 313.88,
    perRequest: 0.00042,
  },
  {
    daily: 30000,
    monthly: 900000,
    monthlyPrice: 364.85,
    perRequest: 0.00041,
  },
  {
    daily: 50000,
    monthly: 1500000,
    monthlyPrice: 657.07,
    perRequest: 0.00044,
  },
  {
    daily: 100000,
    monthly: 3000000,
    monthlyPrice: 1314.13,
    perRequest: 0.00044,
  },
  {
    daily: 150000,
    monthly: 4500000,
    monthlyPrice: 1752.59,
    perRequest: 0.00039,
  },
];

const getTierBadgeColor = (tierIndex: number): string => {
  if (tierIndex === 0) return "bg-api-success/10 text-api-success";
  if (tierIndex === 1) return "bg-api-warning/10 text-api-warning";
  if (tierIndex === 2) return "bg-api-info/10 text-api-info";
  return "bg-primary/10 text-primary";
};

const formatMonthly = (monthly: number): string => {
  if (monthly >= 1000000) {
    return `${(monthly / 1000000).toFixed(1)}M`;
  }
  if (monthly >= 1000) {
    return `${(monthly / 1000).toFixed(0)}K`;
  }
  return monthly.toString();
};

export const PricingSection = () => {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">
            <DollarSign className="w-3 h-3 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">API Pricing (INR)</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple and transparent pricing for all your API needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`border-2 transition-all duration-300 ${
                index === 0 ? 'border-api-success hover:border-api-success/80' :
                index === 1 ? 'border-api-warning hover:border-api-warning/80' :
                index === 2 ? 'border-api-info hover:border-api-info/80' :
                'border-primary hover:border-primary/80'
              }`}
            >
              <CardHeader className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className={getTierBadgeColor(index)}>
                    Tier {index + 1}
                  </Badge>
                  <Calculator className="w-4 h-4" style={{ color: getTierBadgeColor(index).split(' ')[1] }} />
                </div>
                <CardTitle className="text-2xl font-bold">
                  ₹{tier.monthlyPrice}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  per month
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily Requests</span>
                    <span className="font-medium">{tier.daily.toLocaleString()} / day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Total</span>
                    <span className="font-medium">~{formatMonthly(tier.monthly)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Per Request Cost</span>
                    <span className="font-medium">₹{tier.perRequest.toFixed(5)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Savings</span>
                    <Badge 
                      variant="outline" 
                      className={`text-sm ${
                        tier.perRequest < 0.0005 ? 'bg-green-50 text-green-700' :
                        tier.perRequest < 0.001 ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}
                    >
                      {(tier.monthly * tier.perRequest).toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
