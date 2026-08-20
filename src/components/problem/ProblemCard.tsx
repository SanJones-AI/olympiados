import React from 'react';
import { Problem } from '../../types';
import { useApp } from '../../context/AppContext';
import { LatexRenderer } from '../ui/LatexRenderer';
import { Bookmark, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const { navigate, isBookmarked, toggleBookmark, getProblemAttempt } = useApp();
  const attempt = getProblemAttempt(problem.id);
  const bookmarked = isBookmarked(problem.id);

  const subjectBadgeMap = {
    Mathematics: 'bg-blue-950/60 text-blue-400 border-blue-500/30',
    Physics: 'bg-purple-950/60 text-purple-400 border-purple-500/30',
    Chemistry: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
    Biology: 'bg-amber-950/60 text-amber-400 border-amber-500/30',
  };

  const difficultyColorMap = {
    Easy: 'text-zinc-400 border-zinc-700',
    Medium: 'text-blue-400 border-blue-500/40',
    Hard: 'text-purple-400 border-purple-500/40',
    'Very Hard': 'text-amber-400 border-amber-500/40',
    Olympiad: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40',
  };

  return (
    <div className="group relative bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-5 hover:border-emerald-500/40 hover:bg-zinc-900 transition-all flex flex-col justify-between shadow-lg">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${subjectBadgeMap[problem.subject]}`}>
              {problem.subject}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700/60">
              {problem.topic}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              {problem.source}
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(problem.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              bookmarked
                ? 'bg-amber-950/60 text-amber-400 border-amber-500/40'
                : 'text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Save Problem'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => navigate(`/problems/${problem.id}`)}
          className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors cursor-pointer mb-2 leading-snug"
        >
          {problem.title}
        </h3>

        {/* Excerpt / Latex Preview */}
        <div className="text-xs text-zinc-400 line-clamp-2 mb-4 font-sans">
          <LatexRenderer content={problem.statement} />
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between mt-auto text-xs font-mono">
        <div className="flex items-center gap-3">
          {/* Solved Status */}
          {attempt && attempt.solved ? (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Solved
            </span>
          ) : (
            <span className={`text-[11px] px-2 py-0.5 rounded border font-semibold ${difficultyColorMap[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
          )}

          <span className="flex items-center gap-1 text-zinc-500 text-[11px]">
            <Clock className="w-3 h-3" /> {problem.estimated_time}m
          </span>
        </div>

        <button
          onClick={() => navigate(`/problems/${problem.id}`)}
          className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-0.5 transform duration-150"
        >
          <span>Solve</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
