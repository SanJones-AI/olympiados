export type Subject = 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology';

export type MathTopic = 'Algebra' | 'Number Theory' | 'Geometry' | 'Combinatorics';
export type PhysicsTopic = 'Mechanics' | 'Electromagnetism' | 'Thermodynamics' | 'Quantum & Modern' | 'Optics & Waves';
export type ChemTopic = 'Organic Chemistry' | 'Physical Chemistry' | 'Inorganic Chemistry' | 'Thermodynamics' | 'Kinetics';
export type BioTopic = 'Genetics & Evolution' | 'Cell Biology & Biochemistry' | 'Plant Physiology' | 'Animal Physiology' | 'Ecology';

export type Topic = MathTopic | PhysicsTopic | ChemTopic | BioTopic | string;

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Olympiad';

export type UserRole = 'student' | 'admin';

export type ThemeMode = 'light' | 'dark';

export interface Problem {
  id: string;
  title: string;
  statement: string; // supports LaTeX formatted text ($inline$ and $$block$$)
  subject: Subject;
  topic: Topic;
  difficulty: Difficulty;
  source: string; // e.g. "2024 USAMO Problem 2", "2023 AIME I Problem 12"
  estimated_time: number; // in minutes
  solution: string; // step by step proof / solution with LaTeX
  hints: string[];
  numericalAnswer?: string; // numeric or short exact answer for verification
  formulaAnswer?: string;
  figureUrl?: string; // Optional diagram / figure indicator
}

export type ProblemInput = Omit<Problem, 'id'>;

export interface Attempt {
  id: string;
  user_id: string;
  problem_id: string;
  started_at: string;
  completed_at?: string;
  solved: boolean;
  time_taken: number; // in seconds
  hints_used: number;
  user_answer?: string;
  notes?: string;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  subject: Subject | 'All';
  topic?: string;
  difficulty: Difficulty | 'Mixed';
  problem_ids: string[];
  started_at: string;
  completed_at?: string;
  time_limit_minutes: number;
  answers: Record<string, {
    solved: boolean;
    user_answer: string;
    time_taken: number;
    flagged?: boolean;
  }>;
  score?: number;
}

export interface Contest {
  id: string;
  title: string;
  organizer: string;
  description: string;
  subject: Subject;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  problem_ids: string[];
  total_points: number;
  status: 'upcoming' | 'active' | 'completed';
  participant_count: number;
}

export type ContestInput = Omit<Contest, 'id' | 'participant_count'>;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  goals: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'National Qualifier';
  targetOlympiad: string;
  weeklyGoal: number;
  preferredDifficulty: Difficulty;
  rating: number;
  created_at: string;
  onboardingCompleted: boolean;
}

export interface UserProgress {
  topic: string;
  subject: Subject;
  problems_attempted: number;
  problems_solved: number;
  accuracy: number;
  average_time: number;
}

export interface ProblemFilter {
  search: string;
  subject: Subject | 'All';
  topic: string;
  difficulty: Difficulty | 'All';
  source: string;
  status: 'All' | 'Solved' | 'Unsolved' | 'Bookmarked';
  sortBy: 'difficulty-asc' | 'difficulty-desc' | 'time-asc' | 'newest';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface StudyPlanTarget {
  name: string;
  code: string;
  iconName: string;
  selected: boolean;
}

export interface GeneratedStudyPlan {
  id: string;
  olympiads: string[];
  dailyReminders: boolean;
  created_at: string;
  weeklySchedule: {
    day: string;
    focus: string;
    problemIds: string[];
  }[];
}
