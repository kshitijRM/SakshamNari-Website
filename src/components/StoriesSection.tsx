import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stories = [
  {
    name: "Lakshmi Devi",
    location: "Rajasthan",
    story: "With a ₹5,000 microloan and basic bookkeeping training, I grew my pickle business to serve 3 districts. I now employ 8 women from my village.",
    business: "Food Processing",
  },
  {
    name: "Fatima Begum",
    location: "West Bengal",
    story: "I learned to use UPI payments and doubled my tailoring orders. Now I save ₹2,000 every month — something I never thought possible.",
    business: "Tailoring",
  },
  {
    name: "Priya Kumari",
    location: "Bihar",
    story: "The financial literacy course taught me about SHGs. Our self-help group now has ₹3 lakh in savings and we fund each other's dreams.",
    business: "Self-Help Group Leader",
  },
];

const StoriesSection = () => {
  return (
    <section className="py-24 bg-card" id="stories">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Real Impact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Stories of Change
          </h2>
          <p className="text-muted-foreground text-lg">
            Meet the women who transformed their lives through financial empowerment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl bg-background border border-border p-8 relative"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-6 italic">"{s.story}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-cta flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {s.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.business} · {s.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
