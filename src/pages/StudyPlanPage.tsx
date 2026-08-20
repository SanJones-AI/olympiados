import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudyPlanTarget } from '../types';
import { Calendar, Bell, Zap, CheckCircle2, ArrowRight, BookOpen, Clock, Target, Sparkles, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudyPlanPage: React.FC = () => {
  const { studyPlan, generateStudyPlan, navigate } = useApp();

  const [targets, setTargets] = useState<StudyPlanTarget[]>([
    { name: 'AMC 8', code: 'AMC8', iconName: '📐', selected: false },
    { name: 'AMC 10', code: 'AMC10', iconName: '📊', selected: true },
    { name: 'AMC 12', code: 'AMC12', iconName: '📈', selected: true },
    { name: 'AIME', code: 'AIME', iconName: '🧮', selected: true },
    { name: 'USAPhO', code: 'USAPHO', iconName: '⚛️', selected: false },
    { name: 'USABO', code: 'USABO', iconName: '🧬', selected: false },
    { name: 'USNCO', code: 'USNCO', iconName: '🧪', selected: false },
    { name: 'Science Bowl', code: 'SBOWL', iconName: '🔬', selected: false },
    { name: 'Science Bee', code: 'SBEE', iconName: '🐝', selected: false },
  ]);

  const [dailyReminders, setDailyReminders] = useState(true);

  const toggleTarget = (code: string) => {
    setTargets(prev =>
      prev.map(t => (t.code === code ? { ...t, selected: !t.selected } : t))
    );
  };

  const handleGenerate = () => {
    const selectedCodes = targets.filter(t => t.selected).map(t => t.name);
    if (selectedCodes.length === 0) {
      alert('Please select at least one Olympiad competition.');
      return;
    }

    generateStudyPlan(selectedCodes, dailyReminders);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
      {/* Title Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100">
          Study Plan Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
          Create a personalized study plan and track your daily goals
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: SELECT OLYMPIADS & DAILY REMINDERS */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-zinc-100">
            <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-600 dark:text-emerald-400 flex items-center justify-center text-xs">
              🎯
            </div>
            <h2>Select Olympiads</h2>
          </div>

          {/* Olympiads Selector Grid (Matching screenshot exact items) */}
          <div className="grid grid-cols-2 gap-3">
            {targets.map(t => (
              <button
                key={t.code}
                type="button"
                onClick={() => toggleTarget(t.code)}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all text-left ${
                  t.selected
                    ? 'bg-blue-50/90 dark:bg-zinc-800 border-blue-500/80 dark:border-emerald-500 text-blue-700 dark:text-emerald-400 shadow-xs'
                    : 'bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <span className="text-sm">{t.iconName}</span>
                <span className="truncate">{t.name}</span>
              </button>
            ))}
          </div>

          {/* Daily Reminders Toggle Card (Matching screenshot 2) */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-zinc-100">
                <Bell className="w-4 h-4 text-blue-600 dark:text-emerald-400" />
                <span>Daily Reminders</span>
              </div>
              <button
                type="button"
                onClick={() => setDailyReminders(!dailyReminders)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  dailyReminders ? 'bg-blue-600 dark:bg-emerald-500' : 'bg-slate-300 dark:bg-zinc-700'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white transition-transform block shadow-xs ${
                    dailyReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Get reminded at 9 AM and 6 PM to complete your daily goals
            </p>
          </div>

          {/* Primary CTA Button (Matching screenshot 2) */}
          <button
            onClick={handleGenerate}
            className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Generate Study Plan</span>
          </button>
        </div>

        {/* RIGHT COLUMN: EMPTY FRESH STATE OR GENERATED PLAN */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-8 sm:p-12 shadow-sm min-h-[440px] flex flex-col items-center justify-center text-center">
          {!studyPlan ? (
            /* EMPTY FRESH STATE MATCHING SCREENSHOT 1 */
            <div className="space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8" />
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">
                No Plan Generated Yet
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                Select your olympiads and time commitment, then generate your personalized study plan
              </p>
            </div>
          ) : (
            /* GENERATED PLAN STATE */
            <div className="w-full text-left space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-emerald-400 font-bold">
                    Active Study Plan
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                    Weekly Schedule ({studyPlan.olympiads.join(', ')})
                  </h2>
                </div>
                <button
                  onClick={() => navigate('/practice')}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  Start Today's Tasks <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {studyPlan.weeklySchedule.map(item => (
                  <div
                    key={item.day}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-zinc-100">{item.day}</div>
                      <div className="text-slate-500 dark:text-zinc-400 mt-0.5">{item.focus}</div>
                    </div>
                    <span className="font-mono text-blue-600 dark:text-emerald-400 font-bold">
                      {item.problemIds.length} Target Problems
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
