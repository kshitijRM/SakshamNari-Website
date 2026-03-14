import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-6 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Saksham<span className="text-primary">Nari</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {t("footer.about", language)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.contact", language)}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:support@kshitijdinni.me" className="hover:text-foreground transition-colors">support@kshitijdinni.me</a></li>
              <li><a href="tel:+919272501980" className="hover:text-foreground transition-colors">+91 9272501980</a></li>
              <li><a href="/community" className="hover:text-foreground transition-colors">{t("footer.communityDesk", language)}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.social", language)}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.support", language)}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/help-support" className="hover:text-foreground transition-colors">{t("footer.helpCenter", language)}</a></li>
              <li><a href="/help-support" className="hover:text-foreground transition-colors">{t("footer.contactUs", language)}</a></li>
              <li><a href="/funding-support" className="hover:text-foreground transition-colors">{t("footer.fundingSupport", language)}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.faqs", language)}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.faqStart", language)}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.faqLoan", language)}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.faqJoin", language)}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t("footer.madeWith", language)} <Heart className="h-3 w-3 text-primary" /> {t("footer.forWomen", language)}
          </p>
          <p className="text-sm text-muted-foreground">© 2026 SakshamNari. {t("footer.rights", language)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
