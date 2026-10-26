import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, BarChart2, Headphones, Moon, Sun } from 'lucide-react';
import { AmbientSoundType } from '../types';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  ambientSound: AmbientSoundType;
  onOpenAmbientModal: () => void;
  onOpenStatsModal: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  focusMinutesToday: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  ambientSound,
  onOpenAmbientModal,
  onOpenStatsModal,
  isFullscreen,
  onToggleFullscreen,
  isDarkMode,
  onToggleDarkMode,
  focusMinutesToday
}) => {
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="w-full flex items-center justify-between py-4 border-b border-neutral-200/70 dark:border-neutral-800 transition-colors">
      <div className="flex items-baseline gap-3">
        <h1 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          Kanso Focus
        </h1>
        <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span aria-hidden="true">/</span>
          <span>{todayFormatted}</span>
          <span aria-hidden="true">·</span>
          <span>{focusMinutesToday}m focused today</span>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Ambient Sound Trigger */}
        <button
          onClick={onOpenAmbientModal}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md transition-colors ${
            ambientSound !== 'off'
              ? 'bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 font-medium'
              : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          title="Ambient Soundscapes"
          aria-label="Ambient sound settings"
        >
          <Headphones className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {ambientSound === 'off' ? 'Ambient Sound' : ambientSound.replace('Noise', ' Noise')}
          </span>
        </button>

        {/* Chime Bell Toggle */}
        <button
          onClick={onToggleSound}
          className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title={soundEnabled ? 'Chime Enabled' : 'Chime Muted'}
          aria-label={soundEnabled ? 'Mute bell' : 'Unmute bell'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
        </button>

        {/* Stats Modal */}
        <button
          onClick={onOpenStatsModal}
          className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Study Analytics & Streak"
          aria-label="View study analytics"
        >
          <BarChart2 className="w-4 h-4" />
        </button>

        {/* Dark/Light mode */}
        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle color theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Zen Fullscreen'}
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
