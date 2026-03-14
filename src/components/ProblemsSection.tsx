import { motion } from "framer-motion";
import { BrainCircuit, GraduationCap, Landmark, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const solutions = [
  {
    icon: GraduationCap,
    titleKey: "home.solution.education.title",
    descriptionKey: "home.solution.education.description",
  },
  {
    icon: Landmark,
    titleKey: "home.solution.loan.title",
    descriptionKey: "home.solution.loan.description",
  },
  {
    icon: Smartphone,
    titleKey: "home.solution.digital.title",
    descriptionKey: "home.solution.digital.description",
  },
  {
    icon: BrainCircuit,
    titleKey: "home.solution.ai.title",
    descriptionKey: "home.solution.ai.description",
  },
];

const ProblemsSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-card" id="challenges">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">{t("home.problems.badge", language)}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t("home.problems.title", language)}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("home.problems.subtitle", language)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-background p-8 border border-border"
          >
            <h3 className="font-display text-2xl font-semibold mb-4">{t("home.problems.cardTitle", language)}</h3>
            <p className="text-muted-foreground mb-6">
              {t("home.problems.cardSubtitle", language)}
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
              <li>{t("home.problems.point1", language)}</li>
              <li>{t("home.problems.point2", language)}</li>
              <li>{t("home.problems.point3", language)}</li>
              <li>{t("home.problems.point4", language)}</li>
            </ul>
          </motion.div>

          <div>
            <h3 className="font-display text-2xl font-semibold mb-6">{t("home.problems.solutionsTitle", language)}</h3>
            <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl bg-background p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{t(item.titleKey, language)}</h3>
              <p className="text-muted-foreground text-sm">{t(item.descriptionKey, language)}</p>
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
