import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { Subject, Difficulty, PracticeSession } from '../types';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import { Flame, Clock, ArrowRight, CheckCircle2, RotateCcw, AlertTriangle, Send, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticePage: React.FC = () => {
  const { activeSession, startPracticeSession, submitSessionAnswer, finishPracticeSession, navigate } = useApp();

  // Configurator form states
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'Mixed'>('Mixed');
  const [problemCount, setProblemCount] = useState<number>(5);
  const [timeLimit, setTimeLimit] = useState<number>(60);

  // Active Session states
  const [currentProbIdx, setCurrentProbIdx] = useState<number>(0);
  const [sessionUserAnswer, setSessionUserAnswer] = useState<string>('');
  const [completedReport, setCompletedReport] = useState<PracticeSession | null>(null);

  // Remaining time in seconds for active session
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  useEffect(() => {
    if (activeSession) {
      const limitSec = activeSession.time_limit_minutes * 60;
      const elapsed = Math.floor((Date.now() - new Date(activeSession.started_at).getTime()) / 1000);
      setSecondsRemaining(Math.max(0, limitSec - elapsed));
    }
  }, [activeSession]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activeSession && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeSession, secondsRemaining]);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    startPracticeSession(selectedSubject, selectedDifficulty, problemCount, timeLimit);
    setCurrentProbIdx(0);
    setSessionUserAnswer('');
    setCompletedReport(null);
  };

  const currentProblemId = activeSession?.problem_ids[currentProbIdx];
  const currentProblem = currentProblemId ? PROBLEMS_DATA.find(p => p.id === currentProblemId) : null;

  const handleSaveCurrentAnswer = () => {
    if (!activeSession || !currentProblemId) return;
    submitSessionAnswer(currentProblemId, sessionUserAnswer, 300);
  };

  const handleFinishSession = () => {
    handleSaveCurrentAnswer();
    const report = finishPracticeSession();
    setCompletedReport(report);
    if (report && (report.score || 0) >= 60) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // RENDER 1: SESSION REPORT (if finished)
  if (completedReport) {
    const solvedCount = Object.values(completedReport.answers).filter(a => a.solved).length;
    const totalCount = completedReport.problem_ids.length;

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-mono font-bold shadow-glow-sm">
            {completedReport.score}%
          </div>

          <h1 className="text-3xl font-extrabold text-zinc-100">Practice Session Complete!</h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            You solved <strong className="text-emerald-400 font-mono">{solvedCount} of {totalCount}</strong> problems correctly during this {completedReport.time_limit_minutes}-minute sprint.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4 border-t border-zinc-800 font-mono text-xs">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">Total Score</span>
              <span className="text-emerald-400 font-bold text-base">{completedReport.score}%</span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">Correct Solves</span>
              <span className="text-zinc-200 font-bold text-base">{solvedCount}/{totalCount}</span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">Subject Track</span>
              <span className="text-blue-400 font-bold text-base">{completedReport.subject}</span>
            </div>
          </div>

          <div className="pt-6 flex justify-center gap-4">
            <button
              onClick={() => setCompletedReport(null)}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors"
            >
              Configure Another Session
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 2: ACTIVE SESSION WORKSPACE
  if (activeSession && currentProblem) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Session Sticky Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl flex items-center justify-between flex-wrap gap-4 sticky top-20 z-30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-zinc-100 uppercase tracking-wider">
                Active Training Session ({activeSession.subject})
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                Problem {currentProbIdx + 1} of {activeSession.problem_ids.length}
              </div>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-zinc-100 font-bold text-sm">{formatCountdown(secondsRemaining)}</span>
            </div>

            <button
              onClick={handleFinishSession}
              className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold transition-colors"
            >
              Finish & Submit Session
            </button>
          </div>
        </div>

        {/* Problem Navigation Drawer Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {activeSession.problem_ids.map((id, idx) => {
            const hasAns = Boolean(activeSession.answers[id]);
            const isCurrent = idx === currentProbIdx;

            return (
              <button
                key={id}
                onClick={() => {
                  handleSaveCurrentAnswer();
                  setCurrentProbIdx(idx);
                  setSessionUserAnswer(activeSession.answers[id]?.user_answer || '');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-emerald-500 text-zinc-950 shadow-glow-sm'
                    : hasAns
                    ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>P{idx + 1}</span>
                {hasAns && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Active Problem Display Area */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-500/30">
                {currentProblem.subject}
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                {currentProblem.topic}
              </span>
            </div>
            <span className="text-xs font-mono text-purple-400 font-bold border border-purple-500/30 px-2 py-0.5 rounded">
              {currentProblem.difficulty}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100">{currentProblem.title}</h2>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm leading-relaxed">
            <LatexRenderer content={currentProblem.statement} />
          </div>

          {/* Answer Input */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono uppercase text-zinc-400">Your Answer / Proof</label>
            <input
              type="text"
              value={sessionUserAnswer}
              onChange={e => setSessionUserAnswer(e.target.value)}
              placeholder="Type your answer for this problem..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 font-mono placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          {/* Bottom Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <button
              disabled={currentProbIdx === 0}
              onClick={() => {
                handleSaveCurrentAnswer();
                setCurrentProbIdx(prev => prev - 1);
                setSessionUserAnswer(activeSession.answers[activeSession.problem_ids[currentProbIdx - 1]]?.user_answer || '');
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-300 text-xs font-mono transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={() => {
                handleSaveCurrentAnswer();
                if (currentProbIdx < activeSession.problem_ids.length - 1) {
                  setCurrentProbIdx(prev => prev + 1);
                  setSessionUserAnswer(activeSession.answers[activeSession.problem_ids[currentProbIdx + 1]]?.user_answer || '');
                } else {
                  handleFinishSession();
                }
              }}
              className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1"
            >
              <span>{currentProbIdx === activeSession.problem_ids.length - 1 ? 'Save & Finish' : 'Next Problem'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 3: PRACTICE SESSION CONFIGURATOR (default)
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Flame className="w-3.5 h-3.5" />
          <span>FOCUSED PRACTICE SESSION GENERATOR</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-100">Custom Training Session</h1>
        <p className="text-sm text-zinc-400">
          Configure a timed sprint tailored by subject, difficulty level, problem count, and time constraints.
        </p>
      </div>

      {/* Configurator Form */}
      <form onSubmit={handleCreateSession} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Subject */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-semibold">Subject Track</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value as any)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 font-mono focus:outline-none focus:border-emerald-500/60"
            >
              <option value="All">All Disciplines (Mixed)</option>
              <option value="Mathematics">Mathematics (USAMO/IMO)</option>
              <option value="Physics">Physics (USAPhO/IPhO)</option>
              <option value="Chemistry">Chemistry (USNCO/IChO)</option>
              <option value="Biology">Biology (USABO/IBO)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-semibold">Target Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value as any)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 font-mono focus:outline-none focus:border-emerald-500/60"
            >
              <option value="Mixed">Mixed Difficulty</option>
              <option value="Easy">Easy (Qualifier level)</option>
              <option value="Medium">Medium (AIME / USAPhO)</option>
              <option value="Hard">Hard (USAMO / IPhO)</option>
              <option value="Olympiad">Olympiad (IMO Finals)</option>
            </select>
          </div>

          {/* Problem Count */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-semibold">Problem Count</label>
            <select
              value={problemCount}
              onChange={e => setProblemCount(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 font-mono focus:outline-none focus:border-emerald-500/60"
            >
              <option value={3}>3 Problems (Quick 30m Sprint)</option>
              <option value={5}>5 Problems (Standard 60m Sprint)</option>
              <option value={8}>8 Problems (Deep 90m Training)</option>
            </select>
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-semibold">Time Limit (Minutes)</label>
            <select
              value={timeLimit}
              onChange={e => setTimeLimit(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 font-mono focus:outline-none focus:border-emerald-500/60"
            >
              <option value={30}>30 Minutes</option>
              <option value={60}>60 Minutes</option>
              <option value={90}>90 Minutes</option>
              <option value={120}>120 Minutes</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm sm:text-base transition-all shadow-glow-md flex items-center justify-center gap-2"
        >
          <Flame className="w-5 h-5" /> Generate & Start Training Session
        </button>
      </form>
    </div>
  );
};
