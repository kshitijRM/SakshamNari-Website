import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, Users, CalendarDays, UserRoundPlus } from "lucide-react";

const forumTopics = [
  {
    title: "Managing seasonal cash flow",
    category: "Discussion Forum",
    replies: 24,
    summary: "Tips for handling irregular monthly income in small businesses.",
  },
  {
    title: "How to price products for profit",
    category: "Discussion Forum",
    replies: 31,
    summary: "Community strategies to calculate costs and set sustainable selling prices.",
  },
  {
    title: "Best practices for digital payments",
    category: "Discussion Forum",
    replies: 18,
    summary: "How women entrepreneurs use UPI and banking apps safely and efficiently.",
  },
];

const adviceSessions = [
  {
    title: "Weekly Business Advice Session",
    day: "Wednesday",
    time: "5:00 PM - 6:00 PM",
    focus: "Budgeting and growth planning",
  },
  {
    title: "Loan Readiness Workshop",
    day: "Friday",
    time: "4:00 PM - 5:00 PM",
    focus: "Application prep and document checks",
  },
];

const networkingGroups = [
  {
    name: "Retail & Home Business Circle",
    members: 124,
    purpose: "Peer support for pricing, sourcing, and marketing.",
  },
  {
    name: "Food Enterprise Network",
    members: 89,
    purpose: "Compliance, packaging, and scaling for food businesses.",
  },
  {
    name: "Women Digital Sellers Forum",
    members: 153,
    purpose: "Online sales, social media growth, and digital tools.",
  },
];

const CommunityMentorship = () => {
  const [mentorQuery, setMentorQuery] = useState("");
  const [mentorSubmitted, setMentorSubmitted] = useState(false);

  const submitMentorQuery = () => {
    if (!mentorQuery.trim()) return;
    setMentorSubmitted(true);
    setMentorQuery("");
  };

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
              Community & Mentorship Page
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Build a Strong Support Network
            </h1>
            <p className="text-muted-foreground text-lg">
              Purpose: Build a support network through forums, mentor access, business guidance, and peer networking groups.
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
                  <MessageSquare className="h-5 w-5 text-primary" /> Discussion Forums
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {forumTopics.map((topic) => (
                  <div key={topic.title} className="rounded-lg border border-border p-4">
                    <p className="font-medium text-foreground">{topic.title}</p>
                    <p className="text-sm text-muted-foreground">{topic.summary}</p>
                    <p className="text-xs text-muted-foreground mt-2">{topic.replies} replies</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <UserRoundPlus className="h-5 w-5 text-secondary" /> Ask a Mentor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Share your challenge and get guidance from experienced women entrepreneurs and financial mentors.
                </p>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your question</label>
                  <Input
                    value={mentorQuery}
                    onChange={(e) => setMentorQuery(e.target.value)}
                    placeholder="Example: How can I improve monthly profit in my tailoring business?"
                  />
                </div>
                <Button variant="hero" onClick={submitMentorQuery}>Submit to Mentor</Button>
                {mentorSubmitted && (
                  <p className="text-sm text-success">Your question was submitted. A mentor will respond in the advice session.</p>
                )}
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
                  <CalendarDays className="h-5 w-5 text-accent" /> Business Advice Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {adviceSessions.map((session) => (
                  <div key={session.title} className="rounded-lg border border-border p-4">
                    <p className="font-medium text-foreground">{session.title}</p>
                    <p className="text-sm text-muted-foreground">{session.day} | {session.time}</p>
                    <p className="text-sm text-muted-foreground">Focus: {session.focus}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> Networking Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {networkingGroups.map((group) => (
                  <div key={group.name} className="rounded-lg border border-border p-4">
                    <p className="font-medium text-foreground">{group.name}</p>
                    <p className="text-sm text-muted-foreground">{group.members} members</p>
                    <p className="text-sm text-muted-foreground">{group.purpose}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityMentorship;
