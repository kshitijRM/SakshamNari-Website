import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Sparkles } from "lucide-react";

type Scheme = {
  name: string;
  category: string;
  support: string;
  tags: string[];
  minIncome?: number;
  minBusinessYears?: number;
};

const schemes: Scheme[] = [
  {
    name: "Startup India Seed Fund Scheme",
    category: "Startup India schemes",
    support: "Early-stage funding support and incubation pathways for innovative startups.",
    tags: ["startup", "innovation", "seed", "startup india"],
    minBusinessYears: 0,
  },
  {
    name: "PM Mudra Loan (Shishu/Kishor/Tarun)",
    category: "Mudra loans",
    support: "Collateral-light loans for small and micro enterprises.",
    tags: ["mudra", "microloan", "small business", "women entrepreneur loans"],
    minBusinessYears: 0,
  },
  {
    name: "Stand-Up India",
    category: "Women entrepreneur loans",
    support: "Bank loans for women-led greenfield enterprises in services, manufacturing, and trading.",
    tags: ["women", "loan", "entrepreneur", "stand-up india"],
    minBusinessYears: 0,
  },
  {
    name: "Mahila Udyam Nidhi",
    category: "Women entrepreneur loans",
    support: "Financial support for expansion, modernization, and project setup by women entrepreneurs.",
    tags: ["women", "expansion", "project"],
    minBusinessYears: 1,
  },
  {
    name: "PMKVY Skill Development",
    category: "Skill development programs",
    support: "Free skill certification and training support for employability and enterprise readiness.",
    tags: ["skill", "training", "development", "certificate"],
  },
  {
    name: "Skill India Digital Entrepreneurship Track",
    category: "Skill development programs",
    support: "Digital marketing, online sales, and bookkeeping skill modules for women-led businesses.",
    tags: ["digital", "skills", "entrepreneurship"],
  },
];

const GovernmentSchemeFinder = () => {
  const [query, setQuery] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("25000");
  const [businessType, setBusinessType] = useState("retail");
  const [businessYears, setBusinessYears] = useState("1");
  const [goal, setGoal] = useState("loan");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return schemes;

    return schemes.filter((scheme) => {
      const haystack = `${scheme.name} ${scheme.category} ${scheme.support} ${scheme.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const recommendations = useMemo(() => {
    const income = Number(monthlyIncome) || 0;
    const years = Number(businessYears) || 0;

    const scored = schemes.map((scheme) => {
      let score = 0;

      if (goal === "loan" && /loan|mudra|stand-up|udyam/i.test(scheme.name + scheme.category)) score += 3;
      if (goal === "startup" && /startup|seed/i.test(scheme.name + scheme.category)) score += 3;
      if (goal === "skills" && /skill/i.test(scheme.name + scheme.category)) score += 3;

      if (businessType === "digital" && /digital|startup/i.test(scheme.support + scheme.name)) score += 2;
      if (businessType === "manufacturing" && /manufacturing|project/i.test(scheme.support)) score += 2;
      if (businessType === "services" && /services|enterprise/i.test(scheme.support)) score += 2;

      if (scheme.minBusinessYears !== undefined && years >= scheme.minBusinessYears) score += 1;
      if (income >= 15000) score += 1;

      return { scheme, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.scheme);
  }, [monthlyIncome, businessType, businessYears, goal]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Government Scheme Finder</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Discover Government Programs for Women Entrepreneurs
            </h1>
            <p className="text-muted-foreground text-lg">
              Many women are unaware of government programs. Use search and AI recommendations to find the right schemes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" /> Search Tool for Schemes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: Startup India, Mudra, skill development..."
              />

              <div className="space-y-3">
                {searchResults.map((scheme) => (
                  <div key={scheme.name} className="rounded-lg border border-border p-4">
                    <p className="font-medium text-foreground">{scheme.name}</p>
                    <p className="text-xs text-primary mb-1">{scheme.category}</p>
                    <p className="text-sm text-muted-foreground">{scheme.support}</p>
                  </div>
                ))}
                {searchResults.length === 0 && (
                  <p className="text-sm text-muted-foreground">No matching schemes found for this search.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" /> AI Recommendation Based on Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Monthly income</label>
                  <Input
                    inputMode="numeric"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value.replace(/[^\d]/g, ""))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Years in business</label>
                  <Input
                    inputMode="numeric"
                    value={businessYears}
                    onChange={(e) => setBusinessYears(e.target.value.replace(/[^\d]/g, ""))}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Business type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="retail">Retail</option>
                    <option value="services">Services</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="digital">Digital/Online</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Primary goal</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="loan">Women entrepreneur loans</option>
                    <option value="startup">Startup India schemes</option>
                    <option value="skills">Skill development programs</option>
                  </select>
                </div>
              </div>

              <Button variant="hero" onClick={() => setShowRecommendations(true)}>
                Get Recommendations
              </Button>

              {showRecommendations && (
                <div className="space-y-3">
                  {recommendations.map((scheme) => (
                    <div key={scheme.name} className="rounded-lg border border-border p-4 bg-card/50">
                      <p className="font-medium text-foreground">{scheme.name}</p>
                      <p className="text-xs text-primary mb-1">{scheme.category}</p>
                      <p className="text-sm text-muted-foreground">{scheme.support}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GovernmentSchemeFinder;
