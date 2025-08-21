"use client";

import {useMemo, useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calculator, Check, DollarSign} from "lucide-react";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {Slider} from "@/components/ui/slider";

interface PricingTier {
    name: string;
    daily: number;
    monthly: number;
    monthlyPrice?: number;
    perRequest?: number;
}

const FIXED_TIERS: PricingTier[] = [
    {name: "Starter", daily: 1_000, monthly: 30_000, monthlyPrice: 49, perRequest: 49 / 30_000},
    {name: "Basic", daily: 3_000, monthly: 90_000, monthlyPrice: 99, perRequest: 99 / 90_000},
    {name: "Growth", daily: 5_000, monthly: 150_000, monthlyPrice: 149, perRequest: 149 / 150_000},
    {name: "Pro", daily: 10_000, monthly: 300_000, monthlyPrice: 249, perRequest: 249 / 300_000},
    {name: "Scale", daily: 25_000, monthly: 750_000, monthlyPrice: 499, perRequest: 499 / 750_000},
    {name: "Business", daily: 50_000, monthly: 1_500_000, monthlyPrice: 899, perRequest: 899 / 1_500_000},
    {name: "Enterprise", daily: 100_000, monthly: 3_000_000, monthlyPrice: 1499, perRequest: 1499 / 3_000_000},
    {name: "Custom", daily: 200_000, monthly: 6_000_000}, // Contact Us
];

const DAYS_PER_MONTH = 30;
const MIN_MONTHLY_PRICE = 49;
const CONTACT_US_THRESHOLD = 10_000_000; // >10M/mo → Contact Us

// Decreasing per-request rates by volume
const PRICING_RULES = [
    {maxMonthly: 100_000, rate: 0.0016},
    {maxMonthly: 1_000_000, rate: 0.0010},
    {maxMonthly: 10_000_000, rate: 0.0006},
] as const;

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
const roundToStep = (value: number, step: number) => Math.ceil(value / step) * step;
const formatInt = (n: number) => n.toLocaleString();

function calcDynamicMonthlyPrice(monthlyReqs: number): number | undefined {
    if (monthlyReqs > CONTACT_US_THRESHOLD) return undefined; // Contact Us
    const rule = PRICING_RULES.find(r => monthlyReqs <= r.maxMonthly);
    if (!rule) return undefined;
    const price = Math.max(MIN_MONTHLY_PRICE, monthlyReqs * rule.rate);
    return price;
}

function calcAnnual(amountPerMonth: number) {
    return amountPerMonth * 12 * 0.85; // 15% off
}

function findRecommendedFixedTier(monthlyReqs: number): PricingTier | undefined {
    return FIXED_TIERS.find(t => t.monthly >= monthlyReqs);
}

function calcFixedPrice(tier: PricingTier, isAnnual: boolean): number | undefined {
    if (tier.monthlyPrice == null) return undefined;
    return isAnnual ? calcAnnual(tier.monthlyPrice) : tier.monthlyPrice;
}

// Fetch INR/USDT rate
async function fetchUsdtRate() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr");
    const data = await res.json();
    return data.tether.inr; // INR per USDT
  } catch (err) {
    console.error("Failed to fetch USDT rate", err);
    return null;
  }
}


