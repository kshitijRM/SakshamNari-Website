import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartHandshake, HandCoins, LifeBuoy } from "lucide-react";

type Campaign = {
  id: number;
  title: string;
  location: string;
  target: number;
  raised: number;
  supporters: number;
};

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Restore Tailoring Unit After Flood",
    location: "Belagavi",
    target: 120000,
    raised: 48000,
    supporters: 63,
  },
  {
    id: 2,
    title: "Emergency Working Capital for Home Kitchen",
    location: "Mysuru",
    target: 80000,
    raised: 36600,
    supporters: 41,
  },
  {
    id: 3,
    title: "Medical Support for Street Vendor Family",
    location: "Chennai",
    target: 100000,
    raised: 72500,
    supporters: 95,
  },
];

const grantPrograms = [
  {
    name: "Women Emergency Recovery Grant",
    amount: "Up to Rs. 50,000",
    focus: "Business interruption due to illness, fire, or local crisis",
  },
  {
    name: "District Livelihood Relief Grant",
    amount: "Up to Rs. 30,000",
    focus: "Short-term household and enterprise continuity support",
  },
  {
    name: "Rapid Rebuild Micro-Grant",
    amount: "Up to Rs. 75,000",
    focus: "Asset replacement after flood, cyclone, or major damage",
  },
];

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? Math.max(0, value) : 0);

