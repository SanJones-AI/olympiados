import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, Attempt, PracticeSession, ToastMessage, Problem, ProblemInput, Contest, ContestInput, Subject, Difficulty, UserRole, ThemeMode, GeneratedStudyPlan } from '../types';
import { INITIAL_USER_PROFILE } from '../data/sampleUser';
import { adminService } from '../services/adminService';
import { authService } from '../services/authService';
import { PROBLEMS_DATA } from '../data/problems';

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  user: UserProfile;
  isAuthenticated: boolean;
  updateUser: (updates: Partial<UserProfile>) => void;
  loginUser: (email: string, password: string, role: UserRole) => boolean;
  signupUser: (name: string, email: string, password: string, role: UserRole, targetOlympiad?: string) => boolean;
  logoutUser: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  brightness: number;
  setBrightness: (level: number) => void;
  problems: Problem[];
  addProblem: (input: ProblemInput) => void;
  updateProblem: (id: string, input: Partial<ProblemInput>) => void;
  deleteProblem: (id: string) => void;
  contests: Contest[];
  addContest: (input: ContestInput) => void;
  updateContest: (id: string, input: Partial<ContestInput>) => void;
  deleteContest: (id: string) => void;
  attempts: Attempt[];
  bookmarks: string[];
  toggleBookmark: (problemId: string) => void;
  isBookmarked: (problemId: string) => boolean;
  solveProblem: (problemId: string, answer: string, timeTaken: number, hintsUsed: number, notes?: string) => boolean;
  getProblemAttempt: (problemId: string) => Attempt | undefined;
  activeSession: PracticeSession | null;
  startPracticeSession: (subject: Subject | 'All', difficulty: Difficulty | 'Mixed', count: number, timeLimitMinutes: number) => void;
  submitSessionAnswer: (problemId: string, answer: string, timeTaken: number) => void;
  finishPracticeSession: () => PracticeSession | null;
  studyPlan: GeneratedStudyPlan | null;
  generateStudyPlan: (olympiads: string[], dailyReminders: boolean) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetAllProgress: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getNormalizedPath = (): string => {
    let raw = window.location.pathname.replace(/^\/olympiados/, '');
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      raw = window.location.hash.replace(/^#/, '');
    }
    if (!raw || raw === '/' || raw === '/index.html') {
      return '/';
    }
    return raw;
  };

  const [currentPath, setCurrentPath] = useState<string>(() => getNormalizedPath());

  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    return localStorage.getItem('olympiados_session');
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('olympiados_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const isAuthenticated = Boolean(sessionToken && user && user.id);

  // Theme & Brightness state
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('olympiados_theme');
    return (saved as ThemeMode) || 'light';
  });

  const [brightness, setBrightnessState] = useState<number>(() => {
    const saved = localStorage.getItem('olympiados_brightness');
    return saved ? Number(saved) : 100;
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('olympiados_theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const setBrightness = (level: number) => {
    const clamped = Math.min(130, Math.max(70, level));
    setBrightnessState(clamped);
    localStorage.setItem('olympiados_brightness', clamped.toString());
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    root.style.setProperty('--app-brightness', `${brightness}%`);
  }, [theme, brightness]);

  const [problems, setProblems] = useState<Problem[]>(() => adminService.getProblems());
  const [contests, setContests] = useState<Contest[]>(() => adminService.getContests());

  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const saved = localStorage.getItem('olympiados_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('olympiados_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSession, setActiveSession] = useState<PracticeSession | null>(() => {
    const saved = localStorage.getItem('olympiados_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [studyPlan, setStudyPlan] = useState<GeneratedStudyPlan | null>(() => {
    const saved = localStorage.getItem('olympiados_study_plan');
    return saved ? JSON.parse(saved) : null;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('olympiados_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('olympiados_attempts', JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem('olympiados_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (studyPlan) {
      localStorage.setItem('olympiados_study_plan', JSON.stringify(studyPlan));
    } else {
      localStorage.removeItem('olympiados_study_plan');
    }
  }, [studyPlan]);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const loginUser = (email: string, password: string, role: UserRole): boolean => {
    const res = authService.login(email, password, role);
    if (res.success && res.user) {
      const token = `token-${Date.now()}`;
      setSessionToken(token);
      localStorage.setItem('olympiados_session', token);
      setUser(res.user);
      setAttempts([]);
      setStudyPlan(null);
      addToast('Authentication Success', `Welcome back, ${res.user.name}!`, 'success');
      return true;
    } else {
      addToast('Authentication Error', res.error || 'Invalid credentials.', 'error');
      return false;
    }
  };

  const signupUser = (name: string, email: string, password: string, role: UserRole, targetOlympiad?: string): boolean => {
    const res = authService.signup(name, email, password, role);
    if (res.success && res.user) {
      const token = `token-${Date.now()}`;
      setSessionToken(token);
      localStorage.setItem('olympiados_session', token);

      const registeredUser: UserProfile = {
        ...res.user,
        targetOlympiad: targetOlympiad || res.user.targetOlympiad,
      };

      setUser(registeredUser);
      setAttempts([]);
      setStudyPlan(null);
      addToast('Account Created!', `Welcome to OlympiadOS, ${name}!`, 'success');
      return true;
    } else {
      addToast('Registration Error', res.error || 'Failed to create account.', 'error');
      return false;
    }
  };

  const logoutUser = () => {
    setSessionToken(null);
    localStorage.removeItem('olympiados_session');
    setUser(INITIAL_USER_PROFILE);
    setAttempts([]);
    setStudyPlan(null);
    addToast('Signed Out', 'You have been signed out.', 'info');
    navigate('/login');
  };

  const generateStudyPlan = (olympiads: string[], dailyReminders: boolean) => {
    const plan: GeneratedStudyPlan = {
      id: `plan-${Date.now()}`,
      olympiads,
      dailyReminders,
      created_at: new Date().toISOString(),
      weeklySchedule: [
        { day: 'Monday', focus: 'Algebra & Inequalities', problemIds: ['math-alg-01', 'math-alg-02'] },
        { day: 'Tuesday', focus: 'Classical Mechanics & Orbits', problemIds: ['phys-mech-01', 'phys-mech-02'] },
        { day: 'Wednesday', focus: 'Modular Congruences', problemIds: ['math-nt-01', 'math-nt-02'] },
        { day: 'Thursday', focus: 'Thermodynamics & Organic Mechanisms', problemIds: ['chem-org-01', 'chem-phys-01'] },
        { day: 'Friday', focus: 'Euclidean Geometry & Cyclic Quads', problemIds: ['math-geo-01', 'math-geo-02'] },
        { day: 'Saturday', focus: 'Population Genetics & Kinetics', problemIds: ['bio-gen-01', 'bio-cell-01'] },
        { day: 'Sunday', focus: 'Weekly Review & Timed Practice Sprint', problemIds: ['math-comb-01', 'math-comb-02'] },
      ],
    };
    setStudyPlan(plan);
    addToast('Study Plan Generated!', `${olympiads.join(', ')} schedule created.`, 'success');
  };

  // CRUD for Problems
  const addProblem = (input: ProblemInput) => {
    const created = adminService.addProblem(input);
    setProblems(prev => [created, ...prev]);
    addToast('Problem Created', `"${created.title}" added to library.`, 'success');
  };

  const updateProblem = (id: string, input: Partial<ProblemInput>) => {
    const updated = adminService.updateProblem(id, input);
    if (updated) {
      setProblems(prev => prev.map(p => (p.id === id ? updated : p)));
      addToast('Problem Updated', `"${updated.title}" updated.`, 'success');
    }
  };

  const deleteProblem = (id: string) => {
    adminService.deleteProblem(id);
    setProblems(prev => prev.filter(p => p.id !== id));
    addToast('Problem Deleted', 'Problem removed.', 'info');
  };

  // CRUD for Contests
  const addContest = (input: ContestInput) => {
    const created = adminService.addContest(input);
    setContests(prev => [created, ...prev]);
    addToast('Contest Created', `"${created.title}" scheduled.`, 'success');
  };

  const updateContest = (id: string, input: Partial<ContestInput>) => {
    const updated = adminService.updateContest(id, input);
    if (updated) {
      setContests(prev => prev.map(c => (c.id === id ? updated : c)));
      addToast('Contest Updated', `"${updated.title}" updated.`, 'success');
    }
  };

  const deleteContest = (id: string) => {
    adminService.deleteContest(id);
    setContests(prev => prev.filter(c => c.id !== id));
    addToast('Contest Deleted', 'Contest removed.', 'info');
  };

  const toggleBookmark = (problemId: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(problemId);
      const updated = exists ? prev.filter(id => id !== problemId) : [...prev, problemId];
      addToast(
        exists ? 'Bookmark Removed' : 'Problem Saved',
        exists ? 'Problem removed.' : 'Problem saved.',
        exists ? 'info' : 'success'
      );
      return updated;
    });
  };

  const isBookmarked = (problemId: string) => bookmarks.includes(problemId);

  const getProblemAttempt = (problemId: string) => {
    return attempts.find(a => a.problem_id === problemId);
  };

  const solveProblem = (problemId: string, answer: string, timeTaken: number, hintsUsed: number, notes?: string): boolean => {
    const prob = problems.find(p => p.id === problemId);
    if (!prob) return false;

    let isCorrect = false;
    if (prob.numericalAnswer) {
      const cleanUser = answer.trim().toLowerCase();
      const cleanExpected = prob.numericalAnswer.trim().toLowerCase();
      if (cleanUser === cleanExpected) {
        isCorrect = true;
      } else if (!isNaN(Number(cleanUser)) && !isNaN(Number(cleanExpected))) {
        isCorrect = Math.abs(Number(cleanUser) - Number(cleanExpected)) < 0.05;
      } else if (cleanUser.includes(cleanExpected) || cleanExpected.includes(cleanUser)) {
        isCorrect = true;
      }
    } else {
      isCorrect = answer.trim().length > 3;
    }

    const newAttempt: Attempt = {
      id: `att-${Date.now()}`,
      user_id: user.id,
      problem_id: problemId,
      started_at: new Date(Date.now() - timeTaken * 1000).toISOString(),
      completed_at: new Date().toISOString(),
      solved: isCorrect,
      time_taken: timeTaken,
      hints_used: hintsUsed,
      user_answer: answer,
      notes: notes,
    };

    setAttempts(prev => [newAttempt, ...prev.filter(a => a.problem_id !== problemId)]);

    if (isCorrect) {
      const ratingGain = prob.difficulty === 'Olympiad' ? 25 : prob.difficulty === 'Very Hard' ? 20 : 15;
      setUser(prev => ({ ...prev, rating: prev.rating + ratingGain }));
      addToast('Correct Solution!', `Great job! +${ratingGain} ELO points added.`, 'success');
    } else {
      addToast('Attempt Logged', 'Keep practicing! Review the solution step-by-step.', 'warning');
    }

    return isCorrect;
  };

  const startPracticeSession = (subject: Subject | 'All', difficulty: Difficulty | 'Mixed', count: number, timeLimitMinutes: number) => {
    let candidates = [...problems];
    if (subject !== 'All') {
      candidates = candidates.filter(p => p.subject === subject);
    }
    if (difficulty !== 'Mixed') {
      candidates = candidates.filter(p => p.difficulty === difficulty);
    }
    const selected = candidates.sort(() => 0.5 - Math.random()).slice(0, count);
    const selectedIds = selected.map(p => p.id);

    const newSession: PracticeSession = {
      id: `session-${Date.now()}`,
      user_id: user.id,
      subject,
      difficulty,
      problem_ids: selectedIds,
      started_at: new Date().toISOString(),
      time_limit_minutes: timeLimitMinutes,
      answers: {},
    };

    setActiveSession(newSession);
    addToast('Training Session Started', `${selectedIds.length} problems loaded. Good luck!`, 'info');
    navigate('/practice');
  };

  const submitSessionAnswer = (problemId: string, answer: string, timeTaken: number) => {
    if (!activeSession) return;
    const prob = problems.find(p => p.id === problemId);
    let solved = false;
    if (prob && prob.numericalAnswer) {
      const cleanUser = answer.trim().toLowerCase();
      const cleanExpected = prob.numericalAnswer.trim().toLowerCase();
      solved = cleanUser === cleanExpected || (cleanUser.length > 0 && cleanExpected.includes(cleanUser));
    } else {
      solved = answer.trim().length > 2;
    }

    setActiveSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [problemId]: {
            solved,
            user_answer: answer,
            time_taken: timeTaken,
          }
        }
      };
    });
  };

  const finishPracticeSession = () => {
    if (!activeSession) return null;
    const total = activeSession.problem_ids.length;
    const solvedCount = Object.values(activeSession.answers).filter(a => a.solved).length;
    const scorePct = Math.round((solvedCount / total) * 100);

    const completed: PracticeSession = {
      ...activeSession,
      completed_at: new Date().toISOString(),
      score: scorePct,
    };

    setActiveSession(null);
    addToast('Session Completed!', `You scored ${solvedCount}/${total} (${scorePct}% accuracy).`, 'success');
    return completed;
  };

  const resetAllProgress = () => {
    setSessionToken(null);
    localStorage.removeItem('olympiados_session');
    setUser(INITIAL_USER_PROFILE);
    setAttempts([]);
    setBookmarks([]);
    setActiveSession(null);
    setStudyPlan(null);
    setProblems(PROBLEMS_DATA);
    setContests(adminService.getContests());
    localStorage.clear();
    addToast('Account Reset', 'Workspace cleared.', 'info');
    navigate('/login');
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        user,
        isAuthenticated,
        updateUser,
        loginUser,
        signupUser,
        logoutUser,
        theme,
        setTheme,
        toggleTheme,
        brightness,
        setBrightness,
        problems,
        addProblem,
        updateProblem,
        deleteProblem,
        contests,
        addContest,
        updateContest,
        deleteContest,
        attempts,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        solveProblem,
        getProblemAttempt,
        activeSession,
        startPracticeSession,
        submitSessionAnswer,
        finishPracticeSession,
        studyPlan,
        generateStudyPlan,
        toasts,
        addToast,
        removeToast,
        resetAllProgress,
        commandPaletteOpen,
        setCommandPaletteOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
