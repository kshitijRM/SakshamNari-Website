import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold text-foreground">
          Saksham<span className="text-primary">Nari</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.home', language)}
          </Link>
          <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.learnFinance', language)}
          </Link>
          <Link to="/financial-tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.financialTools', language)}
          </Link>
          <Link to="/business-marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.marketplace', language)}
          </Link>
          <Link to="/business-idea-generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.ideaGenerator', language)}
          </Link>
          <Link to="/risk-alerts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.riskAlerts', language)}
          </Link>
          <Link to="/emergency-support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.emergencySupport', language)}
          </Link>
          <Link to="/funding-support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.fundingSupport', language)}
          </Link>
          <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.community', language)}
          </Link>
          <Link to="/success-stories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.successStories', language)}
          </Link>
          <LanguageSwitcher />
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" /> {t('nav.logout', language)}
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="hero" size="sm" className="px-6">
                {t('nav.loginRegister', language)}
              </Button>
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          <Link to="/" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.home', language)}
          </Link>
          <Link to="/learn" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.learnFinance', language)}
          </Link>
          <Link to="/financial-tools" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.financialTools', language)}
          </Link>
          <Link to="/business-marketplace" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.marketplace', language)}
          </Link>
          <Link to="/business-idea-generator" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.ideaGenerator', language)}
          </Link>
          <Link to="/risk-alerts" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.riskAlerts', language)}
          </Link>
          <Link to="/emergency-support" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.emergencySupport', language)}
          </Link>
          <Link to="/funding-support" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.fundingSupport', language)}
          </Link>
          <Link to="/community" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.community', language)}
          </Link>
          <Link to="/success-stories" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.successStories', language)}
          </Link>
          <div className="py-2"><LanguageSwitcher /></div>
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" /> {t('nav.logout', language)}
            </Button>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">{t('nav.loginRegister', language)}</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
