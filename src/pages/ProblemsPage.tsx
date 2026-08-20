import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { ProblemFilter } from '../types';
import { ProblemCard } from '../components/problem/ProblemCard';
import { ProblemFilters } from '../components/problem/ProblemFilters';
import { BookOpen, Sparkles } from 'lucide-react';

export const ProblemsPage: React.FC = () => {
  const { attempts, bookmarks } = useApp();

  const [filter, setFilter] = useState<ProblemFilter>(() => {
    // Read query params from URL if present
    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get('subject') as any;
    return {
      search: '',
      subject: subjectParam || 'All',
      topic: 'All',
      difficulty: 'All',
      source: 'All',
      status: 'All',
      sortBy: 'difficulty-asc',
    };
  });

  // Extract unique topics list based on subject
  const topicsList = useMemo(() => {
    let pool = PROBLEMS_DATA;
    if (filter.subject !== 'All') {
      pool = pool.filter(p => p.subject === filter.subject);
    }
    const set = new Set(pool.map(p => p.topic));
    return Array.from(set);
  }, [filter.subject]);

  // Filter & Sort Logic
  const filteredProblems = useMemo(() => {
    return PROBLEMS_DATA.filter(p => {
      // Search
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTopic = p.topic.toLowerCase().includes(q);
        const matchSource = p.source.toLowerCase().includes(q);
        const matchStmt = p.statement.toLowerCase().includes(q);
        if (!matchTitle && !matchTopic && !matchSource && !matchStmt) return false;
      }
      // Subject
      if (filter.subject !== 'All' && p.subject !== filter.subject) return false;
      // Topic
      if (filter.topic !== 'All' && p.topic !== filter.topic) return false;
      // Difficulty
      if (filter.difficulty !== 'All' && p.difficulty !== filter.difficulty) return false;
      // Status
      if (filter.status === 'Solved') {
        if (!attempts.some(a => a.problem_id === p.id && a.solved)) return false;
      } else if (filter.status === 'Unsolved') {
        if (attempts.some(a => a.problem_id === p.id && a.solved)) return false;
      } else if (filter.status === 'Bookmarked') {
        if (!bookmarks.includes(p.id)) return false;
      }
      return true;
    }).sort((a, b) => {
      const diffOrder: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3, 'Very Hard': 4, Olympiad: 5 };
      if (filter.sortBy === 'difficulty-asc') return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      if (filter.sortBy === 'difficulty-desc') return diffOrder[b.difficulty] - diffOrder[a.difficulty];
      if (filter.sortBy === 'time-asc') return a.estimated_time - b.estimated_time;
      return b.id.localeCompare(a.id);
    });
  }, [filter, attempts, bookmarks]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>AUTHENTIC OLYMPIAD CURATED ARCHIVE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            Problem Library
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Search 65+ proof-based problems across Mathematics, Physics, Chemistry, and Biology.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Showing {filteredProblems.length} of {PROBLEMS_DATA.length} Problems</span>
        </div>
      </div>

      {/* Filter Component */}
      <ProblemFilters
        filter={filter}
        setFilter={setFilter}
        topicsList={topicsList}
        totalResults={filteredProblems.length}
      />

      {/* Problem Cards Grid */}
      {filteredProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProblems.map(p => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto text-xl font-mono">
            ?
          </div>
          <h3 className="text-lg font-bold text-zinc-200">No matching problems found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search terms, clearing subject/difficulty filters, or resetting status toggles.
          </p>
        </div>
      )}
    </div>
  );
};
