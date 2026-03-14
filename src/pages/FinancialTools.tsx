import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? Math.max(0, value) : 0);

const FinancialTools = () => {
  const [monthlySaving, setMonthlySaving] = useState("5000");
  const [savingsRate, setSavingsRate] = useState("8");
  const [savingsYears, setSavingsYears] = useState("5");

  const [loanPrincipal, setLoanPrincipal] = useState("300000");
  const [loanRate, setLoanRate] = useState("12");
  const [loanMonths, setLoanMonths] = useState("36");

  const [monthlyRevenue, setMonthlyRevenue] = useState("80000");
  const [monthlyCost, setMonthlyCost] = useState("50000");

  const [budgetIncome, setBudgetIncome] = useState("60000");
  const [opsPct, setOpsPct] = useState("40");
  const [salaryPct, setSalaryPct] = useState("25");
  const [marketingPct, setMarketingPct] = useState("15");
  const [emergencyPct, setEmergencyPct] = useState("20");

  const savingsFutureValue = useMemo(() => {
    const p = Number(monthlySaving) || 0;
    const annualRate = Number(savingsRate) || 0;
    const years = Number(savingsYears) || 0;
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    if (months <= 0) return 0;
    if (monthlyRate === 0) return p * months;

    return p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }, [monthlySaving, savingsRate, savingsYears]);

  const emi = useMemo(() => {
    const principal = Number(loanPrincipal) || 0;
    const annualRate = Number(loanRate) || 0;
    const months = Number(loanMonths) || 0;
    const monthlyRate = annualRate / 12 / 100;

    if (principal <= 0 || months <= 0) return 0;
    if (monthlyRate === 0) return principal / months;

    const factor = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * factor) / (factor - 1);
  }, [loanPrincipal, loanRate, loanMonths]);

  const totalRepayment = useMemo(() => emi * (Number(loanMonths) || 0), [emi, loanMonths]);

  const monthlyProfit = useMemo(() => {
    const revenue = Number(monthlyRevenue) || 0;
    const cost = Number(monthlyCost) || 0;
    return revenue - cost;
  }, [monthlyRevenue, monthlyCost]);

  const budgetPlan = useMemo(() => {
    const income = Number(budgetIncome) || 0;
    const o = Number(opsPct) || 0;
    const s = Number(salaryPct) || 0;
    const m = Number(marketingPct) || 0;
    const e = Number(emergencyPct) || 0;
    const totalPct = o + s + m + e;

    return {
      operations: (income * o) / 100,
      salaries: (income * s) / 100,
      marketing: (income * m) / 100,
      emergency: (income * e) / 100,
      totalPct,
    };
  }, [budgetIncome, opsPct, salaryPct, marketingPct, emergencyPct]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Financial Tools Page</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Simple Financial Planning Tools</h1>
            <p className="text-muted-foreground text-lg">
              Purpose: Provide simple tools for financial planning.
            </p>
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link to="/micro-investments">Open Micro-Investment Platform</Link>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Savings Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Monthly savings</label>
                    <Input value={monthlySaving} onChange={(e) => setMonthlySaving(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Annual interest %</label>
                    <Input value={savingsRate} onChange={(e) => setSavingsRate(e.target.value.replace(/[^\d.]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Years</label>
                    <Input value={savingsYears} onChange={(e) => setSavingsYears(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated maturity amount: <span className="font-semibold text-foreground">{formatINR(savingsFutureValue)}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Loan EMI Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Loan amount</label>
                    <Input value={loanPrincipal} onChange={(e) => setLoanPrincipal(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Annual interest %</label>
                    <Input value={loanRate} onChange={(e) => setLoanRate(e.target.value.replace(/[^\d.]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Tenure (months)</label>
                    <Input value={loanMonths} onChange={(e) => setLoanMonths(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monthly EMI: <span className="font-semibold text-foreground">{formatINR(emi)}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Total repayment: <span className="font-semibold text-foreground">{formatINR(totalRepayment)}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Profit Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Monthly revenue</label>
                    <Input value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Monthly costs</label>
                    <Input value={monthlyCost} onChange={(e) => setMonthlyCost(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated monthly profit: <span className="font-semibold text-foreground">{formatINR(monthlyProfit)}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Business Budget Planner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Monthly business income</label>
                  <Input value={budgetIncome} onChange={(e) => setBudgetIncome(e.target.value.replace(/[^\d]/g, ""))} />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Operations %</label>
                    <Input value={opsPct} onChange={(e) => setOpsPct(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Salaries %</label>
                    <Input value={salaryPct} onChange={(e) => setSalaryPct(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Marketing %</label>
                    <Input value={marketingPct} onChange={(e) => setMarketingPct(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Emergency fund %</label>
                    <Input value={emergencyPct} onChange={(e) => setEmergencyPct(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4 space-y-1">
                  <p className="text-sm text-muted-foreground">Operations: <span className="font-medium text-foreground">{formatINR(budgetPlan.operations)}</span></p>
                  <p className="text-sm text-muted-foreground">Salaries: <span className="font-medium text-foreground">{formatINR(budgetPlan.salaries)}</span></p>
                  <p className="text-sm text-muted-foreground">Marketing: <span className="font-medium text-foreground">{formatINR(budgetPlan.marketing)}</span></p>
                  <p className="text-sm text-muted-foreground">Emergency Fund: <span className="font-medium text-foreground">{formatINR(budgetPlan.emergency)}</span></p>
                  <p className={`text-sm ${budgetPlan.totalPct === 100 ? "text-success" : "text-destructive"}`}>
                    Total allocation: {budgetPlan.totalPct}% {budgetPlan.totalPct === 100 ? "(Balanced)" : "(Adjust to 100%)"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FinancialTools;
