import type { UserProfile, Attempt, UserProgress } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'user-001',
  name: 'Alex Chen',
  email: 'student@olympiad.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  role: 'student',
  goals: ['Qualify for USAMO', 'Top 50 AIME Score', 'USAPhO Gold Medal'],
  level: 'Advanced',
  targetOlympiad: 'Math & Physics Olympiads',
  weeklyGoal: 15,
  preferredDifficulty: 'Hard',
  rating: 1895, // Elo rating
  created_at: '2026-01-15T08:00:00Z',
  onboardingCompleted: true,
};

export const ADMIN_USER_PROFILE: UserProfile = {
  id: 'admin-001',
  name: 'Dr. Sarah Vance',
  email: 'SJ@AI@olympiad@OS@olympiadOS@initiative',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  role: 'admin',
  goals: ['Curate USAMO Problem Archive', 'Manage Olympiad Contests'],
  level: 'National Qualifier',
  targetOlympiad: 'All Science & Math Olympiads',
  weeklyGoal: 25,
  preferredDifficulty: 'Olympiad',
  rating: 2450, // Master Elo
  created_at: '2025-09-01T08:00:00Z',
  onboardingCompleted: true,
};

export const INITIAL_ATTEMPTS: Attempt[] = [
  {
    id: 'att-1',
    user_id: 'user-001',
    problem_id: 'math-alg-01',
    started_at: '2026-08-19T10:15:00Z',
    completed_at: '2026-08-19T10:48:00Z',
    solved: true,
    time_taken: 1980,
    hints_used: 1,
    user_answer: 'f(x) = x and f(x) = -x',
    notes: 'Injective proof was key. Setting x=0 yielded linearity.',
  },
  {
    id: 'att-2',
    user_id: 'user-001',
    problem_id: 'math-nt-01',
    started_at: '2026-08-19T14:20:00Z',
    completed_at: '2026-08-19T14:38:00Z',
    solved: true,
    time_taken: 1080,
    hints_used: 0,
    user_answer: '1',
    notes: 'Euler totient phi(100) = 40. 2024 mod 40 = 24.',
  },
  {
    id: 'att-3',
    user_id: 'user-001',
    problem_id: 'math-geo-02',
    started_at: '2026-08-18T11:00:00Z',
    completed_at: '2026-08-18T11:22:00Z',
    solved: true,
    time_taken: 1320,
    hints_used: 0,
    user_answer: '65/16',
    notes: 'Used Heron formula to find Area=84, then R=abc/(4K).',
  },
];

export const INITIAL_USER_PROGRESS: UserProgress[] = [
  { topic: 'Algebra', subject: 'Mathematics', problems_attempted: 24, problems_solved: 19, accuracy: 79, average_time: 28 },
  { topic: 'Number Theory', subject: 'Mathematics', problems_attempted: 18, problems_solved: 15, accuracy: 83, average_time: 22 },
  { topic: 'Geometry', subject: 'Mathematics', problems_attempted: 20, problems_solved: 13, accuracy: 65, average_time: 35 },
  { topic: 'Combinatorics', subject: 'Mathematics', problems_attempted: 15, problems_solved: 11, accuracy: 73, average_time: 24 },
  { topic: 'Mechanics', subject: 'Physics', problems_attempted: 12, problems_solved: 9, accuracy: 75, average_time: 30 },
  { topic: 'Electromagnetism', subject: 'Physics', problems_attempted: 10, problems_solved: 7, accuracy: 70, average_time: 32 },
  { topic: 'Thermodynamics', subject: 'Physics', problems_attempted: 8, problems_solved: 5, accuracy: 62, average_time: 38 },
  { topic: 'Organic Chemistry', subject: 'Chemistry', problems_attempted: 10, problems_solved: 7, accuracy: 70, average_time: 25 },
  { topic: 'Physical Chemistry', subject: 'Chemistry', problems_attempted: 12, problems_solved: 10, accuracy: 83, average_time: 20 },
  { topic: 'Genetics & Evolution', subject: 'Biology', problems_attempted: 9, problems_solved: 7, accuracy: 77, average_time: 22 },
];
