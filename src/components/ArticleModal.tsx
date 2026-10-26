import React, { useState, useEffect } from 'react';
import { X, Bookmark, Volume2, VolumeX, Sparkles, ExternalLink, ArrowRight, Share2, Check } from 'lucide-react';
import { Article } from '../types';
import { soundService } from '../services/soundService';
import { generateStudyDeepDive, StudyDeepDiveResult } from '../services/aiService';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [deepDive, setDeepDive] = useState<StudyDeepDiveResult | null>(null);
  const [isLoadingDeepDive, setIsLoadingDeepDive] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Reset state on article change
    setDeepDive(null);
    setIsLoadingDeepDive(false);
    setIsSpeaking(false);
    soundService.stopSpeaking();

    // Close on Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      soundService.stopSpeaking();
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      soundService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${article.title}. ${article.category}. ${article.content}. Key takeaways: ${article.keyTakeaways.join('. ')}`;
      soundService.speakText(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleGenerateDeepDive = async () => {
    setIsLoadingDeepDive(true);
    try {
      const result = await generateStudyDeepDive(article.title, article.category, article.content);
      setDeepDive(result);
    } finally {
      setIsLoadingDeepDive(false);
    }
  };

  const handleCopy = () => {
    const summary = `${article.title}\n\n${article.content}\n\nKey Takeaways:\n- ${article.keyTakeaways.join('\n- ')}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-article-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden transition-all"
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMinutes} min read</span>
            {article.yearOrEra && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.yearOrEra}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Read Aloud TTS */}
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-colors ${
                isSpeaking
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-transparent font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
              title={isSpeaking ? 'Stop speech' : 'Listen with eyes closed'}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Stop Audio' : 'Read Aloud'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className="p-1.5 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-neutral-900 dark:text-neutral-100' : ''}`} />
            </button>

            {/* Copy Study Notes */}
            <button
              onClick={handleCopy}
              className="p-1.5 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Copy notes"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="overflow-y-auto px-6 py-6 space-y-6">
          {/* Article Title */}
          <div>
            <h2 id="modal-article-title" className="text-xl sm:text-2xl font-serif font-medium text-neutral-900 dark:text-neutral-100 leading-snug tracking-tight">
              {article.title}
            </h2>
            {article.authorOrSubject && (
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Subject / Originator: {article.authorOrSubject}
              </div>
            )}
          </div>

          {/* Body Prose */}
          <div className="prose dark:prose-invert max-w-none text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans space-y-3 whitespace-pre-line">
            {article.content}
          </div>

          {/* Key Takeaways Section */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 space-y-2">
            <div className="text-xs font-semibold tracking-wide text-neutral-900 dark:text-neutral-100 uppercase">
              Core Principles &amp; Takeaways
            </div>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-400 select-none">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deepen Study / AI Spark Option */}
          <div className="pt-2">
            {!deepDive ? (
              <button
                onClick={handleGenerateDeepDive}
                disabled={isLoadingDeepDive}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-all"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isLoadingDeepDive ? 'animate-spin' : ''}`} />
                <span>
                  {isLoadingDeepDive ? 'Synthesizing Focus Deep-Dive...' : 'Generate 3-Minute Study Deep Dive & Reflection'}
                </span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-neutral-900 text-neutral-100 dark:bg-neutral-800/80 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthesized Study Briefing</span>
                </div>

                <div className="text-xs text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-white">Central Thesis: </span>
                  {deepDive.thesis}
                </div>

                <div className="space-y-1 text-xs text-neutral-300">
                  <span className="font-semibold text-white">Focus Principles:</span>
                  {deepDive.principles.map((pr, i) => (
                    <div key={i} className="flex items-start gap-1.5 pl-1">
                      <span className="text-neutral-500">→</span>
                      <span>{pr}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-neutral-300 pt-1 border-t border-neutral-700/60">
                  <span className="font-semibold text-white">Current Session Prompt: </span>
                  {deepDive.focusApplication}
                </div>

                <div className="text-xs text-neutral-400 italic pt-1">
                  &ldquo;{deepDive.reflectionQuestion}&rdquo;
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div>
            {article.sourceUrl ? (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <span>Read Original Reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-[11px] text-neutral-400">Curated Kanso Study Archive</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