const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const [dailyInput, setDailyInput] = useState<number>(3000);
    const [usdtRate, setUsdtRate] = useState<number | null>(null);

    useEffect(() => {
        fetchUsdtRate().then(setUsdtRate);
    }, []);

    const safeDaily = useMemo(() => {
        const n = Number.isFinite(dailyInput) ? dailyInput : 0;
        return clamp(Math.round(n), 100, 200_000);
    }, [dailyInput]);

    const roundedDaily = useMemo(() => roundToStep(safeDaily, 500), [safeDaily]);
    const monthlyReqs = useMemo(() => roundedDaily * DAYS_PER_MONTH, [roundedDaily]);

    const dynamicMonthlyPrice = useMemo(() => calcDynamicMonthlyPrice(monthlyReqs), [monthlyReqs]);
    const dynamicPrice = useMemo(() => {
        if (dynamicMonthlyPrice == null) return undefined;
        return isAnnual ? calcAnnual(dynamicMonthlyPrice) : dynamicMonthlyPrice;
    }, [dynamicMonthlyPrice, isAnnual]);

    const dynamicPerRequest = useMemo(() => {
        if (!dynamicMonthlyPrice) return undefined;
        return dynamicMonthlyPrice / monthlyReqs;
    }, [dynamicMonthlyPrice, monthlyReqs]);

    const recommendedTier = useMemo(() => findRecommendedFixedTier(monthlyReqs), [monthlyReqs]);
    const recommendedTierPrice = useMemo(() => {
        if (!recommendedTier) return undefined;
        return calcFixedPrice(recommendedTier, isAnnual);
    }, [recommendedTier, isAnnual]);

    const inrToUsdt = (inr: number | undefined) => {
        if (!inr || !usdtRate) return null;
        return (inr / usdtRate).toFixed(2);
    };

    return (
        <section className="py-10 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <Badge variant="outline" className="mb-3 inline-flex items-center px-2 py-1">
                        <DollarSign className="w-4 h-4 mr-1"/> Pricing
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">API Pricing (INR & USDT)</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                        Flexible pricing — shown in INR with live USDT conversion.
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center items-center gap-3 mb-8">
                    <span className={!isAnnual ? "font-semibold" : ""}>Monthly</span>
                    <Switch checked={isAnnual} onCheckedChange={setIsAnnual}/>
                    <span className={isAnnual ? "font-semibold" : ""}>
            Annual <span className="text-green-600">(Save 15%)</span>
          </span>
                </div>

                {/* Custom Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    <Card className="border shadow-md ring-2 ring-blue-300">
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Custom Plan</Badge>
                                <Calculator className="w-4 h-4 text-muted"/>
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                {dynamicPrice != null ? (
                                    <>
                                        ₹{dynamicPrice.toFixed(0)}{" "}
                                        {inrToUsdt(dynamicPrice) && (
                                            <span className="text-sm text-muted-foreground">
                                                (≈ {inrToUsdt(dynamicPrice)} USDT)
                                            </span>
                                        )}
                                    </>
                                ) : "Contact Us"}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {dynamicPrice != null ? `per ${isAnnual ? "year" : "month"}` : "Custom enterprise pricing"}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium">Daily Requests</label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="number"
                                        value={safeDaily}
                                        min={100}
                                        max={200_000}
                                        step={100}
                                        onChange={(e) => setDailyInput(Number(e.target.value))}
                                    />
                                    <span className="text-xs text-muted-foreground">(rounded to nearest 500)</span>
                                </div>
                                <Slider
                                    value={[safeDaily]}
                                    min={100}
                                    max={200_000}
                                    step={100}
                                    onValueChange={(v) => setDailyInput(v[0])}
                                />

                                <ul className="mt-4 space-y-2 text-sm">
                                    <li><strong>{formatInt(roundedDaily)}</strong> requests / day</li>
                                    <li><strong>{formatInt(monthlyReqs)}</strong> requests / month</li>
                                    {isAnnual && (
                                        <li><strong>{formatInt(monthlyReqs * 12)}</strong> requests / year</li>
                                    )}
                                    {dynamicPerRequest != null && (
                                        <li>₹{dynamicPerRequest.toFixed(5)} per request</li>
                                    )}
                                    <li className="flex items-center"><Check
                                        className="w-4 h-4 text-green-500 mr-1"/> All major platforms
                                    </li>
                                    {monthlyReqs >= 150_000 && (
                                        <li className="flex items-center"><Check
                                            className="w-4 h-4 text-green-500 mr-1"/> Priority Support</li>
                                    )}
                                    {monthlyReqs >= 750_000 && (
                                        <li className="flex items-center"><Check
                                            className="w-4 h-4 text-green-500 mr-1"/> 99.9% SLA</li>
                                    )}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recommended Plan */}
                    <Card className="border shadow-md ring-2 ring-green-300">
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">Recommended
                                    Plan</Badge>
                                <Calculator className="w-4 h-4 text-muted"/>
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                {recommendedTierPrice != null ? (
                                    <>
                                        ₹{recommendedTierPrice.toFixed(0)}{" "}
                                        {inrToUsdt(recommendedTierPrice) && (
                                            <span className="text-sm text-muted-foreground">
                                                (≈ {inrToUsdt(recommendedTierPrice)} USDT)
                                            </span>
                                        )}
                                    </>
                                ) : "Contact Us"}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {recommendedTier ? `${recommendedTier.name} — covers up to ${formatInt(recommendedTier.monthly)} requests / month` : "We will tailor a plan for you"}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li><strong>{formatInt(roundedDaily)}</strong> requests / day (your input)</li>
                                <li>
                                    {recommendedTier ? (
                                        <>
                                            <strong>{formatInt(recommendedTier.daily)}</strong> requests / day included
                                            {recommendedTier.perRequest && (
                                                <span
                                                    className="block text-muted-foreground">Effective: ₹{recommendedTier.perRequest.toFixed(5)} per request</span>
                                            )}
                                        </>
                                    ) : (
                                        <span>Volumes this high require custom terms.</span>
                                    )}
                                </li>
                                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-1"/> All
                                    major platforms
                                </li>
                                {recommendedTier && recommendedTier.monthly >= 150_000 && (
                                    <li className="flex items-center"><Check
                                        className="w-4 h-4 text-green-500 mr-1"/> Priority Support</li>
                                )}
                                {recommendedTier && recommendedTier.monthly >= 750_000 && (
                                    <li className="flex items-center"><Check
                                        className="w-4 h-4 text-green-500 mr-1"/> 99.9% SLA</li>
                                )}

                                {/* Comparison */}
                                {dynamicPrice != null && recommendedTierPrice != null && (
                                    <div className="mt-2 rounded-xl border p-3 bg-muted/30">
                                        <p className="text-xs">
                                            Custom
                                            price: <strong>₹{dynamicPrice.toFixed(0)}</strong>{" "}
                                            {inrToUsdt(dynamicPrice) && (
                                                <span>(≈ {inrToUsdt(dynamicPrice)} USDT)</span>
                                            )} vs {recommendedTier?.name} price: <strong>₹{recommendedTierPrice.toFixed(0)}</strong>{" "}
                                            {inrToUsdt(recommendedTierPrice) && (
                                                <span>(≈ {inrToUsdt(recommendedTierPrice)} USDT)</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Fixed Plans Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {FIXED_TIERS.map((tier, index) => {
                        const badgeStyle = index === 0
                            ? "bg-green-100 text-green-800"
                            : index === 1
                                ? "bg-yellow-100 text-yellow-800"
                                : index === 2
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800";

                        const ringStyle = index === 0
                            ? "ring-green-300"
                            : index === 1
                                ? "ring-yellow-300"
                                : index === 2
                                    ? "ring-blue-300"
                                    : "ring-gray-200";

                        const price = calcFixedPrice(tier, isAnnual);
                        const mostPopularIndex = 3; // Pro

                        return (
                            <Card key={tier.name}
                                  className={`border shadow-sm transition-all ring-2 ${ringStyle} relative`}>
                                {index === mostPopularIndex && (
                                    <span
                                        className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                                )}

                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant="secondary" className={badgeStyle}>{tier.name}</Badge>
                                        <Calculator className="w-4 h-4 text-muted"/>
                                    </div>
                                    <CardTitle className="text-2xl font-bold">
                                        {price != null ? (
                                            <>
                                                ₹{price.toFixed(0)}{" "}
                                                {inrToUsdt(price) && (
                                                    <span className="text-sm text-muted-foreground">
                                                        (≈ {inrToUsdt(price)} USDT)
                                                    </span>
                                                )}
                                            </>
                                        ) : "Contact Us"}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {price != null ? `per ${isAnnual ? "year" : "month"}` : "Custom pricing"}
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li><strong>{formatInt(tier.daily)}</strong> requests / day</li>
                                        <li><strong>{formatInt(tier.monthly)}</strong> requests / month</li>
                                        {isAnnual && price != null && (
                                            <li><strong>{formatInt(tier.monthly * 12)}</strong> requests / year</li>
                                        )}
                                        {tier.perRequest != null && (
                                            <li>₹{tier.perRequest.toFixed(5)} per request</li>
                                        )}
                                        <li className="flex items-center"><Check
                                            className="w-4 h-4 text-green-500 mr-1"/> All major platforms
                                        </li>
                                        {index >= 2 && (
                                            <li className="flex items-center"><Check
                                                className="w-4 h-4 text-green-500 mr-1"/> Priority Support</li>
                                        )}
                                        {index >= 4 && (
                                            <li className="flex items-center"><Check
                                                className="w-4 h-4 text-green-500 mr-1"/> 99.9% SLA</li>
                                        )}
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

export default PricingSection;
