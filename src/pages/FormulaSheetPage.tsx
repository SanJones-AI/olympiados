import React, { useState } from 'react';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import { FileText, Search, BookOpen } from 'lucide-react';

export const FormulaSheetPage: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<'All' | 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology'>('All');
  const [search, setSearch] = useState('');

  const formulas = [
    {
      subject: 'Mathematics',
      topic: 'Algebra',
      name: 'AM-GM-HM Inequality',
      latex: '$$\\frac{a_1 + a_2 + \\dots + a_n}{n} \\ge \\sqrt[n]{a_1 a_2 \\dots a_n} \\ge \\frac{n}{\\frac{1}{a_1} + \\frac{1}{a_2} + \\dots + \\frac{1}{a_n}}$$',
    },
    {
      subject: 'Mathematics',
      topic: 'Geometry',
      name: 'Ptolemy\'s Theorem',
      latex: 'For a cyclic quadrilateral $ABCD$:\n$$AC \\cdot BD = AB \\cdot CD + BC \\cdot AD$$',
    },
    {
      subject: 'Mathematics',
      topic: 'Number Theory',
      name: 'Chinese Remainder Theorem (CRT)',
      latex: 'For pairwise coprime $m_1, m_2, \\dots, m_k$, the system $x \\equiv a_i \\pmod{m_i}$ has a unique solution modulo $M = m_1 m_2 \\dots m_k$.',
    },
    {
      subject: 'Physics',
      topic: 'Mechanics',
      name: 'Kepler\'s Third Law',
      latex: '$$T^2 = \\frac{4\\pi^2}{G(M + m)} a^3$$',
    },
    {
      subject: 'Physics',
      topic: 'Electromagnetism',
      name: 'Maxwell\'s Equations (Differential Form)',
      latex: '$$\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}, \\quad \\nabla \\cdot \\vec{B} = 0$$\n$$\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}, \\quad \\nabla \\times \\vec{B} = \\mu_0 \\vec{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}$$',
    },
    {
      subject: 'Chemistry',
      topic: 'Thermodynamics',
      name: 'Gibbs Free Energy & Equilibrium',
      latex: '$$\\Delta G^\\circ = \\Delta H^\\circ - T \\Delta S^\\circ = -RT \\ln K_{eq}$$',
    },
    {
      subject: 'Biology',
      topic: 'Genetics',
      name: 'Hardy-Weinberg Equilibrium',
      latex: '$$p^2 + 2pq + q^2 = 1 \\quad \\text{and} \\quad p + q = 1$$',
    },
  ];

  const filtered = formulas.filter(f => {
    if (activeSubject !== 'All' && f.subject !== activeSubject) return false;
    if (search) {
      const q = search.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.topic.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in">
      <div className="border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-emerald-400 mb-1">
          <FileText className="w-4 h-4" />
          <span>AUTHENTIC OLYMPIAD FORMULA & THEOREM CHEAT SHEET</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100">
          Olympiad Formula Sheet
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search theorem or formula..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'] as const).map(s => (
            <button
              key={s}
              onClick={() => setActiveSubject(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                activeSubject === s
                  ? 'bg-blue-700 dark:bg-emerald-500 text-white dark:text-zinc-950'
                  : 'bg-slate-100 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(f => (
          <div
            key={f.name}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-emerald-400">
                {f.subject} • {f.topic}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">{f.name}</h3>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-sm">
              <LatexRenderer content={f.latex} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
