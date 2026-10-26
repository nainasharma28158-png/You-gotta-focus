import React, { useState } from 'react';
import { Plus, Check, Trash2, CheckCircle2, Circle, Clock, Target, Layers } from 'lucide-react';
import { StudyBlock } from '../types';

interface StudyBlockPlannerProps {
  blocks: StudyBlock[];
  activeBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onCreateBlock: (block: Omit<StudyBlock, 'id' | 'createdAt' | 'completedSessions'>) => void;
  onDeleteBlock: (id: string) => void;
  onToggleTask: (blockId: string, taskId: string) => void;
  onAddTask: (blockId: string, text: string) => void;
  onDeleteTask: (blockId: string, taskId: string) => void;
}

export const PRESET_TEMPLATES: Array<Omit<StudyBlock, 'id' | 'createdAt' | 'completedSessions'>> = [
  {
    title: 'Deep Work Sprint',
    goal: 'Uninterrupted creative problem solving & deep literature synthesis',
    category: 'General',
    focusDuration: 50,
    shortBreakDuration: 10,
    longBreakDuration: 20,
    targetSessions: 2,
    tasks: [
      { id: 't1', text: 'Define the core problem and outline initial hypotheses', completed: false },
      { id: 't2', text: 'Execute uninterrupted deep writing or coding block', completed: false }
    ]
  },
  {
    title: 'Classic Pomodoro',
    goal: 'Standard high-frequency focus loops with active break reading',
    category: 'General',
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    targetSessions: 4,
    tasks: [
      { id: 't1', text: 'Eliminate all tab and notifications distraction', completed: false },
      { id: 't2', text: 'Review daily history or AI study card during break', completed: false }
    ]
  },
  {
    title: 'AI & Tech Paper Study',
    goal: 'Break down architecture diagrams, code implementations, and mathematical proofs',
    category: 'AI & Tech',
    focusDuration: 35,
    shortBreakDuration: 7,
    longBreakDuration: 15,
    targetSessions: 3,
    tasks: [
      { id: 't1', text: 'Read abstract and methodology section', completed: false },
      { id: 't2', text: 'Examine experimental results and scaling benchmarks', completed: false },
      { id: 't3', text: 'Synthesize 3 key takeaways into study notes', completed: false }
    ]
  },
  {
    title: 'History Greats Deep Dive',
    goal: 'Examine historical biographies, strategic inflection points, and primary writings',
    category: 'History',
    focusDuration: 30,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    targetSessions: 3,
    tasks: [
      { id: 't1', text: 'Read biography excerpts and historical context', completed: false },
      { id: 't2', text: 'Extract core decision-making mental models', completed: false }
    ]
  }
];

