import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Home, BookOpen, Wallet, Landmark, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/learn", key: "nav.learnFinance", icon: BookOpen },
  { to: "/financial-tools", key: "nav.financialTools", icon: Wallet },
  { to: "/funding-support", key: "nav.fundingSupport", icon: Landmark },
  { to: "/community", key: "nav.community", icon: Users },
  { to: "/success-stories", key: "nav.successStories", icon: Sparkles },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-[0_6px_25px_hsl(var(--foreground)/0.04)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          <Link to="/" className="font-display text-xl font-bold text-foreground shrink-0 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold">SN</span>
            <span>Saksham<span className="text-primary">Nari</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-3 min-w-0 flex-1 justify-end">
            <div className="rounded-2xl border border-border/70 bg-card/70 px-2 py-1.5">
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-background transition-colors inline-flex items-center gap-1.5"
                    activeClassName="bg-primary text-primary-foreground shadow-sm"
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {t(item.key, language)}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <LanguageSwitcher />
              {user ? (
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 rounded-full border border-border/60 bg-card/50 hover:bg-card">
                  <LogOut className="h-4 w-4" /> {t('nav.logout', language)}
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="hero" size="sm" className="px-5 rounded-full shadow-sm">
                    {t('nav.loginRegister', language)}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground p-2 rounded-lg border border-border/60 bg-card/60"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur px-4 py-4">
          <div className="rounded-2xl border border-border/70 bg-card/70 p-3 space-y-2 shadow-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/70 transition-colors flex items-center gap-2"
                activeClassName="bg-primary text-primary-foreground"
              >
                <item.icon className="h-4 w-4" />
                {t(item.key, language)}
              </NavLink>
            ))}

            <div className="pt-2 pb-1"><LanguageSwitcher /></div>

          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start gap-2 rounded-lg border border-border/60 bg-background/70">
              <LogOut className="h-4 w-4" /> {t('nav.logout', language)}
            </Button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="hero" size="sm" className="w-full rounded-lg shadow-sm">{t('nav.loginRegister', language)}</Button>
            </Link>
          )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
