import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PiggyBank, Target, Repeat } from "lucide-react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));

const suggestionPlans = [
  { amount: 100, label: "Daily micro-save", purpose: "Build habit with low risk" },
  { amount: 500, label: "Weekly starter investment", purpose: "Grow disciplined savings" },
  { amount: 1500, label: "Monthly growth plan", purpose: "Balanced savings and returns" },
];

const MicroInvestment = () => {
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [months, setMonths] = useState("24");

  const [goalName, setGoalName] = useState("Emergency Fund");
  const [goalAmount, setGoalAmount] = useState("50000");
  const [currentSavings, setCurrentSavings] = useState("10000");

  const [rdAmount, setRdAmount] = useState("2000");
  const [rdMonths, setRdMonths] = useState("12");
  const [rdRate, setRdRate] = useState("6.5");
  const [rdEnabled, setRdEnabled] = useState(true);

  const futureValue = useMemo(() => {
    const p = Number(monthlyContribution) || 0;
    const m = Number(months) || 0;
    const r = (Number(annualReturn) || 0) / 12 / 100;

    if (m <= 0) return 0;
    if (r === 0) return p * m;
    return p * ((Math.pow(1 + r, m) - 1) / r);
  }, [monthlyContribution, months, annualReturn]);

  const goalProgress = useMemo(() => {
    const target = Number(goalAmount) || 0;
    const saved = Number(currentSavings) || 0;
    const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;
    const remaining = Math.max(0, target - saved);
    return { progress, remaining };
  }, [goalAmount, currentSavings]);

  const rdMaturity = useMemo(() => {
    const p = Number(rdAmount) || 0;
    const n = Number(rdMonths) || 0;
    const r = (Number(rdRate) || 0) / 400;

    if (!rdEnabled || n <= 0) return 0;
    return p * n + (p * n * (n + 1) * r) / 2;
  }, [rdAmount, rdMonths, rdRate, rdEnabled]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mb-10"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Micro-Investment Platform</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Start Investing with Small Amounts</h1>
            <p className="text-muted-foreground text-lg">
              Encourage women to begin investing with manageable contributions and simple digital tools.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" /> Small Investment Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestionPlans.map((plan) => (
                  <div key={plan.label} className="rounded-lg border border-border p-4">
                    <p className="font-medium text-foreground">{plan.label}</p>
                    <p className="text-sm text-muted-foreground">{formatINR(plan.amount)} contribution</p>
                    <p className="text-xs text-muted-foreground mt-1">{plan.purpose}</p>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Monthly amount</label>
                    <Input value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Annual return %</label>
                    <Input value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value.replace(/[^\d.]/g, ""))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Months</label>
                  <Input value={months} onChange={(e) => setMonths(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated value: <span className="font-semibold text-foreground">{formatINR(futureValue)}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-secondary" /> Savings Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Goal name</label>
                  <Input value={goalName} onChange={(e) => setGoalName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Goal amount</label>
                  <Input value={goalAmount} onChange={(e) => setGoalAmount(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Current savings</label>
                  <Input value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <p className="text-sm text-foreground font-medium">{goalName}</p>
                  <p className="text-sm text-muted-foreground">Progress: {goalProgress.progress.toFixed(1)}%</p>
                  <div className="h-2 rounded bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${goalProgress.progress}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Remaining amount: <span className="font-semibold text-foreground">{formatINR(goalProgress.remaining)}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Repeat className="h-5 w-5 text-accent" /> Digital Recurring Deposits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm text-foreground">Enable recurring deposit</span>
                  <Button type="button" variant={rdEnabled ? "hero" : "outline"} size="sm" onClick={() => setRdEnabled((v) => !v)}>
                    {rdEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Monthly RD amount</label>
                  <Input value={rdAmount} onChange={(e) => setRdAmount(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Tenure (months)</label>
                  <Input value={rdMonths} onChange={(e) => setRdMonths(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Annual interest %</label>
                  <Input value={rdRate} onChange={(e) => setRdRate(e.target.value.replace(/[^\d.]/g, ""))} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated RD maturity: <span className="font-semibold text-foreground">{formatINR(rdMaturity)}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MicroInvestment;
