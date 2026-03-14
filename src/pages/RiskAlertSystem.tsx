import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";

const safeBankingTips = [
  "Never share OTP, UPI PIN, or card CVV with anyone, including callers claiming to be bank staff.",
  "Verify loan offers only through official bank websites or branch offices.",
  "Avoid clicking payment links from unknown numbers in SMS or messaging apps.",
  "Use app lock and screen lock on your phone used for banking apps.",
  "Check transaction SMS alerts daily and report unknown debits immediately.",
  "Use separate UPI IDs for business and personal payments to reduce confusion.",
];

const RiskAlertSystem = () => {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("30");
  const [tenureMonths, setTenureMonths] = useState("24");

  const [sourceUnknownCaller, setSourceUnknownCaller] = useState(false);
  const [asksOtpOrPin, setAsksOtpOrPin] = useState(false);
  const [asksAdvanceFee, setAsksAdvanceFee] = useState(false);
  const [suspiciousLink, setSuspiciousLink] = useState(false);

  const [tipIndex, setTipIndex] = useState(0);

  const loanRisk = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const annualRate = Number(interestRate) || 0;
    const months = Number(tenureMonths) || 0;
    const monthlyRate = annualRate / 12 / 100;

    if (principal <= 0 || months <= 0) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
        riskLevel: "Invalid",
        warning: "Enter valid loan details to assess risk.",
      };
    }

    const emi =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    let riskLevel = "Low";
    let warning = "Interest looks manageable if terms are transparent and from a verified lender.";

    if (annualRate >= 24) {
      riskLevel = "High";
      warning = "This is a high-interest loan. Compare formal bank options before accepting.";
    } else if (annualRate >= 16) {
      riskLevel = "Medium";
      warning = "Interest is moderate to high. Review all charges and prepayment penalties.";
    }

    return {
      emi,
      totalPayment,
      totalInterest,
      riskLevel,
      warning,
    };
  }, [loanAmount, interestRate, tenureMonths]);

  const fraudRisk = useMemo(() => {
    const flags = [sourceUnknownCaller, asksOtpOrPin, asksAdvanceFee, suspiciousLink].filter(Boolean).length;

    if (flags >= 3) {
      return {
        level: "Critical",
        advice: "Likely fraud attempt. Stop all communication and report to your bank immediately.",
      };
    }

    if (flags >= 2) {
      return {
        level: "High",
        advice: "Strong warning signs detected. Do not pay money or share credentials.",
      };
    }

    if (flags === 1) {
      return {
        level: "Medium",
        advice: "One warning sign found. Verify identity through official bank channels.",
      };
    }

    return {
      level: "Low",
      advice: "No immediate warning signs selected, but continue to follow safe banking practices.",
    };
  }, [sourceUnknownCaller, asksOtpOrPin, asksAdvanceFee, suspiciousLink]);

  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? Math.max(0, value) : 0);

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
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Risk Alert System</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Early Warnings for Safer Financial Decisions
            </h1>
            <p className="text-muted-foreground text-lg">
              Get alerts on high-interest loans, detect fraud red flags, and learn practical safe banking tips.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" /> High-Interest Loan Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Loan amount</label>
                  <Input
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value.replace(/[^\d]/g, ""))}
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Annual interest rate %</label>
                  <Input
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value.replace(/[^\d.]/g, ""))}
                    inputMode="decimal"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Tenure in months</label>
                  <Input
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(e.target.value.replace(/[^\d]/g, ""))}
                    inputMode="numeric"
                  />
                </div>

                <div className="rounded-lg border border-border p-4 space-y-1">
                  <p className="text-sm text-muted-foreground">Estimated EMI: <span className="font-semibold text-foreground">{formatINR(loanRisk.emi)}</span></p>
                  <p className="text-sm text-muted-foreground">Total interest: <span className="font-semibold text-foreground">{formatINR(loanRisk.totalInterest)}</span></p>
                  <p className="text-sm text-muted-foreground">Total repayment: <span className="font-semibold text-foreground">{formatINR(loanRisk.totalPayment)}</span></p>
                  <div className="pt-1">
                    <Badge variant={loanRisk.riskLevel === "High" ? "destructive" : "secondary"}>{loanRisk.riskLevel} Risk</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">{loanRisk.warning}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-primary" /> Fraud Detection Warnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" checked={sourceUnknownCaller} onChange={(e) => setSourceUnknownCaller(e.target.checked)} />
                  Loan offer came from unknown caller or random message.
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" checked={asksOtpOrPin} onChange={(e) => setAsksOtpOrPin(e.target.checked)} />
                  They asked for OTP, UPI PIN, card PIN, or CVV.
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" checked={asksAdvanceFee} onChange={(e) => setAsksAdvanceFee(e.target.checked)} />
                  They demanded advance processing fee before approval.
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" checked={suspiciousLink} onChange={(e) => setSuspiciousLink(e.target.checked)} />
                  They sent suspicious payment or KYC update links.
                </label>

                <div className="rounded-lg border border-border p-4 bg-card/50 space-y-1">
                  <p className="text-sm text-muted-foreground">Fraud risk level</p>
                  <p className="font-semibold text-foreground">{fraudRisk.level}</p>
                  <p className="text-xs text-muted-foreground">{fraudRisk.advice}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-secondary" /> Safe Banking Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border p-4 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-1">Tip {tipIndex + 1} of {safeBankingTips.length}</p>
                  <p className="text-sm text-foreground">{safeBankingTips[tipIndex]}</p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setTipIndex((prev) => (prev + 1) % safeBankingTips.length)}
                >
                  Next Safety Tip
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Emergency actions:</p>
                  <p>1. Block account/card from official app if fraud is suspected.</p>
                  <p>2. Contact bank helpline and raise dispute with transaction details.</p>
                  <p>3. File cyber complaint with screenshots and call records.</p>
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

export default RiskAlertSystem;