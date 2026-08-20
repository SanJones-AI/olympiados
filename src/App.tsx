import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SidebarLayout } from './components/layout/SidebarLayout';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastContainer } from './components/ui/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProblemsPage } from './pages/ProblemsPage';
import { ProblemDetailPage } from './pages/ProblemDetailPage';
import { PracticePage } from './pages/PracticePage';
import { TrainingPage } from './pages/TrainingPage';
import { ContestsPage } from './pages/ContestsPage';
import { ContestDetailPage } from './pages/ContestDetailPage';
import { PerformancePage } from './pages/PerformancePage';
import { ProfilePage } from './pages/ProfilePage';
import { OnboardingPage } from './pages/OnboardingPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { StudyPlanPage } from './pages/StudyPlanPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { FormulaSheetPage } from './pages/FormulaSheetPage';

const MainRouter: React.FC = () => {
  const { currentPath, isAuthenticated, user } = useApp();

  // Public Landing Page
  if (currentPath === '/') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
        <LandingPage />
        <CommandPalette />
        <ToastContainer />
      </div>
    );
  }

  // Authentication Gating: If not authenticated or on /login or /signup, display AuthPage
  if (!isAuthenticated || currentPath === '/login' || currentPath === '/signup') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
        <AuthPage />
        <CommandPalette />
        <ToastContainer />
      </div>
    );
  }

  // Authenticated Portal Routes inside SidebarLayout
  const renderCurrentPage = () => {
    if (currentPath === '/dashboard') return <DashboardPage />;
    if (currentPath === '/study-plan') return <StudyPlanPage />;
    if (currentPath === '/flashcards') return <FlashcardsPage />;
    if (currentPath === '/formula-sheet') return <FormulaSheetPage />;
    if (currentPath === '/problems') return <ProblemsPage />;
    if (currentPath.startsWith('/problems/')) {
      const problemId = currentPath.replace('/problems/', '');
      return <ProblemDetailPage problemId={problemId} />;
    }
    if (currentPath === '/practice') return <PracticePage />;
    if (currentPath === '/training') return <TrainingPage />;
    if (currentPath === '/contests') return <ContestsPage />;
    if (currentPath.startsWith('/contests/')) {
      const contestId = currentPath.replace('/contests/', '');
      return <ContestDetailPage contestId={contestId} />;
    }
    if (currentPath === '/performance') return <PerformancePage />;
    if (currentPath === '/profile') return <ProfilePage />;
    if (currentPath === '/onboarding') return <OnboardingPage />;
    if (currentPath === '/pricing') return <PricingPage />;
    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/settings') return <SettingsPage />;
    if (currentPath === '/admin') return <AdminPage />;

    // Role-based default redirect
    if (user.role === 'admin') return <AdminPage />;
    return <StudyPlanPage />;
  };

  return (
    <SidebarLayout>
      {renderCurrentPage()}
      <CommandPalette />
      <ToastContainer />
    </SidebarLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
