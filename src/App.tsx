import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
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

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RootRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
};

const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<RootRoute />} />
              <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/auth" element={<GuestOnlyRoute><Auth /></GuestOnlyRoute>} />
              <Route path="/login" element={<GuestOnlyRoute><Auth /></GuestOnlyRoute>} />
              <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
              <Route path="/financial-tools" element={<ProtectedRoute><FinancialTools /></ProtectedRoute>} />
              <Route path="/funding-support" element={<ProtectedRoute><FundingSupport /></ProtectedRoute>} />
              <Route path="/community" element={<ProtectedRoute><CommunityMentorship /></ProtectedRoute>} />
              <Route path="/success-stories" element={<ProtectedRoute><SuccessStories /></ProtectedRoute>} />
              <Route path="/digital-literacy" element={<ProtectedRoute><DigitalLiteracy /></ProtectedRoute>} />
              <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
              <Route path="/government-schemes" element={<ProtectedRoute><GovernmentSchemeFinder /></ProtectedRoute>} />
              <Route path="/micro-investments" element={<ProtectedRoute><MicroInvestment /></ProtectedRoute>} />
              <Route path="/credit-score-builder" element={<ProtectedRoute><CreditScoreBuilder /></ProtectedRoute>} />
              <Route path="/business-marketplace" element={<ProtectedRoute><BusinessMarketplace /></ProtectedRoute>} />
              <Route path="/business-idea-generator" element={<ProtectedRoute><BusinessIdeaGenerator /></ProtectedRoute>} />
              <Route path="/risk-alerts" element={<ProtectedRoute><RiskAlertSystem /></ProtectedRoute>} />
              <Route path="/emergency-support" element={<ProtectedRoute><EmergencySupportNetwork /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
