import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API: Study Spark Synthesis powered by Gemini
app.post('/api/study-spark', async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        thesis: `Core analysis of "${title}": A foundational case study in ${category}.`,
        principles: [
          'First Principles Deconstruction: Break the problem into fundamental physical or logical truths.',
          'Focus Leverage: Eliminate peripheral noise to maximize compounding attention.',
          'Operational Velocity: High-frequency feedback loops outperform passive absorption.'
        ],
        focusApplication: 'Apply to this study block: define the single most vital sub-milestone before starting.',
        reflectionQuestion: 'What assumption in your current workflow needs to be re-examined?'
      });
    }

    const ai = new GoogleGenAI();
    const prompt = `You are a high-signal, minimalist study coach for deep-focus learners.
Synthesize the following subject into a sharp 3-minute executive study briefing for a student's focus break.

Subject: ${title}
Category: ${category}
Context: ${content || 'No additional content provided'}

Return valid JSON with these exact fields:
{
  "thesis": "A 1-2 sentence core thesis or profound insight",
  "principles": [
    "Principle 1 with concise explanation",
    "Principle 2 with concise explanation",
    "Principle 3 with concise explanation"
  ],
  "focusApplication": "1 concrete instruction for how to apply this to the student's next 25-minute focus session",
  "reflectionQuestion": "1 provocative reflection question for their focus break"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error) {
    console.error('Gemini API Error in /api/study-spark:', error);
    // Graceful fallback response
    return res.status(200).json({
      thesis: 'Profound achievements compound from consistent daily architecture rather than sporadic inspiration.',
      principles: [
        'Cognitive Simplification: Strip out social vanity and focus strictly on the decisive lever.',
        'Antifragility under Strain: Discomfort is the essential fuel for deliberate practice.',
        'Long-Horizon Compounding: Decisive mastery is built over months of quiet, sustained focus blocks.'
      ],
      focusApplication: 'Eliminate every open tab and notification for the upcoming session.',
      reflectionQuestion: 'What is the highest-value task you are avoiding right now?'
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kanso Focus server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
