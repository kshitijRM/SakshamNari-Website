import { motion } from "framer-motion";
import { BrainCircuit, GraduationCap, Landmark, Smartphone } from "lucide-react";

const solutions = [
  {
    icon: GraduationCap,
    title: "Financial Education",
    description: "Simple, local-language learning modules that make budgeting, savings, and planning practical.",
  },
  {
    icon: Landmark,
    title: "Loan Guidance",
    description: "Step-by-step support to compare options, understand terms, and apply for fair lending programs.",
  },
  {
    icon: Smartphone,
    title: "Digital Literacy",
    description: "Hands-on support for digital payments, app safety, and managing finances confidently online.",
  },
  {
    icon: BrainCircuit,
    title: "AI-based Financial Recommendations",
    description: "Personalized suggestions for saving, borrowing, and business cash-flow decisions.",
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
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Problem Awareness</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Financial Challenges Women Face
          </h2>
          <p className="text-muted-foreground text-lg">
            Many women entrepreneurs face limited financial access, lack of trusted guidance, and low confidence with digital finance tools.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-background p-8 border border-border"
          >
            <h3 className="font-display text-2xl font-semibold mb-4">What makes financial growth difficult?</h3>
            <p className="text-muted-foreground mb-6">
              Women often navigate informal lending, paperwork-heavy loan systems, and limited time for structured learning while managing work and home responsibilities.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
              <li>Limited awareness of formal finance and government schemes</li>
              <li>High dependence on expensive informal credit</li>
              <li>Low access to digital tools and guidance</li>
              <li>Few trusted, personalized recommendations</li>
            </ul>
          </motion.div>

          <div>
            <h3 className="font-display text-2xl font-semibold mb-6">Solutions Offered</h3>
            <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((item, i) => (
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
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
