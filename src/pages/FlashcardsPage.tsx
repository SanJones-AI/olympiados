import React, { useState } from 'react';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import { Layers, RotateCw, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

export const FlashcardsPage: React.FC = () => {
  const [deck, setDeck] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Algebra',
      front: 'Cauchy-Schwarz Inequality',
      back: '$$\\left( \\sum_{i=1}^n a_i b_i \\right)^2 \\le \\left( \\sum_{i=1}^n a_i^2 \\right) \\left( \\sum_{i=1}^n b_i^2 \\right)$$\nEquality holds iff $a_i / b_i = c$ for all $i$.',
      mastered: false,
    },
    {
      id: 2,
      subject: 'Mathematics',
      topic: 'Number Theory',
      front: 'Euler\'s Totient Function $\\phi(n)$',
      back: '$$\\phi(n) = n \\prod_{p \\mid n} \\left( 1 - \\frac{1}{p} \\right)$$\nFor $\\gcd(a, n) = 1$, $a^{\\phi(n)} \\equiv 1 \\pmod n$.',
      mastered: false,
    },
    {
      id: 3,
      subject: 'Physics',
      topic: 'Mechanics',
      front: 'Beltrami Identity (Brachistochrone)',
      back: 'For functional $I = \\int L(y, y\') dx$ where $L$ lacks explicit $x$ dependence:\n$$L - y\' \\frac{\\partial L}{\\partial y\'} = C$$',
      mastered: false,
    },
    {
      id: 4,
      subject: 'Chemistry',
      topic: 'Physical Chemistry',
      front: 'Nernst Equation (Cell EMF)',
      back: '$$E = E^\\circ - \\frac{RT}{nF} \\ln Q = E^\\circ - \\frac{0.0592}{n} \\log_{10} Q$$\nat $T = 298\\text{ K}$.',
      mastered: false,
    },
    {
      id: 5,
      subject: 'Biology',
      topic: 'Cell Biochemistry',
      front: 'Michaelis-Menten Kinetics',
      back: '$$v_0 = \\frac{V_{max} [S]}{K_m + [S]}$$\n$K_m$ is the substrate concentration at which $v_0 = V_{max}/2$.',
      mastered: false,
    },
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = deck[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx(prev => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx(prev => (prev - 1 + deck.length) % deck.length);
  };

  const toggleMastered = () => {
    setDeck(prev => prev.map((c, i) => (i === currentIdx ? { ...c, mastered: !c.mastered } : c)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-emerald-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>INTERACTIVE OLYMPIAD MEMORIZATION ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100">
            Study Flashcards
          </h1>
        </div>

        <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
          Card {currentIdx + 1} of {deck.length}
        </span>
      </div>

      {/* Interactive Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[320px] bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 hover:border-blue-500/60 dark:hover:border-emerald-500/60 rounded-3xl p-8 sm:p-12 shadow-md flex flex-col justify-between cursor-pointer transition-all relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-emerald-400 border border-blue-200 dark:border-zinc-700">
            {card.subject} • {card.topic}
          </span>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5" /> Click to Flip
          </span>
        </div>

        <div className="my-8 text-center">
          {!isFlipped ? (
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
              <LatexRenderer content={card.front} />
            </div>
          ) : (
            <div className="text-base sm:text-lg text-slate-800 dark:text-zinc-200 leading-relaxed font-mono">
              <LatexRenderer content={card.back} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800/80">
          <span className="text-xs font-mono text-slate-400">
            {isFlipped ? 'Back (Proof / Formula)' : 'Front (Concept Prompt)'}
          </span>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              toggleMastered();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors flex items-center gap-1 ${
              card.mastered
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{card.mastered ? 'Mastered' : 'Mark Mastered'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-mono font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2.5 rounded-xl bg-blue-700 dark:bg-emerald-500 hover:bg-blue-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-bold text-xs font-mono transition-colors flex items-center gap-1 shadow-md"
        >
          <span>Next Card</span> <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
