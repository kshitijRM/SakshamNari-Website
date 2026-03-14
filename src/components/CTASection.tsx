import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24" id="funding-support">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-cta rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10">
            <Sparkles className="h-10 w-10 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              Join thousands of women who are building better futures. Free courses, community support, and access to fair financial services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-background text-foreground hover:bg-background/90 font-semibold text-base px-8 py-6"
              >
                Join for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6"
              >
                Talk to a Mentor
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
