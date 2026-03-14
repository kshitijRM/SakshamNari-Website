import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Heart className="h-4 w-4" />
            Empowering Women Entrepreneurs
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Empowering Women Entrepreneurs with Financial{" "}
            <span className="text-gradient-primary">Knowledge and Access.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-body">
            Get practical guidance to build money confidence, improve business decisions, and access fair financial opportunities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="hero" size="lg" className="text-base px-8 py-6">
              <Link to="/learn">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8 py-6">
              <Link to="/financial-tools">Check Financial Health</Link>
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Women Supported</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-foreground">12K+</p>
              <p className="text-sm text-muted-foreground">Businesses Started</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-foreground">₹2Cr+</p>
              <p className="text-sm text-muted-foreground">Loans Facilitated</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={heroImg}
              alt="Women entrepreneurs working together at market stalls and shops"
              className="w-full h-auto"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-float">
            <div className="rounded-2xl bg-card p-4 shadow-xl border border-border">
              <p className="text-sm font-semibold text-foreground">📈 Financial Literacy</p>
              <p className="text-xs text-muted-foreground">Free courses available</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
