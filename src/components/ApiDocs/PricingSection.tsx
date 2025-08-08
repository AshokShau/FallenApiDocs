"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calculator, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PricingTier {
  name: string;
  daily: number;
  monthly: number;
  monthlyPrice?: number; // undefined for "Contact Us"
  perRequest?: number;   // undefined for "Contact Us"
}

const pricingTiers: PricingTier[] = [
  { name: "Starter", daily: 1000, monthly: 30000, monthlyPrice: 49, perRequest: 49 / 30000 },
  { name: "Basic", daily: 3000, monthly: 90000, monthlyPrice: 99, perRequest: 99 / 90000 },
  { name: "Growth", daily: 5000, monthly: 150000, monthlyPrice: 149, perRequest: 149 / 150000 },
  { name: "Pro", daily: 10000, monthly: 300000, monthlyPrice: 249, perRequest: 249 / 300000 },
  { name: "Scale", daily: 25000, monthly: 750000, monthlyPrice: 499, perRequest: 499 / 750000 },
  { name: "Business", daily: 50000, monthly: 1500000, monthlyPrice: 899, perRequest: 899 / 1500000 },
  { name: "Enterprise", daily: 100000, monthly: 3000000, monthlyPrice: 1499, perRequest: 1499 / 3000000 },
  { name: "Custom", daily: 200000, monthly: 6000000 }, // Contact Us
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
  const [isAnnual, setIsAnnual] = useState(false);
  const mostPopularIndex = 3; // Pro

  return (
    <section className="py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 inline-flex items-center px-2 py-1">
            <DollarSign className="w-4 h-4 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">API Pricing (INR)</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            The more you grow, the less you pay per request.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <span className={!isAnnual ? "font-semibold" : ""}>Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={isAnnual ? "font-semibold" : ""}>
            Annual <span className="text-green-600">(Save 15%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => {
            const { badge, ring } = getTierStyle(index);
            const price = tier.monthlyPrice
              ? isAnnual
                ? tier.monthlyPrice * 12 * 0.85
                : tier.monthlyPrice
              : undefined;

            return (
              <Card key={index} className={`border shadow-sm transition-all ring-2 ${ring} relative`}>
                {index === mostPopularIndex && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className={badge}>
                      {tier.name}
                    </Badge>
                    <Calculator className="w-4 h-4 text-muted" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {price ? `₹${price.toFixed(0)}` : "Contact Us"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {price ? `per ${isAnnual ? "year" : "month"}` : "Custom pricing"}
                  </p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li><strong>{tier.daily.toLocaleString()}</strong> daily requests</li>
                    <li><strong>~{formatMonthly(tier.monthly)}</strong> monthly total</li>
                    {tier.perRequest && (
                      <li>₹{tier.perRequest.toFixed(5)} per request</li>
                    )}
                    <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-1" /> All major platforms</li>
                    {index >= 2 && <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-1" /> Priority Support</li>}
                    {index >= 4 && <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-1" /> 99.9% SLA</li>}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
