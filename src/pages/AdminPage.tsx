import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { adminService } from '../services/adminService';
import type { Problem, ProblemInput, Contest, ContestInput, Subject, Difficulty } from '../types';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import {
  Shield, Plus, Search, Edit3, Trash2, BookOpen, Trophy, Users, BarChart3, CheckCircle2, Eye, X, Save, Sparkles, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminPage: React.FC = () => {
  const {
    user,
    navigate,
    problems,
    addProblem,
    updateProblem,
    deleteProblem,
    contests,
    addContest,
    updateContest,
    deleteContest,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'problems' | 'contests' | 'students'>('problems');

  // Search & Filter state for problem manager
  const [probSearch, setProbSearch] = useState('');
  const [probSubject, setProbSubject] = useState<Subject | 'All'>('All');

  // Modal State: Problem
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);
  const [problemForm, setProblemForm] = useState<ProblemInput>({
    title: '',
    statement: '',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Medium',
    source: '2026 Invitational Problem',
    estimated_time: 25,
    solution: '',
    hints: [''],
    numericalAnswer: '',
  });

  // Modal State: Contest
  const [isContestModalOpen, setIsContestModalOpen] = useState(false);
  const [editingContestId, setEditingContestId] = useState<string | null>(null);
  const [contestForm, setContestForm] = useState<ContestInput>({
    title: '',
    organizer: 'OlympiadOS Academic Council',
    description: '',
    subject: 'Mathematics',
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 86400000).toISOString(),
    duration_minutes: 180,
    problem_ids: ['math-alg-01', 'math-nt-01'],
    total_points: 100,
    status: 'upcoming',
  });

  const students = adminService.getStudents();

  // If user is not admin, redirect or show access restricted
  if (user.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <Shield className="w-12 h-12 text-amber-400 mx-auto" />
        <h1 className="text-2xl font-bold text-zinc-100">Administrator Access Required</h1>
        <p className="text-xs text-zinc-400">
          You are currently logged in with a Student account. Please log in using Admin credentials (`admin@olympiad.edu`) to access the backend portal.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs"
        >
          Go to Role Login Page
        </button>
      </div>
    );
  }

  // Handle Problem Save (Create or Update)
  const handleSaveProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemForm.title.trim() || !problemForm.statement.trim()) {
      addToast('Validation Error', 'Problem Title and Statement are required.', 'warning');
      return;
    }

    if (editingProblemId) {
      updateProblem(editingProblemId, problemForm);
    } else {
      addProblem(problemForm);
    }

    setIsProblemModalOpen(false);
    setEditingProblemId(null);
  };

  const handleOpenEditProblem = (p: Problem) => {
    setEditingProblemId(p.id);
    setProblemForm({
      title: p.title,
      statement: p.statement,
      subject: p.subject,
      topic: p.topic,
      difficulty: p.difficulty,
      source: p.source,
      estimated_time: p.estimated_time,
      solution: p.solution,
      hints: p.hints.length > 0 ? p.hints : [''],
      numericalAnswer: p.numericalAnswer || '',
    });
    setIsProblemModalOpen(true);
  };

  // Handle Contest Save (Create or Update)
  const handleSaveContest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contestForm.title.trim()) {
      addToast('Validation Error', 'Contest Title is required.', 'warning');
      return;
    }

    if (editingContestId) {
      updateContest(editingContestId, contestForm);
    } else {
      addContest(contestForm);
    }

    setIsContestModalOpen(false);
    setEditingContestId(null);
  };

  const handleOpenEditContest = (c: Contest) => {
    setEditingContestId(c.id);
    setContestForm({
      title: c.title,
      organizer: c.organizer,
      description: c.description,
      subject: c.subject,
      start_time: c.start_time,
      end_time: c.end_time,
      duration_minutes: c.duration_minutes,
      problem_ids: c.problem_ids,
      total_points: c.total_points,
      status: c.status,
    });
    setIsContestModalOpen(true);
  };

  const filteredProblems = problems.filter(p => {
    if (probSubject !== 'All' && p.subject !== probSubject) return false;
    if (probSearch) {
      const q = probSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q) || p.source.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-mono text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>ADMINISTRATOR BACKEND MANAGEMENT PORTAL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-100">Platform Command Center</h1>
          <p className="text-sm text-zinc-400 font-mono">
            Manage Olympiad problems, schedule official contests, inspect student rosters, and monitor system health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProblemId(null);
              setProblemForm({
                title: '',
                statement: '',
                subject: 'Mathematics',
                topic: 'Algebra',
                difficulty: 'Medium',
                source: '2026 Invitational Problem',
                estimated_time: 25,
                solution: '',
                hints: [''],
                numericalAnswer: '',
              });
              setIsProblemModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-all shadow-glow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Problem
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 overflow-x-auto">
        {[
          { id: 'problems', label: `Problem Manager (${problems.length})`, icon: BookOpen },
          { id: 'contests', label: `Contests (${contests.length})`, icon: Trophy },
          { id: 'students', label: `Student Roster (${students.length})`, icon: Users },
          { id: 'overview', label: 'Platform Analytics', icon: BarChart3 },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-glow-sm'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROBLEM MANAGER (CRUD) */}
      {activeTab === 'problems' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search problem title, topic, or source..."
                value={probSearch}
                onChange={e => setProbSearch(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            <div className="flex items-center gap-2">
              {(['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setProbSubject(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    probSubject === s ? 'bg-emerald-500 text-zinc-950 font-bold' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Problems Table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase bg-zinc-950/60">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Topic</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {filteredProblems.map(p => (
                    <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-zinc-100">{p.title}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                          {p.subject}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-400">{p.topic}</td>
                      <td className="py-3 px-4 text-purple-400 font-bold">{p.difficulty}</td>
                      <td className="py-3 px-4 text-zinc-500">{p.source}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/problems/${p.id}`)}
                          className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-emerald-400 transition-colors"
                          title="Preview Workspace"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditProblem(p)}
                          className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-blue-400 transition-colors"
                          title="Edit Problem"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProblem(p.id)}
                          className="p-1.5 rounded bg-rose-950 text-rose-400 hover:bg-rose-900 transition-colors"
                          title="Delete Problem"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTEST MANAGER (CRUD) */}
      {activeTab === 'contests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-100">Virtual Olympiad Contests</h2>
            <button
              onClick={() => {
                setEditingContestId(null);
                setContestForm({
                  title: '',
                  organizer: 'OlympiadOS Academic Council',
                  description: '',
                  subject: 'Mathematics',
                  start_time: new Date().toISOString(),
                  end_time: new Date(Date.now() + 86400000).toISOString(),
                  duration_minutes: 180,
                  problem_ids: ['math-alg-01', 'math-nt-01'],
                  total_points: 100,
                  status: 'upcoming',
                });
                setIsContestModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Schedule New Contest
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contests.map(c => (
              <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold">{c.status}</span>
                  <span className="text-xs font-mono text-zinc-500">{c.subject} Track</span>
                </div>

                <h3 className="text-xl font-bold text-zinc-100">{c.title}</h3>
                <p className="text-xs text-zinc-400">{c.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs font-mono">
                  <span className="text-zinc-400">{c.duration_minutes} mins • {c.problem_ids.length} items</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditContest(c)}
                      className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteContest(c.id)}
                      className="px-3 py-1.5 rounded bg-rose-950 text-rose-400 hover:bg-rose-900 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT USER DIRECTORY */}
      {activeTab === 'students' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-100">Registered Student Competitors</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase bg-zinc-950/60">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Target Olympiad</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Elo Rating</th>
                  <th className="py-3 px-4">Weekly Goal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-2.5 font-bold text-zinc-100">
                      <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full object-cover border border-emerald-500/40" />
                      <span>{s.name}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400">{s.email}</td>
                    <td className="py-3 px-4 text-emerald-400">{s.targetOlympiad}</td>
                    <td className="py-3 px-4 text-zinc-300">{s.level}</td>
                    <td className="py-3 px-4 text-purple-400 font-bold">{s.rating} ELO</td>
                    <td className="py-3 px-4 text-zinc-400">{s.weeklyGoal} problems/wk</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PLATFORM STATS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
            <span className="text-xs font-mono text-zinc-400 uppercase">Total Problems</span>
            <div className="text-3xl font-bold font-mono text-emerald-400">{problems.length}</div>
          </div>
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
            <span className="text-xs font-mono text-zinc-400 uppercase">Active Contests</span>
            <div className="text-3xl font-bold font-mono text-blue-400">{contests.length}</div>
          </div>
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
            <span className="text-xs font-mono text-zinc-400 uppercase">Active Students</span>
            <div className="text-3xl font-bold font-mono text-purple-400">{students.length + 140}</div>
          </div>
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
            <span className="text-xs font-mono text-zinc-400 uppercase">System Status</span>
            <div className="text-xl font-bold font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> Operational
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PROBLEM */}
      {isProblemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-zinc-100 font-mono">
                {editingProblemId ? 'Edit Olympiad Problem' : 'Create New Olympiad Problem'}
              </h3>
              <button onClick={() => setIsProblemModalOpen(false)} className="text-zinc-400 hover:text-zinc-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProblem} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Problem Title</label>
                  <input
                    type="text"
                    required
                    value={problemForm.title}
                    onChange={e => setProblemForm({ ...problemForm, title: e.target.value })}
                    placeholder="e.g. Diophantine Equation in Two Variables"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Source Origin</label>
                  <input
                    type="text"
                    value={problemForm.source}
                    onChange={e => setProblemForm({ ...problemForm, source: e.target.value })}
                    placeholder="e.g. 2026 USAMO Problem 1"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Subject Track</label>
                  <select
                    value={problemForm.subject}
                    onChange={e => setProblemForm({ ...problemForm, subject: e.target.value as Subject })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Topic / Subfield</label>
                  <input
                    type="text"
                    value={problemForm.topic}
                    onChange={e => setProblemForm({ ...problemForm, topic: e.target.value })}
                    placeholder="Algebra, Number Theory, Mechanics..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Difficulty Rating</label>
                  <select
                    value={problemForm.difficulty}
                    onChange={e => setProblemForm({ ...problemForm, difficulty: e.target.value as Difficulty })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Very Hard">Very Hard</option>
                    <option value="Olympiad">Olympiad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Estimated Solve Time (Minutes)</label>
                  <input
                    type="number"
                    value={problemForm.estimated_time}
                    onChange={e => setProblemForm({ ...problemForm, estimated_time: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Problem Statement (LaTeX Supported $inline$ or $$display$$)</label>
                <textarea
                  rows={4}
                  required
                  value={problemForm.statement}
                  onChange={e => setProblemForm({ ...problemForm, statement: e.target.value })}
                  placeholder="Find all functions $f: \mathbb{R} \to \mathbb{R}$ such that..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              {/* Live Preview Box */}
              {problemForm.statement && (
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold">Live KaTeX Render Preview</span>
                  <div className="text-xs">
                    <LatexRenderer content={problemForm.statement} />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Official Step-by-Step Proof / Solution</label>
                <textarea
                  rows={4}
                  value={problemForm.solution}
                  onChange={e => setProblemForm({ ...problemForm, solution: e.target.value })}
                  placeholder="Detailed solution proof with LaTeX..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Exact Numerical / Text Answer (For automatic grading verification)</label>
                <input
                  type="text"
                  value={problemForm.numericalAnswer || ''}
                  onChange={e => setProblemForm({ ...problemForm, numericalAnswer: e.target.value })}
                  placeholder="e.g. 24 or f(x) = x"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProblemModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors"
                >
                  Save Problem to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CONTEST */}
      {isContestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-zinc-100 font-mono">
                {editingContestId ? 'Edit Virtual Contest' : 'Schedule New Virtual Contest'}
              </h3>
              <button onClick={() => setIsContestModalOpen(false)} className="text-zinc-400 hover:text-zinc-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContest} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Contest Title</label>
                <input
                  type="text"
                  required
                  value={contestForm.title}
                  onChange={e => setContestForm({ ...contestForm, title: e.target.value })}
                  placeholder="e.g. AIME XV Invitational Simulation"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={contestForm.description}
                  onChange={e => setContestForm({ ...contestForm, description: e.target.value })}
                  placeholder="Comprehensive test matching AIME and USAMO speed requirements..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Subject Track</label>
                  <select
                    value={contestForm.subject}
                    onChange={e => setContestForm({ ...contestForm, subject: e.target.value as Subject })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Status</label>
                  <select
                    value={contestForm.status}
                    onChange={e => setContestForm({ ...contestForm, status: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Live Now (Active)</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsContestModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs transition-colors"
                >
                  Save Contest Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
