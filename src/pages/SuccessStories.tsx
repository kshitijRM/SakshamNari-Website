import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpenText, PlayCircle, Route } from "lucide-react";

const caseStudies = [
  {
    name: "Lakshmi Devi",
    business: "Food Processing Unit",
    impact: "Revenue grew 3.2x in 18 months",
    summary:
      "Moved from informal lending to structured finance, adopted monthly budgeting, and expanded distribution to nearby districts.",
  },
  {
    name: "Fatima Begum",
    business: "Tailoring and Design Studio",
    impact: "Monthly savings increased by 240%",
    summary:
      "Used digital banking and profit tracking to stabilize cash flow and hire two full-time assistants.",
  },
  {
    name: "Priya Kumari",
    business: "Community Retail Collective",
    impact: "Group sales up by 2.7x",
    summary:
      "Led a women-led networking group and introduced shared procurement, reducing inventory costs significantly.",
  },
];

const videoStories = [
  {
    title: "From Local Shop to Regional Brand",
    speaker: "Anita Sharma",
    duration: "7 min",
  },
  {
    title: "How I Managed My First Business Loan",
    speaker: "Sangeeta Rao",
    duration: "6 min",
  },
  {
    title: "Digital Payments Changed My Business",
    speaker: "Meena Patel",
    duration: "5 min",
  },
];

const businessJourneys = [
  {
    stage: "Start",
    detail: "Identified income leaks and documented daily cash transactions.",
  },
  {
    stage: "Stabilize",
    detail: "Introduced fixed monthly budget and emergency reserve strategy.",
  },
  {
    stage: "Scale",
    detail: "Accessed formal credit and expanded product/service offerings.",
  },
  {
    stage: "Lead",
    detail: "Mentored other women entrepreneurs through networking groups.",
  },
];

const SuccessStories = () => {
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
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Success Stories Page
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Stories That Inspire Women to Build Bigger Dreams
            </h1>
            <p className="text-muted-foreground text-lg">
              Purpose: Inspire other women through real case studies, video stories, and practical business journeys.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <BookOpenText className="h-5 w-5 text-primary" /> Case Studies
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-5">
              {caseStudies.map((study) => (
                <div key={study.name} className="rounded-xl border border-border p-5">
                  <p className="font-semibold text-foreground">{study.name}</p>
                  <p className="text-sm text-muted-foreground">{study.business}</p>
                  <p className="text-sm text-primary font-medium mt-2">{study.impact}</p>
                  <p className="text-sm text-muted-foreground mt-2">{study.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-secondary" /> Videos of Successful Women Entrepreneurs
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-5">
              {videoStories.map((video) => (
                <div key={video.title} className="rounded-xl border border-border overflow-hidden">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <PlayCircle className="h-10 w-10 text-primary" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-foreground">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.speaker} | {video.duration}</p>
                    <Button variant="outline" className="mt-3 w-full">Watch Story</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Route className="h-5 w-5 text-accent" /> Business Journeys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {businessJourneys.map((step) => (
                  <div key={step.stage} className="rounded-xl border border-border p-4">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">{step.stage}</p>
                    <p className="text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;
