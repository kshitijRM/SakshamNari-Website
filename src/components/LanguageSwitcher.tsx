import { useLanguage } from "@/contexts/LanguageContext";
import { languages } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
      <SelectTrigger className="w-auto gap-2 bg-card border-border/50">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