export const StudyBlockPlanner: React.FC<StudyBlockPlannerProps> = ({
  blocks,
  activeBlockId,
  onSelectBlock,
  onCreateBlock,
  onDeleteBlock,
  onToggleTask,
  onAddTask,
  onDeleteTask
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  
  // Custom block form state
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<'General' | 'History' | 'AI & Tech' | 'Business'>('General');
  const [focusDuration, setFocusDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [targetSessions, setTargetSessions] = useState(4);

  const activeBlock = blocks.find(b => b.id === activeBlockId) || blocks[0] || null;

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateBlock({
      title: title.trim(),
      goal: goal.trim() || 'Focused learning block',
      category,
      focusDuration: Math.max(1, focusDuration),
      shortBreakDuration: Math.max(1, shortBreakDuration),
      longBreakDuration: Math.max(1, longBreakDuration),
      targetSessions: Math.max(1, targetSessions),
      tasks: []
    });

    // Reset
    setTitle('');
    setGoal('');
    setIsCreating(false);
  };

  const handleApplyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    onCreateBlock({
      ...preset,
      tasks: preset.tasks.map(t => ({ ...t, id: 'task_' + Math.random().toString(36).substring(2, 9) }))
    });
    setIsCreating(false);
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim() || !activeBlock) return;
    onAddTask(activeBlock.id, newTaskText.trim());
    setNewTaskText('');
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900/60 rounded-xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          <h2 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Study Blocks &amp; Focus Plan
          </h2>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isCreating ? 'Cancel' : 'New Block'}</span>
        </button>
      </div>

      {/* Creation Drawer / Section */}
      {isCreating && (
        <div className="py-4 border-b border-neutral-100 dark:border-neutral-800 space-y-4">
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
              Quick Presets
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_TEMPLATES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className="text-left p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-800/40 transition-colors"
                >
                  <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                    {preset.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {preset.targetSessions}x {preset.focusDuration}m focus · {preset.shortBreakDuration}m break
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmitCustom} className="space-y-3 pt-2">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Or Customize Block Parameters
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                  Block Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI Transformer Study"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as 'General' | 'History' | 'AI & Tech' | 'Business')}
                  className="w-full px-3 py-1.5 text-xs rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                >
                  <option value="General">General Deep Work</option>
                  <option value="AI & Tech">AI &amp; Technology</option>
                  <option value="History">History Greats</option>
                  <option value="Business">Business Strategy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                Intent / Target Outcome
              </label>
              <input
                type="text"
                placeholder="What will be accomplished in this block?"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                  Focus (m)
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={focusDuration}
                  onChange={e => setFocusDuration(Number(e.target.value))}
                  className="w-full px-2 py-1 text-xs text-center rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                  Short (m)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={shortBreakDuration}
                  onChange={e => setShortBreakDuration(Number(e.target.value))}
                  className="w-full px-2 py-1 text-xs text-center rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                  Long (m)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={longBreakDuration}
                  onChange={e => setLongBreakDuration(Number(e.target.value))}
                  className="w-full px-2 py-1 text-xs text-center rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                  Sessions
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={targetSessions}
                  onChange={e => setTargetSessions(Number(e.target.value))}
                  className="w-full px-2 py-1 text-xs text-center rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-medium bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:opacity-90"
              >
                Save Study Block
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Block Selector Tabs */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {blocks.map(b => (
            <button
              key={b.id}
              onClick={() => onSelectBlock(b.id)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                b.id === activeBlock?.id
                  ? 'bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <span>{b.title}</span>
              <span className="text-[10px] opacity-70">
                ({b.completedSessions}/{b.targetSessions})
              </span>
            </button>
          ))}
        </div>

        {/* Active Block Card Details */}
        {activeBlock && (
          <div className="p-4 rounded-lg bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800/80 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{activeBlock.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activeBlock.focusDuration}m focus / {activeBlock.shortBreakDuration}m break
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Target: {activeBlock.targetSessions} sessions
                  </span>
                </div>
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mt-1">
                  {activeBlock.goal}
                </div>
              </div>

              {blocks.length > 1 && (
                <button
                  onClick={() => onDeleteBlock(activeBlock.id)}
                  className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                  title="Remove this block"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Checklist of micro-tasks */}
            <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50 space-y-2">
              <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Action Items for this Block:
              </div>

              <div className="space-y-1.5">
                {activeBlock.tasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between group text-xs text-neutral-800 dark:text-neutral-200"
                  >
                    <button
                      onClick={() => onToggleTask(activeBlock.id, task.id)}
                      className="flex items-center gap-2 text-left hover:text-neutral-950 dark:hover:text-white"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100 shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      )}
                      <span className={task.completed ? 'line-through text-neutral-400 dark:text-neutral-500' : ''}>
                        {task.text}
                      </span>
                    </button>

                    <button
                      onClick={() => onDeleteTask(activeBlock.id, task.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-neutral-400 hover:text-red-500 transition-opacity"
                      title="Delete task"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add task input */}
              <form onSubmit={handleAddTaskSubmit} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add a concrete task to complete in this block..."
                  value={newTaskText}
                  onChange={e => setNewTaskText(e.target.value)}
                  className="grow px-2.5 py-1 text-xs rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
                <button
                  type="submit"
                  disabled={!newTaskText.trim()}
                  className="px-2.5 py-1 text-xs font-medium rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-40 text-neutral-800 dark:text-neutral-200 transition-colors"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
