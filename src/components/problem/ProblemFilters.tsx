import React from 'react';
import { ProblemFilter, Subject, Difficulty } from '../../types';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface ProblemFiltersProps {
  filter: ProblemFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProblemFilter>>;
  topicsList: string[];
  totalResults: number;
}

export const ProblemFilters: React.FC<ProblemFiltersProps> = ({
  filter,
  setFilter,
  topicsList,
  totalResults,
}) => {
  const subjects: (Subject | 'All')[] = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const difficulties: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard', 'Very Hard', 'Olympiad'];

  const resetFilters = () => {
    setFilter({
      search: '',
      subject: 'All',
      topic: 'All',
      difficulty: 'All',
      source: 'All',
      status: 'All',
      sortBy: 'difficulty-asc',
    });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4 mb-6 shadow-xl">
      {/* Top Search + Subject Pills */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems by title, latex, source (USAMO, AIME, IPhO, IChO)..."
            value={filter.search}
            onChange={e => setFilter(prev => ({ ...prev, search: e.target.value }))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs md:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60"
          />
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setFilter(prev => ({ ...prev, subject: s, topic: 'All' }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all ${
                filter.subject === s
                  ? s === 'Mathematics'
                    ? 'bg-blue-600 text-white font-bold'
                    : s === 'Physics'
                    ? 'bg-purple-600 text-white font-bold'
                    : s === 'Chemistry'
                    ? 'bg-emerald-600 text-white font-bold'
                    : s === 'Biology'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-2 border-t border-zinc-800/60">
        {/* Topic Filter */}
        <div>
          <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Topic</label>
          <select
            value={filter.topic}
            onChange={e => setFilter(prev => ({ ...prev, topic: e.target.value }))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/60 font-mono"
          >
            <option value="All">All Topics</option>
            {topicsList.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Difficulty</label>
          <select
            value={filter.difficulty}
            onChange={e => setFilter(prev => ({ ...prev, difficulty: e.target.value as Difficulty | 'All' }))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/60 font-mono"
          >
            {difficulties.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Status</label>
          <select
            value={filter.status}
            onChange={e => setFilter(prev => ({ ...prev, status: e.target.value as any }))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/60 font-mono"
          >
            <option value="All">All Problems</option>
            <option value="Unsolved">Unsolved</option>
            <option value="Solved">Solved</option>
            <option value="Bookmarked">Saved / Bookmarked</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Sort By</label>
          <select
            value={filter.sortBy}
            onChange={e => setFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/60 font-mono"
          >
            <option value="difficulty-asc">Difficulty: Low to High</option>
            <option value="difficulty-desc">Difficulty: High to Low</option>
            <option value="time-asc">Solve Time: Fast</option>
            <option value="newest">Newest Added</option>
          </select>
        </div>

        {/* Results Counter & Reset */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end justify-between lg:justify-end gap-2 pt-1 lg:pt-0">
          <span className="text-xs font-mono text-zinc-400 self-center">
            <strong className="text-emerald-400">{totalResults}</strong> problems found
          </span>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-mono transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};
