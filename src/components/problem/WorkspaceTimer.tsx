import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

interface WorkspaceTimerProps {
  onTimeUpdate?: (seconds: number) => void;
}

export const WorkspaceTimer: React.FC<WorkspaceTimerProps> = ({ onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          if (onTimeUpdate) onTimeUpdate(next);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 shadow-inner flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Solve Timer</div>
          <div className="text-xl font-mono font-bold text-zinc-100 tracking-wider">
            {formatTime(seconds)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`p-2 rounded-lg border transition-colors ${
            isRunning
              ? 'bg-zinc-900 border-zinc-700 text-amber-400 hover:bg-zinc-800'
              : 'bg-emerald-950 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900'
          }`}
          title={isRunning ? 'Pause Timer' : 'Resume Timer'}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={() => {
            setSeconds(0);
            setIsRunning(false);
          }}
          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
