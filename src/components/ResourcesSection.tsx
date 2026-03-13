import { motion } from "framer-motion";
import { GraduationCap, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: PiggyBank,
    title: "Savings Basics",
    desc: "Learn how to save even small amounts and watch your money grow with compound interest.",
    tag: "Beginner",
  },
  {
    icon: TrendingUp,
    title: "Investment 101",
    desc: "Understand safe investment options like recurring deposits, SIPs, and government bonds.",
    tag: "Intermediate",
  },
  {
    icon: Wallet,
    title: "Loan & Credit Guide",
    desc: "Know your rights, compare interest rates, and access low-cost credit options.",
    tag: "Essential",
  },
  {
    icon: GraduationCap,
    title: "Business Skills",
    desc: "Pricing, bookkeeping, marketing — practical skills to run a profitable small business.",
    tag: "Advanced",
  },
];

const ResourcesSection = () => {
  return (
    <section className="py-24" id="resources">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">Learn & Grow</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Free Financial Resources
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple, practical courses designed for women who are just starting their financial journey.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <span className="absolute top-4 right-4 text-xs font-semibold rounded-full bg-accent/50 text-accent-foreground px-3 py-1">
                {r.tag}
              </span>
              <div className="mb-4 inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm text-primary">
                <r.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{r.desc}</p>
              <Button variant="outline" className="w-full rounded-full">
                Start Learning
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
