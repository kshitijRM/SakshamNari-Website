import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, HelpCircle, Video, Mail } from "lucide-react";

const faqs = [
  {
    question: "How do I start learning finance modules?",
    answer: "Go to Learn Finance, choose a lesson, and complete modules step by step to unlock badges and rewards.",
  },
  {
    question: "How can I check my loan eligibility?",
    answer: "Use the Loan Eligibility Checker on the Funding Support page and submit your income and expense details.",
  },
  {
    question: "Is my personal data secure?",
    answer: "Your profile data is used only to personalize guidance and support. Avoid sharing OTP or passwords with anyone.",
  },
  {
    question: "Where can I ask business-specific questions?",
    answer: "Visit Community & Mentorship and use Ask a Mentor to submit your query for expert sessions.",
  },
];

const helpVideos = [
  {
    title: "How to Use UPI Safely",
    length: "5 min",
  },
  {
    title: "How to Build a Monthly Budget",
    length: "7 min",
  },
  {
    title: "How to Apply for a Microloan",
    length: "6 min",
  },
];

const HelpSupport = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I am support assistant. Ask about learning, funding, or tools." },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;

    const lower = text.toLowerCase();
    let reply = "Thanks. Our support team will help you shortly.";

    if (lower.includes("loan") || lower.includes("fund")) {
      reply = "For loan support, open Funding Support page and use the Eligibility Checker and document checklist.";
    } else if (lower.includes("learn") || lower.includes("course")) {
      reply = "For learning help, go to Learn Finance and start with Basic Finance Lessons.";
    } else if (lower.includes("tool") || lower.includes("calculator")) {
      reply = "For planning tools, open Financial Tools page for Savings, EMI, Profit, and Budget planners.";
    }

    setChatMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: reply }]);
    setChatInput("");
  };

  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
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
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Help & Support Page</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Get Help When You Need It</h1>
            <p className="text-muted-foreground text-lg">
              Find answers, chat with support, watch quick help videos, or contact the team directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" /> FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-lg border border-border p-4">
                  <summary className="cursor-pointer font-medium text-foreground">{faq.question}</summary>
                  <p className="text-sm text-muted-foreground mt-2">{faq.answer}</p>
                </details>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-secondary" /> Live Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64 overflow-auto rounded-lg border border-border p-3 bg-card/50 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={`${msg.role}-${idx}`}
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "assistant"
                        ? "bg-secondary/20 text-foreground"
                        : "ml-auto bg-primary/15 text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your question"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendChat();
                    }
                  }}
                />
                <Button variant="hero" onClick={sendChat}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Video className="h-5 w-5 text-accent" /> Help Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {helpVideos.map((video) => (
                <div key={video.title} className="rounded-lg border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.length}</p>
                  </div>
                  <Button variant="outline">Watch</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" /> Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={submitContactForm}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue" required />
                </div>
                <Button type="submit" variant="hero">Submit</Button>
                {submitted && (
                  <p className="text-sm text-success">Thanks, your message has been submitted. Support will reach out soon.</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpSupport;
