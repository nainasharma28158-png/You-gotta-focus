import React from 'react';
import { X, Headphones, Volume2, Bell, Check } from 'lucide-react';
import { AmbientSoundType } from '../types';
import { soundService } from '../services/soundService';

interface AmbientSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  ambientSound: AmbientSoundType;
  ambientVolume: number;
  onSelectAmbient: (type: AmbientSoundType) => void;
  onUpdateAmbientVolume: (volume: number) => void;
  soundEnabled: boolean;
  soundVolume: number;
  onToggleSound: () => void;
  onUpdateSoundVolume: (volume: number) => void;
}

const AMBIENT_OPTIONS: Array<{ type: AmbientSoundType; label: string; description: string }> = [
  {
    type: 'off',
    label: 'Silence / Off',
    description: 'Zero background noise, pure silence.'
  },
  {
    type: 'brownNoise',
    label: 'Deep Brown Noise',
    description: 'Low-frequency rumble that masks external conversational distractions.'
  },
  {
    type: 'rain',
    label: 'Rain on Glass',
    description: 'Continuous soothing rainfall synthesized dynamically.'
  },
  {
    type: 'binaural',
    label: 'Alpha Wave Binaural Beats',
    description: 'Stereo frequency offset designed to induce focused relaxation.'
  },
  {
    type: 'metronome',
    label: 'Gentle Ticking',
    description: 'Soft rhythmic wooden pulse anchoring awareness to the second.'
  }
];

export const AmbientSoundModal: React.FC<AmbientSoundModalProps> = ({
  isOpen,
  onClose,
  ambientSound,
  ambientVolume,
  onSelectAmbient,
  onUpdateAmbientVolume,
  soundEnabled,
  soundVolume,
  onToggleSound,
  onUpdateSoundVolume
}) => {
  if (!isOpen) return null;

  const handleTestChime = () => {
    soundService.playZenChime(soundVolume);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-audio-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-6 space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <h2 id="modal-audio-title" className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Audio &amp; Ambient Sanctuary
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ambient Sound Selection */}
        <div className="space-y-3">
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Background Soundscapes (100% Offline / Synthesized)
          </div>

          <div className="space-y-1.5">
            {AMBIENT_OPTIONS.map(opt => (
              <button
                key={opt.type}
                onClick={() => onSelectAmbient(opt.type)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between ${
                  ambientSound === opt.type
                    ? 'border-neutral-900 bg-neutral-100 dark:border-neutral-200 dark:bg-neutral-800'
                    : 'border-neutral-200/70 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                <div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {opt.description}
                  </div>
                </div>
                {ambientSound === opt.type && (
                  <Check className="w-4 h-4 text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>

          {ambientSound !== 'off' && (
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                <span>Ambient Volume</span>
                <span>{Math.round(ambientVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={ambientVolume}
                onChange={e => onUpdateAmbientVolume(parseFloat(e.target.value))}
                className="w-full accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Chime Bell Settings */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                Zen Singing Bowl Chime
              </span>
            </div>

            <button
              onClick={handleTestChime}
              className="text-[11px] px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Test Chime
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Chime at interval completions
            </span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={onToggleSound}
              className="rounded accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
            />
          </div>

          {soundEnabled && (
            <div className="pt-1">
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                <span>Chime Volume</span>
                <span>{Math.round(soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={soundVolume}
                onChange={e => onUpdateSoundVolume(parseFloat(e.target.value))}
                className="w-full accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
