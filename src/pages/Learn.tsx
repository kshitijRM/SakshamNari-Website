import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getLocalizedField } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Star,
  ArrowLeft,
  CheckCircle2,
  PiggyBank,
  Percent,
  Landmark,
  TrendingUp,
  Calculator,
  Wallet,
  Smartphone,
  Building2,
  BadgeCheck,
  Gift,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const hubSections = {
  basicFinance: {
    title: "Basic Finance Lessons",
    items: [
      { icon: PiggyBank, label: "Savings" },
      { icon: Percent, label: "Interest rates" },
      { icon: Landmark, label: "Loans" },
      { icon: TrendingUp, label: "Investments" },
    ],
  },
  entrepreneurFinance: {
    title: "Entrepreneur Finance",
    items: [
      { icon: Calculator, label: "Business budgeting" },
      { icon: Wallet, label: "Profit management" },
      { icon: BookOpen, label: "Cost control" },
    ],
  },
  digitalBanking: {
    title: "Digital Banking Tutorials",
    items: [
      { icon: Smartphone, label: "How to use UPI" },
      { icon: Building2, label: "How to open a bank account" },
      { icon: Smartphone, label: "Mobile banking guides" },
    ],
  },
};

const quizQuestions = [
  {
    question: "If you save Rs. 1,000 every month, what helps your savings grow faster over time?",
    options: ["No plan", "Compound interest", "Ignoring expenses", "Borrowing regularly"],
    answer: "Compound interest",
  },
  {
    question: "For small business profit management, what should be tracked every week?",
    options: ["Only sales", "Only customer count", "Income and expenses", "Only social media posts"],
    answer: "Income and expenses",
  },
  {
    question: "What is the safest first step before using UPI with a new app?",
    options: ["Share OTP", "Enable app lock and verify official app", "Use public Wi-Fi only", "Skip bank linking checks"],
    answer: "Enable app lock and verify official app",
  },
];

const LESSONS = [
  {
    id: "lesson-1",
    category: "basics",
    order_index: 1,
    points_reward: 20,
    title: "Savings Basics",
    description: "Understand how regular savings build financial confidence.",
    content: "Start by saving a fixed amount weekly. Track it, and increase gradually as your income stabilizes.",
  },
  {
    id: "lesson-2",
    category: "basics",
    order_index: 2,
    points_reward: 20,
    title: "Interest Rates",
    description: "Learn how interest impacts loans and deposits.",
    content: "A lower interest rate usually means lower borrowing cost. Compare rates and processing fees together.",
  },
  {
    id: "lesson-3",
    category: "entrepreneurship",
    order_index: 3,
    points_reward: 30,
    title: "Business Budgeting",
    description: "Split business income across expenses, savings, and growth.",
    content: "Use a simple monthly budget: operations, salaries, growth, and emergency buffer.",
  },
  {
    id: "lesson-4",
    category: "digital",
    order_index: 4,
    points_reward: 30,
    title: "Safe Digital Payments",
    description: "Use UPI and banking apps securely.",
    content: "Never share OTP or PIN. Check recipient details before confirming payment.",
  },
];

const BADGES = [
  { id: "badge-1", name: "Starter", icon: "🌱", required_points: 20 },
  { id: "badge-2", name: "Learner", icon: "📘", required_points: 50 },
  { id: "badge-3", name: "Achiever", icon: "🏆", required_points: 100 },
];

