import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        navigate("/learn");
      }
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: t('learn.congratulations', language), description: "Please check your email to verify your account." });
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <a href="/" className="font-display text-2xl font-bold text-foreground">
              Saksham<span className="text-primary">Nari</span>
            </a>
            <CardTitle className="font-display text-xl">
              {isLogin ? t('auth.login', language) : t('auth.signup', language)}
            </CardTitle>
            <CardDescription>
              {isLogin ? t('auth.loginSubtitle', language) : t('auth.signupSubtitle', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t('auth.fullName', language)}</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('auth.fullName', language)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('auth.email', language)}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.email', language)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('auth.password', language)}</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.password', language)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? "..." : isLogin ? t('auth.login', language) : t('auth.signup', language)}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:underline"
              >
                {isLogin ? t('auth.noAccount', language) : t('auth.haveAccount', language)}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
