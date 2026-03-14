import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, FileText, Landmark, ListChecks } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const partnerBanks = [
  {
    name: "SBI Micro Enterprise Desk",
    type: "Partner Bank",
    loanRange: "Rs. 50,000 - Rs. 5,00,000",
    typicalRate: "10% - 13%",
  },
  {
    name: "Bank of Baroda Women Finance",
    type: "Partner Bank",
    loanRange: "Rs. 75,000 - Rs. 7,00,000",
    typicalRate: "11% - 14%",
  },
  {
    name: "Punjab National Bank MSME Support",
    type: "Partner Bank",
    loanRange: "Rs. 1,00,000 - Rs. 10,00,000",
    typicalRate: "10.5% - 13.5%",
  },
];

const governmentSchemes = [
  {
    name: "PM Mudra Loan",
    category: "Government Scheme",
    support: "Shishu, Kishor, Tarun categories for early to growing businesses",
  },
  {
    name: "Stand-Up India",
    category: "Government Scheme",
    support: "Support for women-led greenfield enterprises",
  },
  {
    name: "Mahila Udyam Nidhi",
    category: "Women Entrepreneurship Scheme",
    support: "Support for expansion and modernization of women-owned units",
  },
];

const applicationSteps = [
  "Identify the right loan category based on business stage and funding need.",
  "Check eligibility and shortlist matching banks/schemes.",
  "Collect required documents and prepare a simple business summary.",
  "Submit application online or at branch with scheme reference.",
  "Track status, respond to verification, and complete disbursal formalities.",
];

const documentChecklist = [
  "Aadhaar and PAN",
  "Address proof",
  "Business registration (if available)",
  "6-month bank statement",
  "Basic cash-flow or income-expense summary",
  "Quotation/invoice for business use of funds",
];

const FundingSupport = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("25000");
  const [businessExpenses, setBusinessExpenses] = useState("12000");
  const [requestedLoan, setRequestedLoan] = useState("200000");
  const [yearsInBusiness, setYearsInBusiness] = useState("1");
  const [hasExistingLoan, setHasExistingLoan] = useState("no");
  const [showResults, setShowResults] = useState(false);

  const eligibility = useMemo(() => {
    const income = Number(monthlyIncome) || 0;
    const expenses = Number(businessExpenses) || 0;
    const requested = Number(requestedLoan) || 0;
    const years = Number(yearsInBusiness) || 0;
    const disposable = Math.max(0, income - expenses);
    const repaymentCapacity = disposable * 12;

    const options: string[] = [];

    if (requested <= 500000 && years >= 0) {
      options.push("PM Mudra Loan (Shishu/Kishor)");
    }

    if (requested > 500000 && years >= 1 && hasExistingLoan === "no") {
      options.push("Stand-Up India");
    }

    if (years >= 1 && disposable >= 7000) {
      options.push("SBI Micro Enterprise Desk");
      options.push("Bank of Baroda Women Finance");
    }

    if (years >= 2 && disposable >= 10000) {
      options.push("Punjab National Bank MSME Support");
      options.push("Mahila Udyam Nidhi");
    }

    const uniqueOptions = Array.from(new Set(options));

    const eligibilityLabel =
      uniqueOptions.length >= 4 ? "High" : uniqueOptions.length >= 2 ? "Medium" : "Basic";

    return {
      disposable,
      repaymentCapacity,
      eligibilityLabel,
      options: uniqueOptions,
    };
  }, [monthlyIncome, businessExpenses, requestedLoan, yearsInBusiness, hasExistingLoan]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-10" id="funding-support">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Loan & Funding Support Page
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Access Formal Financial Institutions with Confidence
            </h1>
            <p className="text-muted-foreground text-lg">
              Purpose: Help women access formal financial institutions through verified options, eligibility guidance,
              and clear application assistance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" /> Microloan Marketplace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-foreground">List of partner banks</h3>
                {partnerBanks.map((bank) => (
                  <div key={bank.name} className="rounded-lg border border-border p-4">
                    <p className="font-medium text-foreground">{bank.name}</p>
                    <p className="text-sm text-muted-foreground">{bank.type}</p>
                    <p className="text-sm text-muted-foreground">Loan range: {bank.loanRange}</p>
                    <p className="text-sm text-muted-foreground">Typical rate: {bank.typicalRate}</p>
                  </div>
                ))}

                <h3 className="font-semibold text-foreground pt-2">Government schemes</h3>
                {governmentSchemes.map((scheme) => (
                  <div key={scheme.name} className="rounded-lg border border-border p-4 bg-card/50">
                    <p className="font-medium text-foreground">{scheme.name}</p>
                    <p className="text-sm text-muted-foreground">{scheme.category}</p>
                    <p className="text-sm text-muted-foreground">{scheme.support}</p>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link to="/government-schemes">Open Government Scheme Finder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-secondary" /> Loan Eligibility Checker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Simple questionnaire</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Monthly income</label>
                    <Input
                      inputMode="numeric"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value.replace(/[^\d]/g, ""))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Business expenses</label>
                    <Input
                      inputMode="numeric"
                      value={businessExpenses}
                      onChange={(e) => setBusinessExpenses(e.target.value.replace(/[^\d]/g, ""))}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Requested loan amount</label>
                    <Input
                      inputMode="numeric"
                      value={requestedLoan}
                      onChange={(e) => setRequestedLoan(e.target.value.replace(/[^\d]/g, ""))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Years in business</label>
                    <Input
                      inputMode="numeric"
                      value={yearsInBusiness}
                      onChange={(e) => setYearsInBusiness(e.target.value.replace(/[^\d]/g, ""))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Existing business loan?</label>
                  <select
                    value={hasExistingLoan}
                    onChange={(e) => setHasExistingLoan(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <Button variant="hero" onClick={() => setShowResults(true)}>
                  Check Eligibility
                </Button>

                {showResults && (
                  <div className="rounded-lg border border-border p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Eligibility level: <span className="text-foreground font-medium">{eligibility.eligibilityLabel}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Estimated monthly disposable cash flow: Rs. {eligibility.disposable.toLocaleString("en-IN")}</p>
                    <p className="text-sm text-muted-foreground">Estimated annual repayment capacity: Rs. {eligibility.repaymentCapacity.toLocaleString("en-IN")}</p>
                    <p className="text-sm font-medium text-foreground pt-2">Possible loan options:</p>
                    {eligibility.options.length > 0 ? (
                      <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                        {eligibility.options.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No strong match yet. Improve income-expense ratio or start with Mudra Shishu category.</p>
                    )}
                  </div>
                )}

                <Button asChild variant="outline" className="w-full">
                  <Link to="/credit-score-builder">Open Credit Score Builder</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-accent" /> Application Assistance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-foreground">Step-by-step guide to apply</h3>
                <ol className="space-y-3 text-sm text-muted-foreground list-decimal pl-5">
                  {applicationSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Document Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {documentChecklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Subsidy and Government Schemes</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2">Mudra loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Suitable for small businesses and first-time entrepreneurs.</p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Shishu: up to Rs. 50,000</li>
                  <li>Kishor: Rs. 50,000 to Rs. 5,00,000</li>
                  <li>Tarun: Rs. 5,00,000 to Rs. 10,00,000</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2">Women entrepreneurship schemes</h3>
                <p className="text-sm text-muted-foreground mb-2">Focused support for women-led businesses in services, retail, and manufacturing.</p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Stand-Up India</li>
                  <li>Mahila Udyam Nidhi</li>
                  <li>State-level subsidy and credit-linked schemes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FundingSupport;