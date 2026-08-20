import type { Problem, ProblemInput, Contest, ContestInput, UserProfile, Subject } from '../types';
import { PROBLEMS_DATA } from '../data/problems';
import { CONTESTS_DATA } from '../data/contests';
import { INITIAL_USER_PROFILE } from '../data/sampleUser';

export const adminService = {
  // Problems CRUD
  getProblems: (): Problem[] => {
    const saved = localStorage.getItem('olympiados_problems');
    return saved ? JSON.parse(saved) : PROBLEMS_DATA;
  },

  saveProblems: (problems: Problem[]): void => {
    localStorage.setItem('olympiados_problems', JSON.stringify(problems));
  },

  addProblem: (input: ProblemInput): Problem => {
    const problems = adminService.getProblems();
    const newId = `${input.subject.toLowerCase().slice(0, 4)}-custom-${Date.now().toString(36)}`;
    const newProblem: Problem = { ...input, id: newId };
    const updated = [newProblem, ...problems];
    adminService.saveProblems(updated);
    return newProblem;
  },

  updateProblem: (id: string, input: Partial<ProblemInput>): Problem | null => {
    const problems = adminService.getProblems();
    const idx = problems.findIndex(p => p.id === id);
    if (idx === -1) return null;

    const updatedProblem = { ...problems[idx], ...input };
    problems[idx] = updatedProblem;
    adminService.saveProblems(problems);
    return updatedProblem;
  },

  deleteProblem: (id: string): boolean => {
    const problems = adminService.getProblems();
    const filtered = problems.filter(p => p.id !== id);
    adminService.saveProblems(filtered);
    return true;
  },

  // Contests CRUD
  getContests: (): Contest[] => {
    const saved = localStorage.getItem('olympiados_contests');
    return saved ? JSON.parse(saved) : CONTESTS_DATA;
  },

  saveContests: (contests: Contest[]): void => {
    localStorage.setItem('olympiados_contests', JSON.stringify(contests));
  },

  addContest: (input: ContestInput): Contest => {
    const contests = adminService.getContests();
    const newId = `contest-${Date.now().toString(36)}`;
    const newContest: Contest = { ...input, id: newId, participant_count: 0 };
    const updated = [newContest, ...contests];
    adminService.saveContests(updated);
    return newContest;
  },

  updateContest: (id: string, input: Partial<ContestInput>): Contest | null => {
    const contests = adminService.getContests();
    const idx = contests.findIndex(c => c.id === id);
    if (idx === -1) return null;

    const updatedContest = { ...contests[idx], ...input };
    contests[idx] = updatedContest;
    adminService.saveContests(contests);
    return updatedContest;
  },

  deleteContest: (id: string): boolean => {
    const contests = adminService.getContests();
    const filtered = contests.filter(c => c.id !== id);
    adminService.saveContests(filtered);
    return true;
  },

  // Roster of Student Users
  getStudents: (): UserProfile[] => {
    const mockStudents: UserProfile[] = [
      INITIAL_USER_PROFILE,
      {
        id: 'user-002',
        name: 'Elena Rostova',
        email: 'elena.r@olympiad.edu',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
        role: 'student',
        goals: ['USAPhO Gold', 'IPhO Team'],
        level: 'National Qualifier',
        targetOlympiad: 'Physics Olympiad',
        weeklyGoal: 20,
        preferredDifficulty: 'Olympiad',
        rating: 2150,
        created_at: '2026-02-01T10:00:00Z',
        onboardingCompleted: true,
      },
      {
        id: 'user-003',
        name: 'David Park',
        email: 'david.p@olympiad.edu',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        role: 'student',
        goals: ['AIME 10+ Score', 'USNCO Finalist'],
        level: 'Intermediate',
        targetOlympiad: 'Math & Chemistry',
        weeklyGoal: 15,
        preferredDifficulty: 'Hard',
        rating: 1720,
        created_at: '2026-02-10T14:00:00Z',
        onboardingCompleted: true,
      },
      {
        id: 'user-004',
        name: 'Maya Patel',
        email: 'maya.patel@olympiad.edu',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
        role: 'student',
        goals: ['USABO Semifinalist', 'IBO Qualification'],
        level: 'Advanced',
        targetOlympiad: 'Biology Olympiad',
        weeklyGoal: 15,
        preferredDifficulty: 'Hard',
        rating: 1810,
        created_at: '2026-03-01T09:00:00Z',
        onboardingCompleted: true,
      },
    ];

    const saved = localStorage.getItem('olympiados_student_roster');
    return saved ? JSON.parse(saved) : mockStudents;
  },
};
