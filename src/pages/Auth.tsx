import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  const normalizeAuthError = (message: string) => {
    const lower = message.toLowerCase();

    if (lower.includes("invalid login credentials")) {
      return t("auth.error.invalidCredentials", language);
    }

    if (lower.includes("user already registered")) {
      return t("auth.error.emailRegistered", language);
    }

    return message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const cleanEmail = email.trim();
    const cleanPassword = password;
    const cleanName = fullName.trim();

    if (!cleanEmail || !cleanPassword || (!isLogin && !cleanName)) {
      toast({
        title: isLogin ? t("auth.loginFailedTitle", language) : t("auth.signupFailedTitle", language),
        description: t("auth.fillRequired", language),
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(cleanEmail, cleanPassword);

      if (error) {
        toast({
          title: t("auth.loginFailedTitle", language),
          description: normalizeAuthError(error.message),
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      toast({
        title: t("auth.loggedInTitle", language),
        description: t("auth.welcomeBackShort", language),
      });
      setSubmitting(false);
      navigate("/");
      return;
    }

    try {
      await axios
        .post("https://sakshamnari.live/login", {
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword,
        })
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch {
      toast({
        title: t("auth.signupFailedTitle", language),
        description: "Could not connect to signup server.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    const { error } = await signUp(cleanEmail, cleanPassword, cleanName);

    if (error) {
      toast({
        title: t("auth.signupFailedTitle", language),
        description: normalizeAuthError(error.message),
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    toast({
      title: t("auth.accountCreatedTitle", language),
      description: t("auth.accountCreatedDesc", language),
    });

    const loginAfterSignup = await signIn(cleanEmail, cleanPassword);
    if (loginAfterSignup.error) {
      toast({
        title: t("auth.loginFailedTitle", language),
        description: normalizeAuthError(loginAfterSignup.error.message),
        variant: "destructive",
      });
      setSubmitting(false);
      setIsLogin(true);
      return;
    }

    setEmail(cleanEmail);
    setSubmitting(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_40%),radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.2),transparent_45%)]" />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-5xl grid lg:grid-cols-2 gap-6"
        >
          <Card className="border-border/50 shadow-xl hidden lg:flex">
            <CardContent className="p-8 flex flex-col justify-between">
              <div>
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" /> {t("auth.backToHome", language)}
                </Link>
                <h1 className="font-display text-4xl font-bold mt-8 leading-tight text-foreground">
                  Welcome to
                  <span className="text-primary"> SakshamNari</span>
                </h1>
                <p className="text-muted-foreground mt-4 text-lg">
                  {t("auth.learnGrow", language)}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="text-sm text-muted-foreground">{t("auth.secureAccess", language)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-xl">
            <CardHeader className="space-y-4">
              <div className="lg:hidden">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" /> {t("auth.backToHome", language)}
                </Link>
              </div>
              <a href="/" className="font-display text-2xl font-bold text-foreground text-center">
                Saksham<span className="text-primary">Nari</span>
              </a>

              <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-1">
                <Button type="button" variant={isLogin ? "hero" : "ghost"} onClick={() => setIsLogin(true)}>
                  {t("auth.login", language)}
                </Button>
                <Button type="button" variant={!isLogin ? "hero" : "ghost"} onClick={() => setIsLogin(false)}>
                  {t("auth.signup", language)}
                </Button>
              </div>

              <div className="text-center">
                <CardTitle className="font-display text-2xl">
                  {isLogin ? t("auth.welcomeBack", language) : t("auth.createAccount", language)}
                </CardTitle>
                <CardDescription>
                  {isLogin ? t("auth.loginContinue", language) : t("auth.registerPersonalized", language)}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("auth.fullName", language)}</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t("auth.enterFullName", language)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t("auth.email", language)}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("auth.emailPlaceholder", language)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t("auth.password", language)}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("auth.passwordPlaceholder", language)}
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
                  {submitting ? t("auth.pleaseWait", language) : isLogin ? t("auth.login", language) : t("auth.createAccountBtn", language)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
