import { motion } from "framer-motion";
import { BookOpen, Building2, ShieldAlert, Smartphone, Users } from "lucide-react";

const problems = [
  {
    icon: BookOpen,
    title: "Financial Knowledge Gap",
    description: "Many women lack awareness about savings, investments, loans, and interest rates.",
    solution: "We provide simple, jargon-free financial education in local languages.",
  },
  {
    icon: Building2,
    title: "Limited Banking Access",
    description: "Traditional banks require collateral and complex documentation most women can't provide.",
    solution: "We connect women to collateral-free microfinance and digital banking solutions.",
  },
  {
    icon: ShieldAlert,
    title: "Predatory Lending",
    description: "Women often depend on informal moneylenders charging exploitative interest rates.",
    solution: "We offer access to fair-rate community lending circles and government schemes.",
  },
  {
    icon: Smartphone,
    title: "Low Digital Literacy",
    description: "Difficulty understanding financial apps, online banking, and digital payments.",
    solution: "Step-by-step guided tutorials designed for first-time digital users.",
  },
  {
    icon: Users,
    title: "Gender Gap in Entrepreneurship",
    description: "Women have fewer opportunities and financial support to start or scale businesses.",
    solution: "Mentorship programs, seed funding access, and business skill workshops.",
  },
];

const ProblemsSection = () => {
  return (
    <section className="py-24 bg-card" id="challenges">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">The Challenge</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Breaking Financial Barriers
          </h2>
          <p className="text-muted-foreground text-lg">
            Millions of women entrepreneurs face systemic obstacles. We're here to change that.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl bg-background p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
              <div className="rounded-lg bg-success/10 p-3">
                <p className="text-sm text-success font-medium">✨ {item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
