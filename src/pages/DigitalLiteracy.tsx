import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Smartphone, Wallet, CreditCard } from "lucide-react";

const smartphoneGuides = [
  "Basic smartphone settings and language preferences",
  "Safe app installation and update practices",
  "Using camera, files, and documents for business tasks",
  "Protecting your phone with PIN and security settings",
];

const financialAppGuides = [
  "How to register and use mobile banking apps",
  "Checking account balance and mini statements",
  "How to track expenses using finance apps",
  "Recognizing fraud alerts and suspicious links",
];

const paymentTutorials = [
  "How to set up UPI and create a secure UPI PIN",
  "Sending and receiving money through QR and UPI ID",
  "Online bill payments and transaction history checks",
  "What to do if payment is pending or failed",
];

const DigitalLiteracy = () => {
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
              Digital Literacy Training Page
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Learn to Use Digital Tools with Confidence
            </h1>
            <p className="text-muted-foreground text-lg">
              Purpose: Teach women how to use digital tools for safer and smarter financial decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" /> Smartphone Usage Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                {smartphoneGuides.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Wallet className="h-5 w-5 text-secondary" /> How to Use Financial Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                {financialAppGuides.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent" /> Online Payment Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                {paymentTutorials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalLiteracy;
