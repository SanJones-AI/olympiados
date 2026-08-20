import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, BookOpen, Layers, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>ACADEMIC MANIFESTO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
          The Philosophy of OlympiadOS
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Exceptional problem solving comes from deliberate practice with problems that are difficult enough to force new ways of thinking.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold">
            01
          </div>
          <h3 className="text-lg font-bold text-zinc-100">Depth Over Volume</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Solving 5 deep, proof-based Olympiad problems thoroughly yields infinitely more cognitive growth than rushing through 50 shallow multiple-choice drills.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono font-bold">
            02
          </div>
          <h3 className="text-lg font-bold text-zinc-100">Deliberate Practice</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            True mastery occurs at the edge of your comfort zone. We identify your specific weak subfields (e.g. Functional Equations) and provide targeted problem queues.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30 flex items-center justify-center font-mono font-bold">
            03
          </div>
          <h3 className="text-lg font-bold text-zinc-100">Understanding Over Memorization</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Olympiad mathematics and science cannot be solved with rote formulas. Every problem demands first-principles reasoning and structural insights.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold">
            04
          </div>
          <h3 className="text-lg font-bold text-zinc-100">Rigorously LaTeX Native</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Math and science notation must be clean, elegant, and unambiguous. We render all expressions in KaTeX formatted equations.
          </p>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-bold text-zinc-100">How OlympiadOS Compares</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 uppercase">
                <th className="py-3 px-4">Feature / Approach</th>
                <th className="py-3 px-4 text-zinc-400">Generic Learning App</th>
                <th className="py-3 px-4 text-emerald-400 font-bold">OlympiadOS Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              <tr>
                <td className="py-3 px-4 font-bold text-zinc-200">Target Audience</td>
                <td className="py-3 px-4 text-zinc-500">Elementary / High School general</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">USAMO, IMO, IPhO, IChO Competitors</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-zinc-200">Problem Style</td>
                <td className="py-3 px-4 text-zinc-500">Short multiple choice quiz</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Proof-based & multi-step LaTeX problems</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-zinc-200">Interface Aesthetic</td>
                <td className="py-3 px-4 text-zinc-500">Gamified, cartoons, XP points</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Minimal modern dark SaaS workspace</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-zinc-200">Math Renderer</td>
                <td className="py-3 px-4 text-zinc-500">Plain text or images</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Native KaTeX math engine</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
