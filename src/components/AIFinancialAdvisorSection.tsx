import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, Send, Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const formatINR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
};

const AIFinancialAdvisorSection = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("25000");
  const [businessExpenses, setBusinessExpenses] = useState("12000");
  const [savingsAmount, setSavingsAmount] = useState("3000");
  const [chatInput, setChatInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [lastAssistantReply, setLastAssistantReply] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I am your AI Financial Advisor. Share your goal and I will suggest savings, loan, and budget steps.",
    },
  ]);

  const income = Number(monthlyIncome) || 0;
  const expenses = Number(businessExpenses) || 0;
  const savings = Number(savingsAmount) || 0;

  const recommendation = useMemo(() => {
    const disposable = Math.max(0, income - expenses);
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    let savingsSuggestion = "Maintain current savings and increase by 5% each month.";
    if (savingsRate < 10) {
      savingsSuggestion = "Try to move at least 10% of monthly income to savings before spending.";
    } else if (savingsRate >= 20) {
      savingsSuggestion = "Great savings habit. Consider splitting savings between emergency fund and growth investments.";
    }

    let eligibilityLabel = "Low";
    let estimatedLoan = disposable * 6;
    if (disposable >= income * 0.2 && savingsRate >= 10) {
      eligibilityLabel = "Medium";
      estimatedLoan = disposable * 10;
    }
    if (disposable >= income * 0.3 && savingsRate >= 15) {
      eligibilityLabel = "High";
      estimatedLoan = disposable * 14;
    }

    const emergencyFundTarget = expenses * 3;
    const monthlyBusinessBudget = {
      operations: income * 0.45,
      savings: Math.max(income * 0.15, savings),
      growth: income * 0.2,
      buffer: income * 0.2,
    };

    return {
      disposable,
      savingsRate,
      savingsSuggestion,
      loanEligibility: eligibilityLabel,
      estimatedLoan,
      emergencyFundTarget,
      monthlyBusinessBudget,
    };
  }, [income, expenses, savings]);

  const generateResponse = (prompt: string) => {
    const query = prompt.toLowerCase();

    if (query.includes("apply") && query.includes("loan")) {
      return "To apply for a loan: First, check your eligibility and required amount. Second, collect documents like ID proof, address proof, and bank statements. Third, choose a partner bank or government scheme and submit the application. Fourth, complete verification and track approval status in the branch or app.";
    }

    if (query.includes("saving") || query.includes("save")) {
      return `${recommendation.savingsSuggestion} Current savings rate is ${recommendation.savingsRate.toFixed(1)}%.`;
    }

    if (query.includes("loan") || query.includes("eligibility")) {
      return `Loan eligibility estimate is ${recommendation.loanEligibility}. Approximate eligible amount is ${formatINR(recommendation.estimatedLoan)} based on your disposable monthly cash flow.`;
    }

    if (query.includes("budget") || query.includes("expense")) {
      return `Suggested monthly budget: Operations ${formatINR(recommendation.monthlyBusinessBudget.operations)}, Savings ${formatINR(recommendation.monthlyBusinessBudget.savings)}, Growth ${formatINR(recommendation.monthlyBusinessBudget.growth)}, Buffer ${formatINR(recommendation.monthlyBusinessBudget.buffer)}.`;
    }

    return `Based on your inputs, focus on improving savings consistency, keeping expenses predictable, and building an emergency fund target of ${formatINR(recommendation.emergencyFundTarget)}.`;
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const processUserQuery = (text: string, speakReply = false) => {
    const cleaned = text.trim();
    if (!cleaned) return;

    const reply = generateResponse(cleaned);
    const userMessage: ChatMessage = { role: "user", text: cleaned };
    const assistantMessage: ChatMessage = { role: "assistant", text: reply };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLastAssistantReply(reply);

    if (speakReply) {
      speakText(reply);
    }
  };

  const startVoiceChat = () => {
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      const fallback = "Voice input is not supported in this browser.";
      setMessages((prev) => [...prev, { role: "assistant", text: fallback }]);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      processUserQuery(transcript, true);
    };

    recognition.onerror = () => {
      setMessages((prev) => [...prev, { role: "assistant", text: "Could not capture voice clearly. Please try again." }]);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text) return;
    processUserQuery(text, false);
    setChatInput("");
  };

  return (
    <section className="py-24" id="financial-tools">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">AI Financial Advisor</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Personalized Financial Guidance
          </h2>
          <p className="text-muted-foreground text-lg">
            Purpose: Provide personalized financial guidance through an AI chatbot and recommendation engine.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Financial Recommendation Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Monthly income</label>
                  <Input
                    inputMode="numeric"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="Enter monthly income"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Business expenses</label>
                  <Input
                    inputMode="numeric"
                    value={businessExpenses}
                    onChange={(e) => setBusinessExpenses(e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="Enter business expenses"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Savings amount</label>
                <Input
                  inputMode="numeric"
                  value={savingsAmount}
                  onChange={(e) => setSavingsAmount(e.target.value.replace(/[^\d]/g, ""))}
                  placeholder="Enter savings amount"
                />
              </div>

              <div className="rounded-xl border border-border p-4 bg-card/50 space-y-3">
                <h3 className="font-semibold text-foreground">Output</h3>
                <p className="text-sm text-muted-foreground">
                  Savings suggestions: {recommendation.savingsSuggestion}
                </p>
                <p className="text-sm text-muted-foreground">
                  Loan eligibility estimate: {recommendation.loanEligibility} (approx. {formatINR(recommendation.estimatedLoan)})
                </p>
                <p className="text-sm text-muted-foreground">
                  Budget planning: Ops {formatINR(recommendation.monthlyBusinessBudget.operations)} | Savings {formatINR(recommendation.monthlyBusinessBudget.savings)} | Growth {formatINR(recommendation.monthlyBusinessBudget.growth)} | Buffer {formatINR(recommendation.monthlyBusinessBudget.buffer)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Bot className="h-5 w-5 text-secondary" /> Voice-Based Financial Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border p-3 bg-card/50">
                <p className="text-sm text-muted-foreground">
                  Ask questions using speech and get audio responses explaining finance concepts.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Example: "Tell me how to apply for a loan."
                </p>
              </div>
              <div className="h-72 overflow-auto rounded-xl border border-border p-4 bg-background space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={`${msg.role}-${index}`}
                    className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "assistant"
                        ? "bg-secondary/20 text-foreground"
                        : "ml-auto bg-primary/15 text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about savings, loans, or budget planning"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button type="button" variant="hero" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" onClick={startVoiceChat} disabled={isListening}>
                  <Mic className="h-4 w-4" />
                  {isListening ? "Listening..." : "Speak"}
                </Button>
                <Button type="button" variant="outline" onClick={() => speakText(lastAssistantReply)} disabled={!lastAssistantReply}>
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIFinancialAdvisorSection;