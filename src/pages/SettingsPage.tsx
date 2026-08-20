import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, User, Save, RotateCcw, Check, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, resetAllProgress, addToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [targetOlympiad, setTargetOlympiad] = useState(user.targetOlympiad);
  const [weeklyGoal, setWeeklyGoal] = useState(user.weeklyGoal);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, targetOlympiad, weeklyGoal });
    addToast('Settings Saved', 'Profile preferences updated successfully.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-100">System Settings</h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">Manage account identity, targets, and data state.</p>
      </div>

      <form onSubmit={handleSaveProfile} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-400" /> Account Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
          <div>
            <label className="block uppercase text-zinc-400 mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          <div>
            <label className="block uppercase text-zinc-400 mb-1 font-semibold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          <div>
            <label className="block uppercase text-zinc-400 mb-1 font-semibold">Target Competition</label>
            <input
              type="text"
              value={targetOlympiad}
              onChange={e => setTargetOlympiad(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          <div>
            <label className="block uppercase text-zinc-400 mb-1 font-semibold">Weekly Goal (Problems)</label>
            <input
              type="number"
              value={weeklyGoal}
              onChange={e => setWeeklyGoal(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-emerald-500/60"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile Preferences
          </button>
        </div>
      </form>

      {/* Danger Zone: Reset Data */}
      <div className="bg-rose-950/30 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-rose-300 flex items-center gap-2">
          <RotateCcw className="w-5 h-5" /> Data Reset & Recovery
        </h2>
        <p className="text-xs text-rose-200/80 leading-relaxed">
          Reset all attempts, saved bookmarks, and custom practice sessions back to the default sample dataset.
        </p>

        <button
          onClick={resetAllProgress}
          className="px-5 py-2.5 rounded-xl bg-rose-950 border border-rose-500/50 hover:bg-rose-900 text-rose-300 font-mono text-xs font-bold transition-colors"
        >
          Reset Local Application Data
        </button>
      </div>
    </div>
  );
};
