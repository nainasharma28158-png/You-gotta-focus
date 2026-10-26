import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, Plus } from 'lucide-react';
import { TimerMode, StudyBlock } from '../types';

interface TimerDisplayProps {
  mode: TimerMode;
  timeLeft: number;
  totalDuration: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSkipTimer: () => void;
  onSelectMode: (mode: TimerMode) => void;
  onAddMinutes: (minutes: number) => void;
  activeBlock: StudyBlock | null;
  currentSessionIndex: number; // 1-indexed
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  mode,
  timeLeft,
  totalDuration,
  isRunning,
  onToggleTimer,
  onResetTimer,
  onSkipTimer,
  onSelectMode,
  onAddMinutes,
  activeBlock,
  currentSessionIndex
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progress = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const progressPercent = Math.min(100, Math.max(0, Math.round(progress * 100)));

  // Radius for circular progress ring
  const ringRadius = 138;
  const circumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = circumference - progress * circumference;

  const targetSessions = activeBlock?.targetSessions || 4;

  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-10">
      {/* Mode Segmented Switcher */}
      <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200/80 dark:border-neutral-800 mb-6">
        <button
          onClick={() => onSelectMode('focus')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
            mode === 'focus'
              ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => onSelectMode('shortBreak')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
            mode === 'shortBreak'
              ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => onSelectMode('longBreak')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
            mode === 'longBreak'
              ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Circular Progress & Time Display */}
      <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 300 300">
          {/* Background Track */}
          <circle
            cx="150"
            cy="150"
            r={ringRadius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-neutral-200/80 dark:text-neutral-800/80"
          />
          {/* Active Progress Bar */}
          <circle
            cx="150"
            cy="150"
            r={ringRadius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100 transition-all duration-700 ease-linear"
          />
        </svg>

        {/* Center Timer Numbers */}
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <span className="font-mono text-6xl sm:text-7xl font-light tracking-tight text-neutral-900 dark:text-neutral-50">
            {formattedTime}
          </span>

          {/* Session Progress dots */}
          <div className="flex items-center gap-1.5 mt-3">
            {Array.from({ length: targetSessions }).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i < currentSessionIndex - 1
                    ? 'bg-neutral-900 dark:bg-neutral-100'
                    : i === currentSessionIndex - 1 && isRunning
                    ? 'bg-neutral-900 dark:bg-neutral-100 animate-pulse'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
                title={`Session ${i + 1} of ${targetSessions}`}
              />
            ))}
          </div>

          {/* Study Block Context */}
          {activeBlock && (
            <div className="mt-2 text-center max-w-[200px] px-2 truncate">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {activeBlock.title}
              </span>
            </div>
          )}

          <div className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
            {progressPercent}% elapsed
          </div>
        </div>
      </div>

      {/* Primary Action Controls */}
      <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
        <button
          onClick={onResetTimer}
          className="p-3 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Reset Timer (R)"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={onToggleTimer}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 hover:opacity-90 active:scale-98 transition-all shadow-sm"
          title={isRunning ? 'Pause (Space)' : 'Start (Space)'}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-0.5" />
          )}
        </button>

        <button
          onClick={onSkipTimer}
          className="p-3 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Skip to next session (S)"
          aria-label="Skip to next session"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Add Minutes while in flow */}
      <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500 dark:text-neutral-400">
        <span>Extend:</span>
        <button
          onClick={() => onAddMinutes(1)}
          className="flex items-center gap-0.5 px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          title="Add 1 minute"
        >
          <Plus className="w-3 h-3" />
          <span>1m</span>
        </button>
        <button
          onClick={() => onAddMinutes(5)}
          className="flex items-center gap-0.5 px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          title="Add 5 minutes"
        >
          <Plus className="w-3 h-3" />
          <span>5m</span>
        </button>
      </div>
    </div>
  );
};
