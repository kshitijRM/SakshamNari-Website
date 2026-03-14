import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, Languages, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language, languages, t } from "@/lib/i18n";

const speechLangMap: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
  te: "te-IN",
  ta: "ta-IN",
};

const conceptExplanations: Record<Language, Record<string, string>> = {
  en: {
    savings: "Savings means setting aside part of your income regularly for future needs and emergencies.",
    interest: "Interest rate is the percentage charged on loans or earned on deposits over time.",
    loans: "A loan is borrowed money that must be repaid in installments with interest.",
    investments: "Investment is using money in options like deposits or funds to grow wealth over time.",
    upi: "UPI lets you send and receive money instantly using a mobile app and secure pin.",
  },
  hi: {
    savings: "Savings ka matlab hai aay ka ek hissa niyamit roop se bhavishya aur emergency ke liye rakhna.",
    interest: "Interest rate vah pratishat hai jo loan par dena ya jama par paana hota hai.",
    loans: "Loan udhaar li gayi rakam hai jise byaj ke saath kiston me chukana hota hai.",
    investments: "Investment ka matlab hai paisa aise vikalpon me lagana jo samay ke saath badhe.",
    upi: "UPI se aap mobile app aur secure pin ke saath turant paise bhej aur le sakte hain.",
  },
  kn: {
    savings: "Savings andre nimma aayada ondu bhagavannu bhavishya mattu emergency ge niyamitavagi iduvudu.",
    interest: "Interest rate andre saala mele kodabekada athava jama mele siguva shekada dara.",
    loans: "Loan andre kadde hana, adannu baddi jote kistugallalli tirisabeku.",
    investments: "Investment andre hana vikasakke thakkanta vikalpagaLalli haakuvudu.",
    upi: "UPI inda mobile app mattu surakshita pin moolaka takshana hanada vinimaya maadabahudu.",
  },
  te: {
    savings: "Savings ante mee aayam lo oka bhaagam ni bhavishyat mariyu emergency kosam pettadam.",
    interest: "Interest rate ante loan pai kattalsina leda deposit pai pondalsina shatam.",
    loans: "Loan ante appuga teesukunna dabbu, danini byajam tho installments lo tirchali.",
    investments: "Investment ante dabbu ni kalamtho perigey avakashallo pettadam.",
    upi: "UPI tho mobile app mariyu secure pin dwara ventane money pampavachu mariyu teesukovachu.",
  },
  ta: {
    savings: "Savings enbathu varumanathin oru paguthiyai ethirkaalam matrum emergency-kaga vaippadhu.",
    interest: "Interest rate enbathu kadanukku seluthum allathu deposit-il perum sadaveedam.",
    loans: "Loan enbathu kadanaga edutha panam; adhai vatti-udan thavanaiyaga thiruppi seluthanum.",
    investments: "Investment enbathu panathai valarchikku uthavum vazhigalil seidhal.",
    upi: "UPI moolam mobile app matrum secure pin use panni udanadiyaga panam anuppa matrum peralaam.",
  },
};

const wordMap: Record<Language, Record<string, string>> = {
  en: {},
  hi: {
    savings: "bachat",
    loan: "rin",
    income: "aay",
    expense: "kharch",
    budget: "budget",
  },
  kn: {
    savings: "ulitaaya",
    loan: "saala",
    income: "aaya",
    expense: "vecche",
    budget: "yojane",
  },
  te: {
    savings: "pudupu",
    loan: "appu",
    income: "aadayam",
    expense: "kharchu",
    budget: "budget yojana",
  },
  ta: {
    savings: "semippu",
    loan: "kadan",
    income: "varumanam",
    expense: "selavu",
    budget: "selavu thittam",
  },
};

const conceptLabels: Array<{ key: "savings" | "interest" | "loans" | "investments" | "upi"; label: string }> = [
  { key: "savings", label: "home.multi.concept.savings" },
  { key: "interest", label: "home.multi.concept.interest" },
  { key: "loans", label: "home.multi.concept.loans" },
  { key: "investments", label: "home.multi.concept.investments" },
  { key: "upi", label: "home.multi.concept.upi" },
];

const MultilingualSupportSection = () => {
  const { language, setLanguage } = useLanguage();
  const [inputText, setInputText] = useState("");

  const translatedText = useMemo(() => {
    if (!inputText.trim()) return "";
    if (language === "en") return inputText;

    const dict = wordMap[language];
    const translated = inputText
      .split(/(\s+)/)
      .map((token) => {
        const normalized = token.toLowerCase().replace(/[^a-z]/g, "");
        if (!normalized || !dict[normalized]) return token;
        return token.replace(new RegExp(normalized, "i"), dict[normalized]);
      })
      .join("");

    return translated;
  }, [inputText, language]);

  const startVoiceInput = () => {
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = speechLangMap[language];
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setInputText(transcript);
    };
    recognition.start();
  };

  const speakConcept = (conceptKey: "savings" | "interest" | "loans" | "investments" | "upi") => {
    if (!("speechSynthesis" in window)) {
      alert("Audio explanations are not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(conceptExplanations[language][conceptKey]);
    utterance.lang = speechLangMap[language];
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="py-24 bg-card/40" id="multilingual-support">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">{t("home.multi.badge", language)}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t("home.multi.title", language)}</h2>
          <p className="text-muted-foreground text-lg">
            {t("home.multi.subtitle", language)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" /> {t("home.multi.optionsTitle", language)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    type="button"
                    variant={language === lang.code ? "hero" : "outline"}
                    size="sm"
                    onClick={() => setLanguage(lang.code)}
                  >
                    {lang.nativeLabel}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t("home.multi.voiceTranslation", language)}</label>
                <div className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t("home.multi.speakPlaceholder", language)}
                  />
                  <Button type="button" variant="outline" onClick={startVoiceInput}>
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-lg border border-border p-3 bg-background/60">
                  <p className="text-xs text-muted-foreground mb-1">{t("home.multi.translatedPreview", language)}</p>
                  <p className="text-sm text-foreground">{translatedText || t("home.multi.translatedEmpty", language)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-secondary" /> {t("home.multi.audioTitle", language)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conceptLabels.map((concept) => (
                <div key={concept.key} className="rounded-lg border border-border p-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-foreground">{t(concept.label, language)}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => speakConcept(concept.key)}>
                    <Volume2 className="h-4 w-4" /> {t("home.multi.play", language)}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MultilingualSupportSection;