const EmergencySupportNetwork = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignLocation, setCampaignLocation] = useState("");
  const [campaignTarget, setCampaignTarget] = useState("50000");

  const [selectedCampaignId, setSelectedCampaignId] = useState<number>(initialCampaigns[0].id);
  const [contribution, setContribution] = useState("1000");

  const [monthlyIncome, setMonthlyIncome] = useState("22000");
  const [incomeDropPct, setIncomeDropPct] = useState("45");
  const [dependents, setDependents] = useState("2");
  const [disasterImpact, setDisasterImpact] = useState("yes");

  const [reliefLocation, setReliefLocation] = useState("District HQ");
  const [disasterType, setDisasterType] = useState("flood");

  const selectedCampaign = campaigns.find((item) => item.id === selectedCampaignId) ?? campaigns[0];

  const grantAssessment = useMemo(() => {
    const income = Number(monthlyIncome) || 0;
    const drop = Number(incomeDropPct) || 0;
    const familyDependents = Number(dependents) || 0;

    let score = 0;
    if (income <= 25000) score += 2;
    if (drop >= 40) score += 3;
    if (familyDependents >= 2) score += 1;
    if (disasterImpact === "yes") score += 2;

    let level = "Basic";
    if (score >= 6) level = "High";
    else if (score >= 4) level = "Medium";

    const suggested =
      level === "High"
        ? [grantPrograms[0], grantPrograms[2]]
        : level === "Medium"
          ? [grantPrograms[0], grantPrograms[1]]
          : [grantPrograms[1]];

    return { level, suggested };
  }, [monthlyIncome, incomeDropPct, dependents, disasterImpact]);

  const reliefSupport = useMemo(() => {
    const base = [
      `Nearest relief coordination center: ${reliefLocation}`,
      "Documents to carry: ID proof, bank passbook, local residence proof",
      "Support helpline: 1800-120-EMERGENCY",
    ];

    if (disasterType === "flood") {
      return [...base, "Priority support: shelter, food kits, sanitation supplies, business restock vouchers"];
    }
    if (disasterType === "cyclone") {
      return [...base, "Priority support: temporary housing grant, utility restoration aid, emergency cash transfer"];
    }
    if (disasterType === "drought") {
      return [...base, "Priority support: livelihood top-up grants, water support, rural employment linkage"];
    }

    return [...base, "Priority support: medical emergency grants and rapid household assistance"];
  }, [reliefLocation, disasterType]);

  const createCampaign = () => {
    const target = Number(campaignTarget) || 0;
    if (!campaignTitle.trim() || !campaignLocation.trim() || target <= 0) return;

    const next: Campaign = {
      id: Date.now(),
      title: campaignTitle.trim(),
      location: campaignLocation.trim(),
      target,
      raised: 0,
      supporters: 0,
    };

    setCampaigns((prev) => [next, ...prev]);
    setSelectedCampaignId(next.id);
    setCampaignTitle("");
    setCampaignLocation("");
    setCampaignTarget("50000");
  };

  const contributeToCampaign = () => {
    const amount = Number(contribution) || 0;
    if (amount <= 0 || !selectedCampaign) return;

    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === selectedCampaign.id
          ? {
              ...campaign,
              raised: campaign.raised + amount,
              supporters: campaign.supporters + 1,
            }
          : campaign,
      ),
    );
  };

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
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Emergency Financial Support Network</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Fast Financial Help During Crisis Situations
            </h1>
            <p className="text-muted-foreground text-lg">
              Access community crowdfunding, emergency grants, and disaster relief pathways in one support network.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-primary" /> Community Crowdfunding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Campaign title</label>
                  <Input value={campaignTitle} onChange={(e) => setCampaignTitle(e.target.value)} placeholder="Ex: Rebuild my food cart" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Location</label>
                  <Input value={campaignLocation} onChange={(e) => setCampaignLocation(e.target.value)} placeholder="City or district" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Target amount</label>
                  <Input value={campaignTarget} onChange={(e) => setCampaignTarget(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <Button variant="hero" onClick={createCampaign}>Create Campaign</Button>

                <div className="max-h-56 overflow-auto space-y-2 border border-border rounded-lg p-3">
                  {campaigns.map((campaign) => {
                    const progress = campaign.target > 0 ? Math.min((campaign.raised / campaign.target) * 100, 100) : 0;

                    return (
                      <button
                        key={campaign.id}
                        onClick={() => setSelectedCampaignId(campaign.id)}
                        className={`w-full text-left rounded-md border p-2 ${selectedCampaignId === campaign.id ? "border-primary bg-primary/5" : "border-border"}`}
                      >
                        <p className="text-sm font-medium text-foreground">{campaign.title}</p>
                        <p className="text-xs text-muted-foreground">{campaign.location}</p>
                        <p className="text-xs text-muted-foreground">{formatINR(campaign.raised)} raised of {formatINR(campaign.target)}</p>
                        <div className="h-1.5 rounded bg-muted mt-1 overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input value={contribution} onChange={(e) => setContribution(e.target.value.replace(/[^\d]/g, ""))} />
                  <Button variant="outline" onClick={contributeToCampaign}>Contribute</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <HandCoins className="h-5 w-5 text-secondary" /> Emergency Grants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Monthly household income</label>
                  <Input value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Income drop in last 3 months (%)</label>
                  <Input value={incomeDropPct} onChange={(e) => setIncomeDropPct(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Dependents</label>
                  <Input value={dependents} onChange={(e) => setDependents(e.target.value.replace(/[^\d]/g, ""))} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Disaster impact</label>
                  <select
                    value={disasterImpact}
                    onChange={(e) => setDisasterImpact(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="rounded-lg border border-border p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Eligibility level</p>
                  <Badge variant={grantAssessment.level === "High" ? "destructive" : "secondary"}>{grantAssessment.level}</Badge>
                  <div className="space-y-2 pt-1">
                    {grantAssessment.suggested.map((grant) => (
                      <div key={grant.name} className="rounded-md border border-border p-2">
                        <p className="text-sm font-medium text-foreground">{grant.name}</p>
                        <p className="text-xs text-muted-foreground">{grant.amount}</p>
                        <p className="text-xs text-muted-foreground">{grant.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5 text-accent" /> Disaster Relief Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Current location</label>
                  <Input value={reliefLocation} onChange={(e) => setReliefLocation(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Disaster type</label>
                  <select
                    value={disasterType}
                    onChange={(e) => setDisasterType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="flood">Flood</option>
                    <option value="cyclone">Cyclone</option>
                    <option value="drought">Drought</option>
                    <option value="medical">Medical emergency</option>
                  </select>
                </div>

                <div className="rounded-lg border border-border p-4 bg-card/50 space-y-2">
                  {reliefSupport.map((item) => (
                    <p key={item} className="text-xs text-muted-foreground">- {item}</p>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  For urgent assistance, call local emergency services first and then the financial support helpline.
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

export default EmergencySupportNetwork;