const Learn = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [completing, setCompleting] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const storageKey = user ? `learn_progress_${user.id}` : "learn_progress_guest";
  const badgeStorageKey = user ? `learn_badges_${user.id}` : "learn_badges_guest";

  const fetchData = async () => {
    const storedProgressRaw = localStorage.getItem(storageKey);
    const storedProgress = storedProgressRaw ? JSON.parse(storedProgressRaw) : [];

    const storedBadgesRaw = localStorage.getItem(badgeStorageKey);
    const storedBadgeIds = storedBadgesRaw ? JSON.parse(storedBadgesRaw) : [];

    setLessons([...LESSONS].sort((a, b) => a.order_index - b.order_index));
    setBadges([...BADGES].sort((a, b) => a.required_points - b.required_points));
    setProgress(storedProgress);
    setUserBadges(storedBadgeIds.map((id: string) => ({ badge_id: id })));
  };

  useEffect(() => { fetchData(); }, [user]);

  const isCompleted = (lessonId: string) => progress.some(p => p.lesson_id === lessonId && p.completed);

  const completeLesson = async (lesson: any) => {
    if (isCompleted(lesson.id)) return;
    setCompleting(true);

    const updatedProgress = [
      ...progress,
      {
      lesson_id: lesson.id,
      completed: true,
      completed_at: new Date().toISOString(),
      points_earned: lesson.points_reward,
      },
    ];
    localStorage.setItem(storageKey, JSON.stringify(updatedProgress));

    const newTotal = updatedProgress.reduce((sum: number, item: any) => sum + (item.points_earned || 0), 0);

    // Check for new badges
    const earnedBadgeIds = userBadges.map(ub => ub.badge_id);
    const newBadges = badges.filter(b => b.required_points <= newTotal && !earnedBadgeIds.includes(b.id));

    const updatedBadgeIds = [...new Set([...earnedBadgeIds, ...newBadges.map((b: any) => b.id)])];
    localStorage.setItem(badgeStorageKey, JSON.stringify(updatedBadgeIds));

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
  const totalPoints = progress.reduce((sum, p) => sum + (p.points_earned || 0), 0);
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  const categories = [...new Set(lessons.map(l => l.category))];

  const currentQuestion = quizQuestions[currentQuizIndex];
  const rewardTier = totalPoints >= 500 ? "Gold Reward" : totalPoints >= 250 ? "Silver Reward" : "Starter Reward";

  const submitQuizAnswer = () => {
    if (!selectedOption) return;

    if (selectedOption === currentQuestion.answer) {
      setQuizScore((prev) => prev + 1);
      toast({ title: "Correct", description: "Great answer. Keep learning." });
    } else {
      toast({ title: "Keep going", description: `Correct answer: ${currentQuestion.answer}` });
    }

    if (currentQuizIndex === quizQuestions.length - 1) {
      setQuizCompleted(true);
      return;
    }

    setCurrentQuizIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

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
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
            Financial Learning Hub
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Purpose: Improve financial literacy through practical lessons, tutorials, and gamified learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-xl">{hubSections.basicFinance.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hubSections.basicFinance.items.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-xl">{hubSections.entrepreneurFinance.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hubSections.entrepreneurFinance.items.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-secondary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center justify-between gap-2">
                <span>{hubSections.digitalBanking.title}</span>
                <Button asChild variant="outline" size="sm">
                  <Link to="/digital-literacy">Open Page</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hubSections.digitalBanking.items.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-accent" />
                  <span>{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-lg mb-12 max-w-4xl mx-auto" id="financial-tools">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Gamified Learning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!quizCompleted ? (
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Quizzes: Question {currentQuizIndex + 1} of {quizQuestions.length}
                  </p>
                  <h3 className="font-semibold text-foreground">{currentQuestion.question}</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedOption(option)}
                      className={`text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                        selectedOption === option
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <Button variant="hero" onClick={submitQuizAnswer} disabled={!selectedOption}>
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-xl border border-success/30 bg-success/10 p-4">
                  <p className="font-semibold text-success">
                    Quiz completed: {quizScore} / {quizQuestions.length}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" /> Badges
                    </p>
                    <p className="text-foreground font-semibold">Keep completing lessons to unlock more badges.</p>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Gift className="h-4 w-4 text-accent" /> Rewards
                    </p>
                    <p className="text-foreground font-semibold">Current reward tier: {rewardTier}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={resetQuiz}>Retry Quiz</Button>
              </div>
            )}
          </CardContent>
        </Card>

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
