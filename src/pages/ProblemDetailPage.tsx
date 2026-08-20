import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import { WorkspaceTimer } from '../components/problem/WorkspaceTimer';
import {
  ArrowLeft, Bookmark, CheckCircle2, Lightbulb, Save, Send, Eye, Shield, Clock, HelpCircle, FileText, ChevronDown, ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProblemDetailPageProps {
  problemId: string;
}

export const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({ problemId }) => {
  const { navigate, isBookmarked, toggleBookmark, solveProblem, getProblemAttempt, addToast } = useApp();

  const problem = PROBLEMS_DATA.find(p => p.id === problemId) || PROBLEMS_DATA[0];
  const previousAttempt = getProblemAttempt(problem.id);

  const [activeTab, setActiveTab] = useState<'workspace' | 'notes' | 'solution'>('workspace');
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>(previousAttempt?.user_answer || '');
  const [personalNotes, setPersonalNotes] = useState<string>(previousAttempt?.notes || '');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(Boolean(previousAttempt?.solved));
  const [isSubmitted, setIsSubmitted] = useState<boolean>(Boolean(previousAttempt?.solved));

  const bookmarked = isBookmarked(problem.id);

  const handleRevealNextHint = () => {
    if (hintsRevealed < problem.hints.length) {
      setHintsRevealed(prev => prev + 1);
      addToast('Hint Unlocked', `Hint ${hintsRevealed + 1} revealed for this problem.`, 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) {
      addToast('Answer Required', 'Please enter your numerical or algebraic proof answer before submitting.', 'warning');
      return;
    }

    const solved = solveProblem(
      problem.id,
      userAnswer,
      timerSeconds || 300,
      hintsRevealed,
      personalNotes
    );

    setIsSubmitted(true);
    if (solved) {
      setShowSolution(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSaveNotes = () => {
    addToast('Notes Saved', 'Personal workspace notes saved to localStorage.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <button
          onClick={() => navigate('/problems')}
          className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Problem Library
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleBookmark(problem.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
              bookmarked
                ? 'bg-amber-950/80 text-amber-400 border-amber-500/40'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
            <span>{bookmarked ? 'Saved' : 'Save Problem'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT / MAIN WORKSPACE AREA (2 COLS) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-500/30">
                  {problem.subject}
                </span>
                <span className="text-xs font-mono text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
                  {problem.topic}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {problem.source}
                </span>
              </div>

              {previousAttempt?.solved && (
                <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved ({Math.round(previousAttempt.time_taken / 60)}m)
                </span>
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-zinc-100">{problem.title}</h1>

            {/* LaTeX Problem Text */}
            <div className="p-5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 text-sm md:text-base leading-relaxed">
              <LatexRenderer content={problem.statement} />
            </div>

            {/* Diagram figure placeholder if available */}
            {problem.figureUrl && (
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
                <div className="text-xs font-mono text-zinc-500 mb-2">Figure 1.1 Diagram</div>
                <img src={problem.figureUrl} alt="Problem Diagram" className="max-h-48 mx-auto rounded" />
              </div>
            )}
          </div>

          {/* Workspace Tabs: Submission / Hints / Notes */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('workspace')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    activeTab === 'workspace'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Solution Input & Proof
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    activeTab === 'notes'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Scratchpad & Notes
                </button>
              </div>

              {problem.hints.length > 0 && (
                <button
                  onClick={handleRevealNextHint}
                  disabled={hintsRevealed >= problem.hints.length}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-400 hover:bg-amber-900 text-xs font-mono transition-colors disabled:opacity-50"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>
                    Hint ({hintsRevealed}/{problem.hints.length})
                  </span>
                </button>
              )}
            </div>

            {/* Revealed Hints Section */}
            {hintsRevealed > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
                  Progressive Hints
                </div>
                {problem.hints.slice(0, hintsRevealed).map((hint, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 font-mono">
                    <strong className="text-amber-400">Hint {idx + 1}:</strong> <LatexRenderer content={hint} inline />
                  </div>
                ))}
              </div>
            )}

            {/* TAB 1: WORKSPACE SUBMISSION */}
            {activeTab === 'workspace' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Your Solution / Exact Answer input
                  </label>
                  <textarea
                    rows={4}
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="Enter your step-by-step mathematical proof, LaTeX expression (e.g. f(x) = x), or exact numerical answer..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs sm:text-sm text-zinc-100 font-mono placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                    Supports text, numerical values, or LaTeX notation ($inline$ or $$display$$).
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-glow-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Solution
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>{showSolution ? 'Hide Official Solution' : 'View Official Solution'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: SCRATCHPAD NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <textarea
                  rows={6}
                  value={personalNotes}
                  onChange={e => setPersonalNotes(e.target.value)}
                  placeholder="Record your scratchpad observations, substitution ideas, key lemmas, or test cases here..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs sm:text-sm text-zinc-100 font-mono placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60"
                />
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5 text-emerald-400" /> Save Notes
                </button>
              </div>
            )}

            {/* OFFICIAL STEP-BY-STEP PROOF / SOLUTION PANEL */}
            {showSolution && (
              <div className="pt-6 border-t border-zinc-800 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Official Step-by-Step Proof & Solution
                  </div>
                  {problem.numericalAnswer && (
                    <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/30">
                      Answer: {problem.numericalAnswer}
                    </span>
                  )}
                </div>

                <div className="p-5 rounded-xl bg-zinc-950 border border-emerald-500/30 text-sm leading-relaxed">
                  <LatexRenderer content={problem.solution} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR METADATA & TIMER (1 COL) */}
        <div className="space-y-6">
          {/* Timer Widget */}
          <WorkspaceTimer onTimeUpdate={sec => setTimerSeconds(sec)} />

          {/* Problem Metadata Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Problem Specifications
            </h3>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-500">Subject</span>
                <span className="text-zinc-200 font-bold">{problem.subject}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-500">Subtopic</span>
                <span className="text-zinc-200">{problem.topic}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-500">Difficulty</span>
                <span className="text-purple-400 font-bold">{problem.difficulty}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-500">Estimated Solve Time</span>
                <span className="text-zinc-300">{problem.estimated_time} minutes</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-500">Source Origin</span>
                <span className="text-emerald-400">{problem.source}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-zinc-500">Hints Available</span>
                <span className="text-amber-400">{problem.hints.length} progressive hints</span>
              </div>
            </div>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <Shield className="w-4 h-4" /> Academic Rigor Tip
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Olympiad solutions require rigorous proof steps. Try working out the full substitution or edge case bounds in your notes before checking the answer key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
