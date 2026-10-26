import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { TimerDisplay } from './components/TimerDisplay';
import { StudyBlockPlanner, PRESET_TEMPLATES } from './components/StudyBlockPlanner';
import { KnowledgeHub } from './components/KnowledgeHub';
import { ArticleModal } from './components/ArticleModal';
import { AmbientSoundModal } from './components/AmbientSoundModal';
import { StudyStatsModal } from './components/StudyStatsModal';
import { TimerMode, StudyBlock, TimerSettings, Article, DailyStats, AmbientSoundType } from './types';
import { soundService } from './services/soundService';
import { knowledgeService } from './services/knowledgeService';

const DEFAULT_BLOCKS: StudyBlock[] = [
  {
    id: 'block_deepwork',
    title: 'Deep Work Sprint',
    goal: 'Uninterrupted creative problem solving & deep literature synthesis',
    category: 'General',
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    targetSessions: 4,
    completedSessions: 0,
    tasks: [
      { id: 't1', text: 'Define the core problem and outline initial hypotheses', completed: false },
      { id: 't2', text: 'Read 1 daily article during break to spark fresh insights', completed: false }
    ],
    createdAt: Date.now()
  },
  {
    id: 'block_ai',
    title: 'AI & Tech Paper Study',
    goal: 'Break down architecture diagrams and modern scaling mechanisms',
    category: 'AI & Tech',
    focusDuration: 35,
    shortBreakDuration: 7,
    longBreakDuration: 15,
    targetSessions: 3,
    completedSessions: 0,
    tasks: [
      { id: 't3', text: 'Inspect foundational attention mechanism paper', completed: false },
      { id: 't4', text: 'Extract 3 practical engineering mental models', completed: false }
    ],
    createdAt: Date.now()
  }
];

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kanso_focus_dark_mode');
    return saved !== null ? saved === 'true' : true; // Dark mode by default for deep focus
  });

  // Settings
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('kanso_focus_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      longBreakInterval: 4,
      autoStartBreaks: false,
      autoStartFocus: false,
      soundEnabled: true,
      soundVolume: 0.6,
      ambientSound: 'off',
      ambientVolume: 0.35
    };
  });

  // Study Blocks state
  const [studyBlocks, setStudyBlocks] = useState<StudyBlock[]>(() => {
    const saved = localStorage.getItem('kanso_focus_blocks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // ignore
      }
    }
    return DEFAULT_BLOCKS;
  });

  const [activeBlockId, setActiveBlockId] = useState<string>(() => {
    return studyBlocks[0]?.id || 'block_deepwork';
  });

  const activeBlock = studyBlocks.find(b => b.id === activeBlockId) || studyBlocks[0] || null;

  // Timer State
  const [mode, setMode] = useState<TimerMode>('focus');
  const [currentSessionIndex, setCurrentSessionIndex] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  
  const getDurationForMode = useCallback((targetMode: TimerMode, block: StudyBlock | null): number => {
    if (!block) {
      if (targetMode === 'focus') return 25 * 60;
      if (targetMode === 'shortBreak') return 5 * 60;
      return 15 * 60;
    }
    if (targetMode === 'focus') return block.focusDuration * 60;
    if (targetMode === 'shortBreak') return block.shortBreakDuration * 60;
    return block.longBreakDuration * 60;
  }, []);

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    return (activeBlock?.focusDuration || 25) * 60;
  });
  const [totalDuration, setTotalDuration] = useState<number>(() => {
    return (activeBlock?.focusDuration || 25) * 60;
  });

  // Stats State
  const [stats, setStats] = useState<DailyStats>(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const saved = localStorage.getItem(`kanso_focus_stats_${todayStr}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      date: todayStr,
      focusMinutes: 0,
      sessionsCompleted: 0,
      blocksCompleted: 0,
      streakDays: 1,
      completedBlockTitles: []
    };
  });

  // Knowledge Hub State
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Modals
  const [isAmbientModalOpen, setIsAmbientModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync theme class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kanso_focus_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Save Settings
  useEffect(() => {
    localStorage.setItem('kanso_focus_settings', JSON.stringify(settings));
  }, [settings]);

  // Save Study Blocks
  useEffect(() => {
    localStorage.setItem('kanso_focus_blocks', JSON.stringify(studyBlocks));
  }, [studyBlocks]);

  // Save Stats
  useEffect(() => {
    localStorage.setItem(`kanso_focus_stats_${stats.date}`, JSON.stringify(stats));
  }, [stats]);

  // Load Knowledge on mount
  useEffect(() => {
    setBookmarkedIds(knowledgeService.getBookmarkedIds());
    let isMounted = true;
    knowledgeService.getDailyKnowledge()
      .then(data => {
        if (isMounted) {
          setArticles(data);
          setIsLoadingArticles(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoadingArticles(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefreshKnowledge = async () => {
    setIsLoadingArticles(true);
    try {
      const data = await knowledgeService.getDailyKnowledge(true);
      setArticles(data);
    } finally {
      setIsLoadingArticles(false);
    }
  };

  const handleToggleBookmark = (id: string) => {
    const isNowBookmarked = knowledgeService.toggleBookmark(id);
    setBookmarkedIds(prev => 
      isNowBookmarked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  // Timer Tick
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleIntervalComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode, activeBlock, currentSessionIndex, settings]);

  // Handle Session Completion
  const handleIntervalComplete = () => {
    if (settings.soundEnabled) {
      soundService.playZenChime(settings.soundVolume);
    }

    if (mode === 'focus') {
      const addedMinutes = activeBlock ? activeBlock.focusDuration : 25;
      
      // Update daily stats
      setStats(prev => ({
        ...prev,
        focusMinutes: prev.focusMinutes + addedMinutes,
        sessionsCompleted: prev.sessionsCompleted + 1
      }));

      // Update study block completed sessions
      if (activeBlock) {
        const nextCompleted = activeBlock.completedSessions + 1;
        const updatedBlocks = studyBlocks.map(b => {
          if (b.id === activeBlock.id) {
            return { ...b, completedSessions: nextCompleted };
          }
          return b;
        });
        setStudyBlocks(updatedBlocks);

        if (nextCompleted === activeBlock.targetSessions) {
          setStats(prev => ({
            ...prev,
            blocksCompleted: prev.blocksCompleted + 1,
            completedBlockTitles: [...prev.completedBlockTitles, activeBlock.title]
          }));
        }
      }

      // Switch to break
      const isLong = currentSessionIndex % (settings.longBreakInterval || 4) === 0;
      const nextMode: TimerMode = isLong ? 'longBreak' : 'shortBreak';
      const nextDur = getDurationForMode(nextMode, activeBlock);
      setMode(nextMode);
      setTimeLeft(nextDur);
      setTotalDuration(nextDur);
      setIsRunning(settings.autoStartBreaks);
    } else {
      // Break finished, advance to next session
      const nextSession = currentSessionIndex + 1;
      setCurrentSessionIndex(nextSession);
      const nextDur = getDurationForMode('focus', activeBlock);
      setMode('focus');
      setTimeLeft(nextDur);
      setTotalDuration(nextDur);
      setIsRunning(settings.autoStartFocus);
    }
  };

  // Update Page Title with live countdown
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const modeLabel = mode === 'focus' ? 'Focus' : 'Break';
    document.title = `${timeStr} (${modeLabel}) · Kanso Focus`;
  }, [timeLeft, mode]);

  // Switch Active Block
  const handleSelectBlock = (id: string) => {
    setActiveBlockId(id);
    const newBlock = studyBlocks.find(b => b.id === id);
    if (newBlock) {
      const dur = getDurationForMode(mode, newBlock);
      setTimeLeft(dur);
      setTotalDuration(dur);
      setIsRunning(false);
    }
  };

  // Create Block
  const handleCreateBlock = (newBlockData: Omit<StudyBlock, 'id' | 'createdAt' | 'completedSessions'>) => {
    const newBlock: StudyBlock = {
      ...newBlockData,
      id: 'block_' + Date.now().toString(36),
      completedSessions: 0,
      createdAt: Date.now()
    };
    const updated = [newBlock, ...studyBlocks];
    setStudyBlocks(updated);
    setActiveBlockId(newBlock.id);
    const dur = getDurationForMode(mode, newBlock);
    setTimeLeft(dur);
    setTotalDuration(dur);
    setIsRunning(false);
  };

  // Delete Block
  const handleDeleteBlock = (id: string) => {
    if (studyBlocks.length <= 1) return;
    const filtered = studyBlocks.filter(b => b.id !== id);
    setStudyBlocks(filtered);
    if (activeBlockId === id) {
      setActiveBlockId(filtered[0].id);
      const dur = getDurationForMode(mode, filtered[0]);
      setTimeLeft(dur);
      setTotalDuration(dur);
      setIsRunning(false);
    }
  };

  // Task micro-checklist inside block
  const handleToggleTask = (blockId: string, taskId: string) => {
    setStudyBlocks(prev => prev.map(b => {
      if (b.id !== blockId) return b;
      return {
        ...b,
        tasks: b.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };

  const handleAddTask = (blockId: string, text: string) => {
    setStudyBlocks(prev => prev.map(b => {
      if (b.id !== blockId) return b;
      const newTask = {
        id: 't_' + Math.random().toString(36).substring(2, 9),
        text,
        completed: false
      };
      return {
        ...b,
        tasks: [...b.tasks, newTask]
      };
    }));
  };

  const handleDeleteTask = (blockId: string, taskId: string) => {
    setStudyBlocks(prev => prev.map(b => {
      if (b.id !== blockId) return b;
      return {
        ...b,
        tasks: b.tasks.filter(t => t.id !== taskId)
      };
    }));
  };

  // Timer controls
  const handleToggleTimer = () => {
    soundService.playSoftClick(0.3);
    setIsRunning(prev => !prev);
  };

  const handleResetTimer = () => {
    soundService.playSoftClick(0.2);
    setIsRunning(false);
    const dur = getDurationForMode(mode, activeBlock);
    setTimeLeft(dur);
    setTotalDuration(dur);
  };

  const handleSkipTimer = () => {
    soundService.playSoftClick(0.2);
    setIsRunning(false);
    if (mode === 'focus') {
      const nextMode: TimerMode = currentSessionIndex % (settings.longBreakInterval || 4) === 0 ? 'longBreak' : 'shortBreak';
      const dur = getDurationForMode(nextMode, activeBlock);
      setMode(nextMode);
      setTimeLeft(dur);
      setTotalDuration(dur);
    } else {
      setCurrentSessionIndex(prev => prev + 1);
      const dur = getDurationForMode('focus', activeBlock);
      setMode('focus');
      setTimeLeft(dur);
      setTotalDuration(dur);
    }
  };

  const handleSelectMode = (newMode: TimerMode) => {
    soundService.playSoftClick(0.2);
    setIsRunning(false);
    setMode(newMode);
    const dur = getDurationForMode(newMode, activeBlock);
    setTimeLeft(dur);
    setTotalDuration(dur);
  };

  const handleAddMinutes = (minutes: number) => {
    soundService.playSoftClick(0.2);
    setTimeLeft(prev => prev + minutes * 60);
    setTotalDuration(prev => prev + minutes * 60);
  };

  // Sound settings
  const handleToggleSound = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleSelectAmbient = (type: AmbientSoundType) => {
    setSettings(prev => ({ ...prev, ambientSound: type }));
    soundService.setAmbientSound(type, settings.ambientVolume);
  };

  const handleUpdateAmbientVolume = (volume: number) => {
    setSettings(prev => ({ ...prev, ambientVolume: volume }));
    soundService.updateAmbientVolume(volume);
  };

  const handleUpdateSoundVolume = (volume: number) => {
    setSettings(prev => ({ ...prev, soundVolume: volume }));
  };

  // Fullscreen
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleTimer();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleResetTimer();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleSkipTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, mode, activeBlock, currentSessionIndex]);

  return (
    <div className="min-h-screen bg-neutral-100/50 dark:bg-[#0c0e12] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Minimalist Top Header */}
        <Header
          soundEnabled={settings.soundEnabled}
          onToggleSound={handleToggleSound}
          ambientSound={settings.ambientSound}
          onOpenAmbientModal={() => setIsAmbientModalOpen(true)}
          onOpenStatsModal={() => setIsStatsModalOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          focusMinutesToday={stats.focusMinutes}
        />

        {/* Main Workspace */}
        <main className="mt-6 sm:mt-8 space-y-8 sm:space-y-12">
          {/* Top Panel: Timer Display */}
          <div className="w-full bg-white dark:bg-neutral-900/60 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs backdrop-blur-xs transition-colors">
            <TimerDisplay
              mode={mode}
              timeLeft={timeLeft}
              totalDuration={totalDuration}
              isRunning={isRunning}
              onToggleTimer={handleToggleTimer}
              onResetTimer={handleResetTimer}
              onSkipTimer={handleSkipTimer}
              onSelectMode={handleSelectMode}
              onAddMinutes={handleAddMinutes}
              activeBlock={activeBlock}
              currentSessionIndex={currentSessionIndex}
            />
          </div>

          {/* Middle Panel: Study Blocks & Focus Plan */}
          <StudyBlockPlanner
            blocks={studyBlocks}
            activeBlockId={activeBlockId}
            onSelectBlock={handleSelectBlock}
            onCreateBlock={handleCreateBlock}
            onDeleteBlock={handleDeleteBlock}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />

          {/* Lower Panel: Active Daily Knowledge Section */}
          <KnowledgeHub
            articles={articles}
            isLoading={isLoadingArticles}
            onRefresh={handleRefreshKnowledge}
            onSelectArticle={article => setSelectedArticle(article)}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        </main>

        {/* Quiet Minimalist Footer */}
        <footer className="mt-16 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 text-center text-xs text-neutral-400 dark:text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Kanso Focus · Minimalist study blocks and active daily learning.
          </div>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[10px]">Space</kbd> to toggle</span>
            <span aria-hidden="true">·</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[10px]">R</kbd> to reset</span>
          </div>
        </footer>
      </div>

      {/* Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Ambient Sound Settings Modal */}
      <AmbientSoundModal
        isOpen={isAmbientModalOpen}
        onClose={() => setIsAmbientModalOpen(false)}
        ambientSound={settings.ambientSound}
        ambientVolume={settings.ambientVolume}
        onSelectAmbient={handleSelectAmbient}
        onUpdateAmbientVolume={handleUpdateAmbientVolume}
        soundEnabled={settings.soundEnabled}
        soundVolume={settings.soundVolume}
        onToggleSound={handleToggleSound}
        onUpdateSoundVolume={handleUpdateSoundVolume}
      />

      {/* Stats & Streak Modal */}
      <StudyStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        stats={stats}
        onResetStats={() => {
          const todayStr = new Date().toISOString().slice(0, 10);
          setStats({
            date: todayStr,
            focusMinutes: 0,
            sessionsCompleted: 0,
            blocksCompleted: 0,
            streakDays: 1,
            completedBlockTitles: []
          });
        }}
      />
    </div>
  );
}
