import React from 'react';
import { X, Flame, Clock, CheckCircle2, Trophy, RotateCcw } from 'lucide-react';
import { DailyStats } from '../types';

interface StudyStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: DailyStats;
  onResetStats: () => void;
}

export const StudyStatsModal: React.FC<StudyStatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-stats-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-6 space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <h2 id="modal-stats-title" className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Focus &amp; Learning Momentum
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 text-center">
            <div className="flex justify-center text-neutral-400 mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xl font-mono font-medium text-neutral-900 dark:text-neutral-100">
              {stats.focusMinutes}m
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Focused Today
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 text-center">
            <div className="flex justify-center text-neutral-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xl font-mono font-medium text-neutral-900 dark:text-neutral-100">
              {stats.sessionsCompleted}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Sessions Done
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 text-center">
            <div className="flex justify-center text-amber-500 mb-1">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
            <div className="text-xl font-mono font-medium text-neutral-900 dark:text-neutral-100">
              {stats.streakDays}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Day Streak
            </div>
          </div>
        </div>

        {/* Completed Blocks Today */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Study Blocks Completed Today ({stats.completedBlockTitles.length})
          </div>

          {stats.completedBlockTitles.length === 0 ? (
            <div className="p-4 rounded-lg bg-neutral-50/50 dark:bg-neutral-800/20 text-center text-xs text-neutral-400">
              Complete your first study block to record focus milestones today.
            </div>
          ) : (
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {stats.completedBlockTitles.map((title, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded bg-neutral-50 dark:bg-neutral-800/40 text-xs text-neutral-800 dark:text-neutral-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={onResetStats}
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-red-500 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Today</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
