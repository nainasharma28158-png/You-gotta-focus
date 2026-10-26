export interface StudyDeepDiveResult {
  thesis: string;
  principles: string[];
  focusApplication: string;
  reflectionQuestion: string;
}

export async function generateStudyDeepDive(
  title: string,
  category: string,
  content: string
): Promise<StudyDeepDiveResult> {
  try {
    const res = await fetch('/api/study-spark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, content })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.thesis && Array.isArray(data.principles)) {
        return data as StudyDeepDiveResult;
      }
    }
  } catch (err) {
    console.warn('AI endpoint not reachable, generating local high-signal synthesis:', err);
  }

  // Graceful, high-value deterministic synthesis fallback
  return generateLocalStudySynthesis(title, category, content);
}

function generateLocalStudySynthesis(
  title: string,
  category: string,
  content: string
): StudyDeepDiveResult {
  if (category === 'History Greats') {
    return {
      thesis: `Historical greatness in "${title}" reveals that profound achievements compound from emotional self-control and consistent daily architecture rather than chaotic inspiration.`,
      principles: [
        'Radical Simplification: Great historical figures strip out social vanity and focus only on the decisive lever.',
        'Antifragility under Strain: Discomfort and external turmoil were treated as the raw material for deliberate practice.',
        'Long-Horizon Commitment: Significant works took years of quiet, uncelebrated manual effort.'
      ],
      focusApplication: 'Apply this to your current study block: turn off all external notifications. Treat this session as an unbreakable contract with your future self.',
      reflectionQuestion: 'What trivial distraction are you currently tolerating that is stealing energy from your highest priority?'
    };
  } else if (category === 'AI & Tech') {
    return {
      thesis: `Modern progress in "${title}" demonstrates that scalable, first-principles architectures inevitably supersede complex manual heuristics.`,
      principles: [
        'Leverage General Computation: Systems that scale with hardware compute beat handcrafted rules over time.',
        'High Signal-to-Noise Ratio: Breakthrough insights emerge when you filter out superficial noise to track core parameters.',
        'Modular Compounding: Every technical milestone builds on clear mathematical abstractions.'
      ],
      focusApplication: 'Apply this to your focus session: break your learning objective into minimal sub-units and master each before moving forward.',
      reflectionQuestion: 'How can you automate or eliminate repetitive cognitive friction in your daily learning workflow?'
    };
  } else {
    return {
      thesis: `Enduring business success surrounding "${title}" stems from compounding competitive advantage, rigorous capital/time allocation, and avoiding unforced errors.`,
      principles: [
        'Invert the Problem: Identify what guarantees failure and systematically engineer safety buffers against it.',
        'The Flywheel Effect: Consistent micro-advancements compound non-linearly into an unassailable moat.',
        'Skin in the Game: Align incentives so actions speak louder than theoretical consensus.'
      ],
      focusApplication: 'During this study block: audit your energy. Dedicate your sharpest mental hours to high-leverage tasks rather than low-impact admin.',
      reflectionQuestion: 'If you could only accomplish one single outcome today to consider it a 10/10 day, what would that outcome be?'
    };
  }
}
