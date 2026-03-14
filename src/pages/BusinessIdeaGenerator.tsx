import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, MapPin, Sparkles } from "lucide-react";

type Idea = {
  name: string;
  fitLocations: string[];
  fitSkills: string[];
  minBudget: number;
  maxBudget: number;
  setup: string;
  whyItWorks: string;
};

const ideaPool: Idea[] = [
  {
    name: "Home Tiffin and Nutrition Service",
    fitLocations: ["urban", "semi-urban"],
    fitSkills: ["cooking", "communication", "delivery coordination"],
    minBudget: 8000,
    maxBudget: 70000,
    setup: "Start with 10-20 fixed subscribers in nearby offices or hostels.",
    whyItWorks: "Daily demand and recurring customers create predictable monthly cash flow.",
  },
  {
    name: "Tailoring and Alteration Studio",
    fitLocations: ["urban", "semi-urban", "rural"],
    fitSkills: ["tailoring", "design", "customer service"],
    minBudget: 12000,
    maxBudget: 120000,
    setup: "Offer blouse and school uniform stitching with festival season packages.",
    whyItWorks: "Low setup cost with high repeat demand and referral potential.",
  },
  {
    name: "Millet Snacks and Pickle Brand",
    fitLocations: ["rural", "semi-urban"],
    fitSkills: ["food processing", "packaging", "hygiene"],
    minBudget: 10000,
    maxBudget: 150000,
    setup: "Begin with 2-3 products and sell via WhatsApp and local stores.",
    whyItWorks: "Healthy food products are in demand and can scale to online marketplaces.",
  },
  {
    name: "Digital Bookkeeping for Local Shops",
    fitLocations: ["urban", "semi-urban"],
    fitSkills: ["basic accounting", "excel", "digital tools"],
    minBudget: 5000,
    maxBudget: 50000,
    setup: "Offer monthly bookkeeping and GST-ready records for neighborhood shops.",
    whyItWorks: "Service model has low capital needs and steady monthly billing.",
  },
  {
    name: "Beauty and Wellness Home Services",
    fitLocations: ["urban", "semi-urban"],
    fitSkills: ["beauty", "communication", "hygiene"],
    minBudget: 15000,
    maxBudget: 180000,
    setup: "Launch with home visits and festival bridal packages.",
    whyItWorks: "Convenience-focused service with strong repeat bookings.",
  },
  {
    name: "Goatery and Dairy Value Products",
    fitLocations: ["rural"],
    fitSkills: ["animal care", "sourcing", "sales"],
    minBudget: 20000,
    maxBudget: 250000,
    setup: "Combine milk, ghee, and paneer sales with local delivery partnerships.",
    whyItWorks: "Strong village demand and multiple product lines diversify income.",
  },
  {
    name: "Eco-friendly Craft Store",
    fitLocations: ["urban", "semi-urban", "rural"],
    fitSkills: ["handicrafts", "creative design", "online selling"],
    minBudget: 7000,
    maxBudget: 90000,
    setup: "Sell festival-themed products through social media and local exhibitions.",
    whyItWorks: "Handmade storytelling products can command better margins.",
  },
  {
    name: "Mobile Repair and Accessories Kiosk",
    fitLocations: ["urban", "semi-urban"],
    fitSkills: ["mobile repair", "sales", "customer support"],
    minBudget: 25000,
    maxBudget: 220000,
    setup: "Start with accessories and simple repairs, then expand to advanced services.",
    whyItWorks: "High footfall business with frequent repeat purchases.",
  },
  {
    name: "Tuition and Learning Studio",
    fitLocations: ["urban", "semi-urban", "rural"],
    fitSkills: ["teaching", "subject expertise", "communication"],
    minBudget: 3000,
    maxBudget: 60000,
    setup: "Begin with after-school batches and weekend exam prep sessions.",
    whyItWorks: "Education services have consistent demand and scale through referrals.",
  },
];

const parseSkills = (text: string) =>
  text
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const BusinessIdeaGenerator = () => {
  const [location, setLocation] = useState("semi-urban");
  const [skillsText, setSkillsText] = useState("cooking, communication");
  const [budget, setBudget] = useState("50000");
  const [hasGenerated, setHasGenerated] = useState(false);

  const suggestedIdeas = useMemo(() => {
    const cleanSkills = parseSkills(skillsText);
    const budgetValue = Number(budget) || 0;

    const scored = ideaPool.map((idea) => {
      let score = 0;

      if (idea.fitLocations.includes(location)) score += 4;
      if (budgetValue >= idea.minBudget && budgetValue <= idea.maxBudget) score += 4;
      if (budgetValue > idea.maxBudget) score += 2;

      const skillMatches = idea.fitSkills.filter((skill) =>
        cleanSkills.some((inputSkill) => skill.includes(inputSkill) || inputSkill.includes(skill)),
      ).length;
      score += Math.min(6, skillMatches * 2);

      return { idea, score, skillMatches };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => ({
        ...item.idea,
        matchScore: item.score,
        matchingSkills: item.skillMatches,
      }));
  }, [location, skillsText, budget]);

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
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Business Idea Generator</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              AI Suggestions for Women Starting a Business
            </h1>
            <p className="text-muted-foreground text-lg">
              Get personalized business ideas using your location, current skills, and available budget.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Your Inputs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="urban">Urban</option>
                    <option value="semi-urban">Semi-Urban</option>
                    <option value="rural">Rural</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Skills (comma separated)</label>
                  <Input
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                    placeholder="Ex: tailoring, digital marketing, cooking"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Available budget (INR)</label>
                  <Input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="Ex: 50000"
                  />
                </div>

                <Button variant="hero" onClick={() => setHasGenerated(true)}>Generate Ideas</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" /> AI Business Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hasGenerated ? (
                  suggestedIdeas.map((idea) => (
                    <div key={idea.name} className="rounded-lg border border-border p-4 bg-card/50">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-foreground">{idea.name}</p>
                        <span className="text-xs text-primary font-medium">Match score: {idea.matchScore}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{idea.whyItWorks}</p>
                      <p className="text-sm text-muted-foreground mt-1">Setup: {idea.setup}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Budget fit: Rs. {idea.minBudget.toLocaleString("en-IN")} to Rs. {idea.maxBudget.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Skill match count: {idea.matchingSkills}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-border p-6 text-center">
                    <Lightbulb className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Enter your location, skills, and budget, then select Generate Ideas.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessIdeaGenerator;