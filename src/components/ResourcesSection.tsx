import { motion } from "framer-motion";
import { GraduationCap, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const resources = [
  {
    icon: PiggyBank,
    titleKey: "home.resource.savings.title",
    descKey: "home.resource.savings.desc",
    tagKey: "home.resource.savings.tag",
  },
  {
    icon: TrendingUp,
    titleKey: "home.resource.invest.title",
    descKey: "home.resource.invest.desc",
    tagKey: "home.resource.invest.tag",
  },
  {
    icon: Wallet,
    titleKey: "home.resource.loan.title",
    descKey: "home.resource.loan.desc",
    tagKey: "home.resource.loan.tag",
  },
  {
    icon: GraduationCap,
    titleKey: "home.resource.business.title",
    descKey: "home.resource.business.desc",
    tagKey: "home.resource.business.tag",
  },
];

const ResourcesSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24" id="resources">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">{t("home.resources.badge", language)}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t("home.resources.title", language)}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("home.resources.subtitle", language)}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((r, i) => (
            <motion.div
              key={r.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <span className="absolute top-4 right-4 text-xs font-semibold rounded-full bg-accent/50 text-accent-foreground px-3 py-1">
                {t(r.tagKey, language)}
              </span>
              <div className="mb-4 inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm text-primary">
                <r.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{t(r.titleKey, language)}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{t(r.descKey, language)}</p>
              <Button variant="outline" className="w-full rounded-full">
                {t("home.resources.start", language)}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
