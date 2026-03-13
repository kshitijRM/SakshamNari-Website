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
          <a href="/#challenges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.challenges', language)}
          </a>
          <a href="/#resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.resources', language)}
          </a>
          {user && (
            <>
              <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.learn', language)}
              </Link>
              <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.leaderboard', language)}
              </Link>
            </>
          )}
          <LanguageSwitcher />
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" /> {t('nav.logout', language)}
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="hero" size="sm" className="px-6">
                {t('nav.getStarted', language)}
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
          <a href="/#challenges" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.challenges', language)}
          </a>
          <a href="/#resources" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
            {t('nav.resources', language)}
          </a>
          {user && (
            <>
              <Link to="/learn" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
                {t('nav.learn', language)}
              </Link>
              <Link to="/leaderboard" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
                {t('nav.leaderboard', language)}
              </Link>
            </>
          )}
          <div className="py-2"><LanguageSwitcher /></div>
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" /> {t('nav.logout', language)}
            </Button>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">{t('nav.getStarted', language)}</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
