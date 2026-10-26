export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface StudyBlock {
  id: string;
  title: string;
  goal: string;
  category: 'General' | 'History' | 'AI & Tech' | 'Business';
  focusDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  targetSessions: number;
  completedSessions: number;
  tasks: StudyTask[];
  createdAt: number;
}

export interface StudyTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface TimerSettings {
  focusDuration: number; // minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // sessions before long break (usually 4)
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  soundEnabled: boolean;
  soundVolume: number; // 0 to 1
  ambientSound: AmbientSoundType;
  ambientVolume: number;
}

export type AmbientSoundType = 'off' | 'brownNoise' | 'rain' | 'binaural' | 'metronome';

export interface Article {
  id: string;
  title: string;
  category: 'History Greats' | 'AI & Tech' | 'Business';
  snippet: string;
  content: string;
  keyTakeaways: string[];
  readingTimeMinutes: number;
  authorOrSubject?: string;
  yearOrEra?: string;
  sourceUrl?: string;
  isLiveUpdate?: boolean;
  dateAdded: string;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  focusMinutes: number;
  sessionsCompleted: number;
  blocksCompleted: number;
  streakDays: number;
  completedBlockTitles: string[];
}
