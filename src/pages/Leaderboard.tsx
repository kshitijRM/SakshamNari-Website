import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";

const Leaderboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .order('total_points', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setProfiles(data);
      });
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-accent" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-muted-foreground" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-primary" />;
    return <span className="text-sm font-bold text-muted-foreground w-6 text-center">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('leaderboard.title', language)}
          </h1>
          <p className="text-muted-foreground">{t('leaderboard.subtitle', language)}</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-0">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between px-6 py-4 border-b border-border/30 last:border-0 ${
                  profile.id === user?.id ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {getRankIcon(index + 1)}
                  <div>
                    <p className="font-semibold text-foreground">
                      {profile.full_name || 'Anonymous'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="font-bold text-foreground">{profile.total_points}</span>
                  <span className="text-sm text-muted-foreground">{t('leaderboard.points', language)}</span>
                </div>
              </motion.div>
            ))}
            {profiles.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No learners yet. Be the first!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
