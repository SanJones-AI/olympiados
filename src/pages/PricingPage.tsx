import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Shield, Sparkles, Trophy, Users } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigate, addToast } = useApp();

  const handleSelectTier = (tier: string) => {
    addToast('Membership Tier Selected', `You selected the ${tier} plan. Your account is upgraded in demo mode.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>TRANSPARENT ACADEMIC MEMBERSHIP</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
          Invest in Your Problem-Solving Mastery
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          No aggressive upsells or gamified paywalls. Choose the tier that matches your competition goals.
        </p>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* FREE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">Free Tier</div>
            <div className="text-4xl font-extrabold text-zinc-100 font-mono">$0 <span className="text-xs font-normal text-zinc-500">/ forever</span></div>
            <p className="text-xs text-zinc-400 leading-relaxed">Basic access for students starting their Olympiad journey.</p>
            <ul className="space-y-3 pt-4 border-t border-zinc-800 text-xs text-zinc-300">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> 5 daily problem attempts</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Basic progress tracking</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> LaTeX math rendering</li>
              <li className="flex items-center gap-2.5 text-zinc-500"><Check className="w-4 h-4 text-zinc-600 shrink-0" /> Limited hint access</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectTier('Free')}
            className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold transition-colors"
          >
            Current Plan
          </button>
        </div>

        {/* PRO */}
        <div className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-emerald-500/60 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-zinc-950 font-mono font-bold text-[10px] uppercase tracking-widest">
            Most Popular For USAMO/IMO
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Pro Competitor
            </div>
            <div className="text-4xl font-extrabold text-zinc-100 font-mono">$12 <span className="text-xs font-normal text-zinc-500">/ month</span></div>
            <p className="text-xs text-zinc-400 leading-relaxed">Full training environment for serious Olympiad competitors.</p>
            <ul className="space-y-3 pt-4 border-t border-zinc-800 text-xs text-zinc-200">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited problem library access</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Personalized adaptive training plan</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Full step-by-step solution proofs</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Virtual Olympiad Contest mode</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Advanced performance analytics radar</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectTier('Pro')}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold transition-all shadow-glow-sm"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* COACH */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Coach & School
            </div>
            <div className="text-4xl font-extrabold text-zinc-100 font-mono">$39 <span className="text-xs font-normal text-zinc-500">/ month</span></div>
            <p className="text-xs text-zinc-400 leading-relaxed">Designed for teachers, coaches, and club leaders managing student teams.</p>
            <ul className="space-y-3 pt-4 border-t border-zinc-800 text-xs text-zinc-300">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Student team roster management</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Assign custom problem sets</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Group diagnostic analytics</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Custom contest generator</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectTier('Coach')}
            className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold transition-colors"
          >
            Select Coach Plan
          </button>
        </div>
      </div>
    </div>
  );
};
