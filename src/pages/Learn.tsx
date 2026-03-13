import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getLocalizedField } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Trophy, Star, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Learn = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [completing, setCompleting] = useState(false);

  const fetchData = async () => {
    if (!user) return;
    const [lessonsRes, progressRes, badgesRes, userBadgesRes, profileRes] = await Promise.all([
      supabase.from('lessons').select('*').order('order_index'),
      supabase.from('user_lesson_progress').select('*').eq('user_id', user.id),
      supabase.from('badges').select('*').order('required_points'),
      supabase.from('user_badges').select('*, badges(*)').eq('user_id', user.id),
      supabase.from('profiles').select('*').eq('id', user.id).single(),
    ]);
    if (lessonsRes.data) setLessons(lessonsRes.data);
    if (progressRes.data) setProgress(progressRes.data);
    if (badgesRes.data) setBadges(badgesRes.data);
    if (userBadgesRes.data) setUserBadges(userBadgesRes.data);
    if (profileRes.data) setProfile(profileRes.data);
  };

  useEffect(() => { fetchData(); }, [user]);

  const isCompleted = (lessonId: string) => progress.some(p => p.lesson_id === lessonId && p.completed);

  const completeLesson = async (lesson: any) => {
    if (!user || isCompleted(lesson.id)) return;
    setCompleting(true);

    await supabase.from('user_lesson_progress').upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      completed: true,
      completed_at: new Date().toISOString(),
      points_earned: lesson.points_reward,
    });

    const newTotal = (profile?.total_points || 0) + lesson.points_reward;
    await supabase.from('profiles').update({ total_points: newTotal }).eq('id', user.id);

    // Check for new badges
    const earnedBadgeIds = userBadges.map(ub => ub.badge_id);
    const newBadges = badges.filter(b => b.required_points <= newTotal && !earnedBadgeIds.includes(b.id));
    for (const badge of newBadges) {
      await supabase.from('user_badges').insert({ user_id: user.id, badge_id: badge.id });
    }

    toast({
      title: t('learn.congratulations', language),
      description: t('learn.earnedPoints', language, { points: lesson.points_reward }),
    });

    if (newBadges.length > 0) {
      toast({
        title: `${newBadges.map(b => b.icon).join(' ')} New Badge!`,
        description: newBadges.map(b => getLocalizedField(b, 'name', language)).join(', '),
      });
    }

    setCompleting(false);
    setSelectedLesson(null);
    fetchData();
  };

  const completedCount = progress.filter(p => p.completed).length;
  const totalPoints = profile?.total_points || 0;
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  const categories = [...new Set(lessons.map(l => l.category))];

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-24 pb-12 max-w-3xl">
          <Button variant="ghost" onClick={() => setSelectedLesson(null)} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" /> {t('learn.back', language)}
          </Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary">{t(`category.${selectedLesson.category}`, language)}</Badge>
                  <span className="text-sm text-accent font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4" /> {selectedLesson.points_reward} {t('learn.points', language)}
                  </span>
                </div>
                <CardTitle className="font-display text-2xl">
                  {getLocalizedField(selectedLesson, 'title', language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {getLocalizedField(selectedLesson, 'content', language) || getLocalizedField(selectedLesson, 'content', 'en')}
                </p>
                {!isCompleted(selectedLesson.id) ? (
                  <Button variant="hero" size="lg" onClick={() => completeLesson(selectedLesson)} disabled={completing} className="w-full">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    {t('learn.complete', language)}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-success font-semibold justify-center py-3">
                    <CheckCircle2 className="h-5 w-5" /> {t('learn.completed', language)}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('learn.title', language)}
          </h1>
          <p className="text-muted-foreground">{t('learn.subtitle', language)}</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">{t('learn.totalPoints', language)}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{completedCount}/{lessons.length}</div>
              <div className="text-sm text-muted-foreground">{t('learn.lessonsCompleted', language)}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">{t('learn.yourProgress', language)}</div>
              <Progress value={progressPercent} className="h-3" />
              <div className="text-right text-sm text-muted-foreground mt-1">{Math.round(progressPercent)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <div className="mb-10 max-w-3xl mx-auto">
          <h2 className="font-display text-xl font-bold mb-4">{t('badges.title', language)}</h2>
          <div className="flex flex-wrap gap-3">
            {badges.map(badge => {
              const earned = userBadges.some(ub => ub.badge_id === badge.id);
              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                    earned ? 'bg-accent/20 border-accent text-foreground' : 'bg-muted/50 border-border text-muted-foreground opacity-60'
                  }`}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm font-medium">{getLocalizedField(badge, 'name', language)}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lessons by Category */}
        {categories.map(cat => (
          <div key={cat} className="mb-8 max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Badge variant="secondary">{t(`category.${cat}`, language)}</Badge>
            </h2>
            <div className="grid gap-4">
              {lessons.filter(l => l.category === cat).map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card
                    className={`border-border/50 cursor-pointer transition-all hover:shadow-md ${
                      isCompleted(lesson.id) ? 'bg-success/5 border-success/30' : ''
                    }`}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <CardContent className="flex items-center justify-between py-5">
                      <div className="flex items-center gap-4">
                        {isCompleted(lesson.id) ? (
                          <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
                        ) : (
                          <BookOpen className="h-6 w-6 text-muted-foreground shrink-0" />
                        )}
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {getLocalizedField(lesson, 'title', language)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {getLocalizedField(lesson, 'description', language)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">{lesson.points_reward}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
