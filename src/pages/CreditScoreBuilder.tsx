import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSquare2, ReceiptText, Gauge } from "lucide-react";

type TransactionType = "income" | "expense" | "repayment";

type TrackedTransaction = {
  id: number;
  type: TransactionType;
  amount: number;
  note: string;
  date: string;
};

const CreditScoreBuilder = () => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [businessType, setBusinessType] = useState("retail");
  const [monthlyIncome, setMonthlyIncome] = useState("25000");
  const [savingsAmount, setSavingsAmount] = useState("3000");

  const [txnType, setTxnType] = useState<TransactionType>("income");
  const [txnAmount, setTxnAmount] = useState("1000");
  const [txnNote, setTxnNote] = useState("");
  const [transactions, setTransactions] = useState<TrackedTransaction[]>([]);

  const addTransaction = () => {
    const amount = Number(txnAmount) || 0;
    if (amount <= 0) return;

    const item: TrackedTransaction = {
      id: Date.now(),
      type: txnType,
      amount,
      note: txnNote.trim() || "No note",
      date: new Date().toLocaleDateString("en-IN"),
    };

    setTransactions((prev) => [item, ...prev]);
    setTxnAmount("1000");
    setTxnNote("");
  };

  const creditScore = useMemo(() => {
    const income = Number(monthlyIncome) || 0;
    const savings = Number(savingsAmount) || 0;

    const incomeTxns = transactions.filter((t) => t.type === "income").length;
    const repaymentTxns = transactions.filter((t) => t.type === "repayment").length;
    const expenseTxns = transactions.filter((t) => t.type === "expense").length;

    let score = 300;

    score += Math.min(120, income / 500);
    score += Math.min(100, savings / 100);
    score += Math.min(130, incomeTxns * 8);
    score += Math.min(170, repaymentTxns * 15);
    score -= Math.min(80, expenseTxns * 4);

    score = Math.max(300, Math.min(900, Math.round(score)));

    let rating = "Building";
    if (score >= 750) rating = "Strong";
    else if (score >= 650) rating = "Good";
    else if (score >= 550) rating = "Improving";

    return { score, rating };
  }, [monthlyIncome, savingsAmount, transactions]);

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
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Credit Score Builder</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Build Formal Credit History with Simple Digital Steps
            </h1>
            <p className="text-muted-foreground text-lg">
              Many women lack formal credit history. Create a digital credit profile, track transactions,
              and monitor a micro-credit scoring system.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <UserSquare2 className="h-5 w-5 text-primary" /> Digital Credit Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Full name</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Mobile number</label>
                  <Input value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^\d]/g, "").slice(0, 10))} placeholder="10-digit number" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Business type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="retail">Retail</option>
                    <option value="services">Services</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Monthly income</label>
                  <Input value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Monthly savings</label>
                  <Input value={savingsAmount} onChange={(e) => setSavingsAmount(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <ReceiptText className="h-5 w-5 text-secondary" /> Transaction Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Type</label>
                    <select
                      value={txnType}
                      onChange={(e) => setTxnType(e.target.value as TransactionType)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                      <option value="repayment">Loan repayment</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Amount</label>
                    <Input value={txnAmount} onChange={(e) => setTxnAmount(e.target.value.replace(/[^\d]/g, ""))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Note</label>
                  <Input value={txnNote} onChange={(e) => setTxnNote(e.target.value)} placeholder="Optional detail" />
                </div>
                <Button variant="hero" onClick={addTransaction}>Add Transaction</Button>

                <div className="max-h-48 overflow-auto space-y-2">
                  {transactions.map((txn) => (
                    <div key={txn.id} className="rounded-lg border border-border p-3">
                      <p className="text-sm font-medium text-foreground">{txn.type} | Rs. {txn.amount.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-muted-foreground">{txn.note} | {txn.date}</p>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <p className="text-sm text-muted-foreground">No transactions yet. Add your first record.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-accent" /> Micro-Credit Scoring System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border p-4 bg-card/50">
                  <p className="text-sm text-muted-foreground">Current score</p>
                  <p className="text-3xl font-bold text-foreground">{creditScore.score}</p>
                  <p className="text-sm text-primary font-medium">Rating: {creditScore.rating}</p>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Improve score by:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Logging regular income transactions</li>
                    <li>Recording monthly loan repayments on time</li>
                    <li>Maintaining consistent savings</li>
                    <li>Keeping expense volatility low</li>
                  </ul>
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

export default CreditScoreBuilder;
