import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Subject, Difficulty } from '../types';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OnboardingPage: React.FC = () => {
  const { updateUser, navigate, addToast } = useApp();
  const [step, setStep] = useState(1);

  const [targetOlympiad, setTargetOlympiad] = useState('Math & Science Olympiads');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'National Qualifier'>('Advanced');
  const [weeklyGoal, setWeeklyGoal] = useState<number>(15);
  const [preferredDifficulty, setPreferredDifficulty] = useState<Difficulty>('Hard');

  const handleFinishOnboarding = () => {
    updateUser({
      targetOlympiad,
      level,
      weeklyGoal,
      preferredDifficulty,
      onboardingCompleted: true,
    });
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    addToast('Onboarding Complete!', 'Your personalized training dashboard is ready.', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-4">
          <span className="text-emerald-400 font-bold">Step {step} of 3</span>
          <span>Personalization Engine</span>
        </div>

        {/* STEP 1: WHAT ARE YOU PREPARING FOR? */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-zinc-100">What are you preparing for?</h1>
              <p className="text-xs text-zinc-400">Select your primary competition focus to tailor problem recommendations.</p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Math Olympiad', desc: 'AMC 12, AIME, USAMO, IMO proof preparation', val: 'Math Olympiad' },
                { title: 'Physics Olympiad', desc: 'F=ma, USAPhO, IPhO theoretical mechanics & E&M', val: 'Physics Olympiad' },
                { title: 'Chemistry Olympiad', desc: 'USNCO, IChO organic & physical chemistry', val: 'Chemistry Olympiad' },
                { title: 'Biology Olympiad', desc: 'USABO, IBO population genetics & biochemistry', val: 'Biology Olympiad' },
                { title: 'Multiple Olympiads', desc: 'Cross-disciplinary STEM competition preparation', val: 'Multiple Olympiads' },
              ].map(item => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setTargetOlympiad(item.val)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    targetOlympiad === item.val
                      ? 'bg-emerald-950/80 border-emerald-500 text-zinc-100 shadow-glow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-sm font-bold font-mono">{item.title}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: LEVEL & DIFFICULTY */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-zinc-100">Current Level & Target Difficulty</h1>
              <p className="text-xs text-zinc-400">Help us calibrate problem rating matching.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">Current Competitor Level</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Beginner', 'Intermediate', 'Advanced', 'National Qualifier'] as const).map(l => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLevel(l)}
                      className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                        level === l
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">Preferred Training Difficulty</label>
                <select
                  value={preferredDifficulty}
                  onChange={e => setPreferredDifficulty(e.target.value as Difficulty)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-emerald-500/60"
                >
                  <option value="Easy">Easy (Foundation building)</option>
                  <option value="Medium">Medium (AIME / USAPhO)</option>
                  <option value="Hard">Hard (USAMO / IPhO)</option>
                  <option value="Olympiad">Olympiad (IMO Finals)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: WEEKLY PRACTICE GOAL */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-zinc-100">Weekly Goal & Commitment</h1>
              <p className="text-xs text-zinc-400">Deliberate practice requires consistent problem solving.</p>
            </div>

            <div className="space-y-3">
              {[
                { count: 10, label: '10 Problems / Week', desc: '1-2 problems daily for steady improvement' },
                { count: 15, label: '15 Problems / Week (Recommended)', desc: '2-3 problems daily for serious competition prep' },
                { count: 25, label: '25 Problems / Week', desc: 'Intensive training for national finals' },
              ].map(g => (
                <button
                  key={g.count}
                  type="button"
                  onClick={() => setWeeklyGoal(g.count)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    weeklyGoal === g.count
                      ? 'bg-emerald-950/80 border-emerald-500 text-zinc-100 shadow-glow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-sm font-bold font-mono text-emerald-400">{g.label}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{g.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-glow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Launch OlympiadOS Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
