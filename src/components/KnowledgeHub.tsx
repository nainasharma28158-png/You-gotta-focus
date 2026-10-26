import React, { useState, useMemo } from 'react';
import { Search, RotateCw, Bookmark, Sparkles, BookOpen, ExternalLink, Radio } from 'lucide-react';
import { Article } from '../types';

interface KnowledgeHubProps {
  articles: Article[];
  isLoading: boolean;
  onRefresh: () => void;
  onSelectArticle: (article: Article) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (articleId: string) => void;
}

type CategoryTab = 'all' | 'History Greats' | 'AI & Tech' | 'Business' | 'saved';

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  articles,
  isLoading,
  onRefresh,
  onSelectArticle,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Category filter
      if (activeTab === 'saved') {
        if (!bookmarkedIds.includes(article.id)) return false;
      } else if (activeTab !== 'all') {
        if (article.category !== activeTab) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesSnippet = article.snippet.toLowerCase().includes(query);
        const matchesAuthor = article.authorOrSubject?.toLowerCase().includes(query);
        return matchesTitle || matchesSnippet || matchesAuthor;
      }

      return true;
    });
  }, [articles, activeTab, searchQuery, bookmarkedIds]);

  return (
    <section className="w-full bg-white dark:bg-neutral-900/60 rounded-xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 transition-colors">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <h2 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Daily Knowledge &amp; Study Library
            </h2>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Break readings from History Greats, AI breakthroughs, and strategic business mental models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
            title="Refresh live daily updates from Wikipedia & Tech feeds"
          >
            <RotateCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Updating…' : 'Refresh Feed'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="pt-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1 p-0.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-lg overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setActiveTab('History Greats')}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                activeTab === 'History Greats'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              History Greats
            </button>
            <button
              onClick={() => setActiveTab('AI & Tech')}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                activeTab === 'AI & Tech'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              AI &amp; Tech
            </button>
            <button
              onClick={() => setActiveTab('Business')}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                activeTab === 'Business'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Business
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                activeTab === 'saved'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search concepts, leaders, tech..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>
        </div>

        {/* Article Grid */}
        {isLoading && articles.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Fetching active daily historical milestones and modern tech dispatches...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-10 text-center text-xs text-neutral-500 dark:text-neutral-400">
            No articles match your current filter. Try selecting another topic or clearing search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {filteredArticles.map(article => {
              const isBookmarked = bookmarkedIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="group relative flex flex-col justify-between p-4 rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-800/20 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-all"
                >
                  <div>
                    {/* Unboxed Metadata Line (No static pills) */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">
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
                        {article.isLiveUpdate && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-600 dark:text-emerald-400">Live</span>
                          </>
                        )}
                      </div>

                      {/* Bookmark button */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onToggleBookmark(article.id);
                        }}
                        className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        title={isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
                        aria-label="Save bookmark"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isBookmarked ? 'fill-neutral-900 dark:fill-neutral-100 text-neutral-900 dark:text-neutral-100' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    {/* Snippet */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                      {article.snippet}
                    </p>
                  </div>

                  {/* Footer callout */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 pt-3 mt-3 border-t border-neutral-200/40 dark:border-neutral-800/60">
                    <span>Click to read full study</span>
                    {article.sourceUrl && (
                      <span className="flex items-center gap-0.5 group-hover:underline">
                        Source <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
