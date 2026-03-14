import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Learn from "./pages/Learn.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import FundingSupport from "./pages/FundingSupport.tsx";
import FinancialTools from "./pages/FinancialTools.tsx";
import CommunityMentorship from "./pages/CommunityMentorship.tsx";
import SuccessStories from "./pages/SuccessStories.tsx";
import DigitalLiteracy from "./pages/DigitalLiteracy.tsx";
import HelpSupport from "./pages/HelpSupport.tsx";
import NotFound from "./pages/NotFound.tsx";
import GovernmentSchemeFinder from "./pages/GovernmentSchemeFinder.tsx";
import MicroInvestment from "./pages/MicroInvestment.tsx";
import CreditScoreBuilder from "./pages/CreditScoreBuilder.tsx";
import BusinessMarketplace from "./pages/BusinessMarketplace.tsx";
import BusinessIdeaGenerator from "./pages/BusinessIdeaGenerator.tsx";
import RiskAlertSystem from "./pages/RiskAlertSystem.tsx";
import EmergencySupportNetwork from "./pages/EmergencySupportNetwork.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/financial-tools" element={<FinancialTools />} />
              <Route path="/funding-support" element={<FundingSupport />} />
              <Route path="/community" element={<CommunityMentorship />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/digital-literacy" element={<DigitalLiteracy />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="/government-schemes" element={<GovernmentSchemeFinder />} />
              <Route path="/micro-investments" element={<MicroInvestment />} />
              <Route path="/credit-score-builder" element={<CreditScoreBuilder />} />
              <Route path="/business-marketplace" element={<BusinessMarketplace />} />
              <Route path="/business-idea-generator" element={<BusinessIdeaGenerator />} />
              <Route path="/risk-alerts" element={<RiskAlertSystem />} />
              <Route path="/emergency-support" element={<EmergencySupportNetwork />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
