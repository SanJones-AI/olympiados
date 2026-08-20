import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CREDENTIALS } from '../services/authService';
import type { UserRole } from '../types';
import { Shield, User, ArrowRight, Lock, Key, Compass, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AuthPage: React.FC = () => {
  const { navigate, addToast, loginUser, signupUser } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState(''); // Email for student, Username for admin
  const [password, setPassword] = useState('');
  const [targetOlympiad, setTargetOlympiad] = useState('AMC 10 & AIME');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      addToast('Reset Link Dispatched', 'Password reset instructions have been sent.', 'info');
      setMode('signin');
      return;
    }

    if (mode === 'signup') {
      if (role === 'admin') {
        addToast('Admin Registration Disabled', 'Admin accounts cannot be created publicly.', 'error');
        return;
      }
      if (!name.trim() || !identity.trim()) {
        addToast('Validation Error', 'Full name and email are required.', 'warning');
        return;
      }

      const success = signupUser(name, identity, password, 'student', targetOlympiad);
      if (success) {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        navigate('/study-plan');
      }
      return;
    }

    // Sign In Mode
    const success = loginUser(identity, password, role);
    if (success) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      if (role === 'admin') navigate('/admin');
      else navigate('/study-plan');
    }
  };

  const handleDemoStudent = () => {
    setRole('student');
    setIdentity('student@olympiad.edu');
    setPassword('password');
    const success = loginUser('student@olympiad.edu', 'password', 'student');
    if (success) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      navigate('/study-plan');
    }
  };

  const handleDemoAdmin = () => {
    setRole('admin');
    setIdentity(ADMIN_CREDENTIALS.username);
    setPassword(ADMIN_CREDENTIALS.password);
    const success = loginUser(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password, 'admin');
    if (success) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        {/* Header Logo */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-700 dark:bg-zinc-900 border border-blue-600 dark:border-emerald-500/40 text-white dark:text-emerald-400 font-mono font-bold text-2xl flex items-center justify-center shadow-lg">
            Σ
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
            Olympiad<span className="text-blue-600 dark:text-emerald-400">OS</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-mono">
            Serious Practice for Math & Science Olympiads
          </p>
        </div>

        {/* Role Selector Tabs (Only enabled for Sign In) */}
        {mode === 'signin' && (
          <div className="bg-slate-200/80 dark:bg-zinc-900 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setIdentity('');
                setPassword('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'student'
                  ? 'bg-white dark:bg-zinc-800 text-blue-700 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-zinc-700'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <User className="w-4 h-4" /> Student Competitor
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setIdentity('');
                setPassword('');
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                role === 'admin'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <Shield className="w-4 h-4" /> Admin Portal
            </button>
          </div>
        )}

        {/* Card Container */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center justify-around border-b border-slate-200 dark:border-zinc-800 pb-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setRole('student');
              }}
              className={`font-bold transition-colors pb-1 border-b-2 ${
                mode === 'signin'
                  ? 'text-blue-600 dark:text-emerald-400 border-blue-600 dark:border-emerald-400'
                  : 'text-slate-400 dark:text-zinc-500 border-transparent hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setRole('student'); // Strictly student for signup
              }}
              className={`font-bold transition-colors pb-1 border-b-2 ${
                mode === 'signup'
                  ? 'text-blue-600 dark:text-emerald-400 border-blue-600 dark:border-emerald-400'
                  : 'text-slate-400 dark:text-zinc-500 border-transparent hover:text-slate-600'
              }`}
            >
              Create Student Account
            </button>
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className={`font-bold transition-colors pb-1 border-b-2 ${
                mode === 'forgot'
                  ? 'text-blue-600 dark:text-emerald-400 border-blue-600 dark:border-emerald-400'
                  : 'text-slate-400 dark:text-zinc-500 border-transparent hover:text-slate-600'
              }`}
            >
              Forgot Password
            </button>
          </div>

          {/* Quick Demo Auth Helper Buttons */}
          {mode === 'signin' && (
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 rounded-xl space-y-2">
              <div className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-center font-semibold">
                Quick Demo Authentication
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={handleDemoStudent}
                  className="py-2 px-3 rounded-lg bg-white dark:bg-zinc-900 border border-blue-200 dark:border-emerald-500/30 text-blue-700 dark:text-emerald-400 font-bold hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors text-center truncate shadow-xs"
                >
                  🚀 Demo Student
                </button>
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  className="py-2 px-3 rounded-lg bg-white dark:bg-zinc-900 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400 font-bold hover:bg-purple-50 dark:hover:bg-zinc-800 transition-colors text-center truncate shadow-xs"
                >
                  ⚙️ Demo Admin
                </button>
              </div>
            </div>
          )}

          {/* Admin Account Restriction Note during Signup */}
          {mode === 'signup' && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-300 font-mono flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Public registration is for Student Competitors only. Pre-configured admin credentials are required for Administrator Portal access.</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            {mode === 'signup' && (
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-emerald-500"
                />
              </div>
            )}

            {/* Email field for student, Username field for admin */}
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                {role === 'admin' && mode === 'signin' ? 'Username' : 'Email Address'}
              </label>
              <input
                type={role === 'admin' && mode === 'signin' ? 'text' : 'email'}
                required
                value={identity}
                onChange={e => setIdentity(e.target.value)}
                placeholder={
                  role === 'admin' && mode === 'signin'
                    ? 'SJ@AI@olympiad@OS@olympiadOS@initiative'
                    : 'student@olympiad.edu'
                }
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-emerald-500 font-mono text-[11px]"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={
                    role === 'admin' && mode === 'signin'
                      ? 'sj@1234567890987654321@qwertyuio@olympiados/\\/\\/\\'
                      : '••••••••••••'
                  }
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">Primary Target Olympiad</label>
                <select
                  value={targetOlympiad}
                  onChange={e => setTargetOlympiad(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 text-slate-900 dark:text-zinc-100 focus:outline-none"
                >
                  <option value="AMC 8 & AMC 10">AMC 8 & AMC 10</option>
                  <option value="AMC 12 & AIME">AMC 12 & AIME</option>
                  <option value="USAMO / IMO">USAMO / IMO</option>
                  <option value="USAPhO / IPhO">USAPhO / IPhO (Physics)</option>
                  <option value="USNCO / IChO">USNCO / IChO (Chemistry)</option>
                  <option value="USABO / IBO">USABO / IBO (Biology)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                role === 'admin'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-blue-700 dark:bg-emerald-500 hover:bg-blue-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950'
              }`}
            >
              <span>
                {mode === 'forgot'
                  ? 'Send Reset Link'
                  : mode === 'signup'
                  ? 'Create Student Account'
                  : `Sign In as ${role === 'admin' ? 'Administrator' : 'Student'}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono text-slate-400 dark:text-zinc-500">
          OlympiadOS Academic Practice Engine • Secure Session Access
        </div>
      </div>
    </div>
  );
};
