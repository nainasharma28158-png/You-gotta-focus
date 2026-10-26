import { Article } from '../types';

const CURATED_STUDIES: Omit<Article, 'dateAdded'>[] = [
  // History Greats
  {
    id: 'hist_aurelius',
    category: 'History Greats',
    title: 'Marcus Aurelius & The Discipline of Assent',
    authorOrSubject: 'Marcus Aurelius',
    yearOrEra: '161–180 AD',
    readingTimeMinutes: 4,
    snippet: 'How the Roman Emperor insulated his mind from chaos during pandemic, rebellion, and total war.',
    content: `Marcus Aurelius ruled Rome during the Antonine Plague, continuous border wars along the Danube, and betrayal by his closest general. In his private journal—never intended for public consumption, known today as the Meditations—he formulated a practical cognitive architecture called the 'Discipline of Assent.'

Aurelius recognized that events themselves possess no intrinsic moral value or emotional charge. They are merely brute physical reality. Suffering and distraction occur only when the human mind affixes an unverified judgment to that reality.

When confronted with overwhelming administrative tasks, toxic advisers, or military setbacks, Aurelius practiced immediate cognitive disengagement: strip the situation down to its bare, neutral elements. If someone was insolent, it was simply an invariant characteristic of human nature. If a disaster struck, it was simply the cosmos unfolding according to natural law.

For modern deep work and knowledge focus, the lesson is severe and liberating: your focus is rarely broken by external noise; it is broken by your mind's emotional reaction to that noise. When you sit down for a 25-minute study block, no incoming message or wandering impulse can breach your focus unless you grant it assent.`,
    keyTakeaways: [
      'Events are inherently neutral; only your subjective interpretation causes anxiety or loss of focus.',
      'Strip modern disruptions of their false urgency: ask "Is this essential right now?"',
      'The inner citadel of the mind remains tranquil if you reserve assent for what is directly within your control.'
    ]
  },
  {
    id: 'hist_davinci',
    category: 'History Greats',
    title: 'Leonardo da Vinci & The Daily Curiosity Audit',
    authorOrSubject: 'Leonardo da Vinci',
    yearOrEra: '1452–1519',
    readingTimeMinutes: 4,
    snippet: 'How carrying a mirror-script notebook and cross-pollinating disciplines sparked relentless genius.',
    content: `Leonardo da Vinci possessed no formal university education and lacked classical Latin fluency. Yet he anticipated plate tectonics, fossil mechanics, cardiovascular valve function, and hydraulic engineering centuries ahead of his contemporaries.

His secret was not effortless divine spark, but an obsessive daily notebook habit. In his surviving codices, alongside anatomical sketches of the human heart, one finds daily inquiries such as:
- 'Measure the dimensions of Milan and its suburbs.'
- 'Observe how the tongue of a woodpecker fits inside its skull.'
- 'Ask Maestro Antonio how mortars are placed on bastions.'
- 'Why do bubbles in water form precise hemispheres?'

Da Vinci treated every domain as deeply entangled with every other. His understanding of fluid turbulence informed the curls of hair in the Mona Lisa; his study of optics informed the sfumato technique of shading; his understanding of bird wing aerodynamics informed his glider designs.

To achieve breakthrough focus, do not silo your learning. When studying business, look for biological analogies; when studying technology, inspect historical precedents. Curiosity is a compounding intellectual asset.`,
    keyTakeaways: [
      'Relentless curiosity requires active documentation: always record observations immediately.',
      'Breakthrough insights arise at the intersection of seemingly unrelated domains.',
      'Mastery is built through detailed firsthand observation rather than passive second-hand opinion.'
    ]
  },
  {
    id: 'hist_franklin',
    category: 'History Greats',
    title: 'Benjamin Franklin: The 13-Virtue Feedback Loop',
    authorOrSubject: 'Benjamin Franklin',
    yearOrEra: '1706–1790',
    readingTimeMinutes: 4,
    snippet: 'The systematic daily audit and 4-hour morning block that built a polymath, printer, and statesman.',
    content: `At age twenty, Benjamin Franklin conceived a bold plan for arriving at moral and intellectual perfection. Rather than trying to change all his habits simultaneously, he realized that willpower degrades under diffuse pressure. He codified 13 virtues (Temperance, Silence, Order, Resolution, Frugality, Industry, Sincerity, Justice, Moderation, Cleanliness, Tranquillity, Chastity, Humility).

He created a small pocket ledger with seven columns for each day of the week and thirteen rows. Each week, he concentrated intensely on one single virtue, allowing the others to remain on autopilot. In 13 weeks, he completed a full cycle; in a single year, he completed four full rotations.

Franklin's daily timetable was famously disciplined:
- 5:00 AM – 8:00 AM: Rise, wash, address Powerful Goodness, plan the day's business, resolve the day's study, breakfast.
- 8:00 AM – 12:00 PM: Deep focused labor.
- 12:00 PM – 2:00 PM: Read, overlook accounts, dine.
- 2:00 PM – 5:00 PM: Focused labor.
- 6:00 PM – 10:00 PM: Put things in their places, supper, music or diversion, examination of the day ("What good have I done today?").

By tracking his lapses in a physical ledger and maintaining strict 4-hour uninterrupted blocks, Franklin engineered his own intellectual compounding.`,
    keyTakeaways: [
      'Single-variable focus: tackle one behavioral or learning bottleneck at a time.',
      'Bookend your day: morning intention setting and evening audit keep learning deliberate.',
      'Uninterrupted 4-hour blocks yield more output than 10 hours of fragmented attention.'
    ]
  },
  {
    id: 'hist_curie',
    category: 'History Greats',
    title: 'Marie Curie: The Relentless Chemist of Radium',
    authorOrSubject: 'Marie Curie',
    yearOrEra: '1867–1934',
    readingTimeMinutes: 5,
    snippet: 'Sifting through pitchblende in a drafty wooden shed to isolate radioactive elements through pure grit.',
    content: `Marie Skłodowska Curie remains the only person in history to win Nobel Prizes in two different scientific domains: Physics (1903) and Chemistry (1911). Her path, however, was defined by physical hardship that would shatter modern researchers.

Working with her husband Pierre in an unheated, leaky wooden shed at the ESPCI that had previously served as a medical dissecting room, Marie spent four years isolating fractions of a gram of radium chloride from tons of uranium pitchblende tailings.

She spent eight to ten hours a day stirring boiling caldrons of industrial slag with an iron rod as tall as herself. In winter, temperatures dropped near freezing; in summer, noxious fumes suffocated the room because there was no chimney or ventilation hood.

Curie wrote in her notes: 'We were completely absorbed in our new field... We lived in a preoccupation as complete as that of a dream.' She ignored academic politics, scorned celebrity, and refused to patent the radium-isolation process so that global medicine could develop cancer therapies unhindered.

Focus is not a luxury provided by comfortable conditions; focus is the willful transcendence of difficult conditions in pursuit of objective truth.`,
    keyTakeaways: [
      'True breakthroughs demand high-density manual grinding before the elegant synthesis appears.',
      'Extreme focus acts as an anesthetic against harsh external environments.',
      'Dedication to open scientific progress compounds far more than short-term rent-seeking.'
    ]
  },

  // AI & Technology
  {
    id: 'tech_shannon',
    category: 'AI & Tech',
    title: 'Claude Shannon: The Architect of the Information Age',
    authorOrSubject: 'Claude Shannon',
    yearOrEra: '1948',
    readingTimeMinutes: 5,
    snippet: 'How one master’s thesis and a 1948 paper unified Boolean algebra, bits, and communication entropy.',
    content: `In 1937, a 21-year-old master's student at MIT named Claude Shannon published what has been called the most important master's thesis of the 20th century. Shannon proved that electrical switches (relays) could execute all the operations of George Boole's symbolic logic. Every digital computer processor operating on binary gates today traces directly to Shannon's insight.

Eleven years later, while working at Bell Labs, Shannon published 'A Mathematical Theory of Communication'. Before Shannon, communication engineers thought that if noise on a telephone line was high, data transmission would inevitably degrade into errors.

Shannon showed mathematically that every communication channel has a precise maximum capacity, known as the Shannon Limit ($C = B \\log_2(1 + S/N)$). As long as data is transmitted below this capacity, one can use error-correcting codes to transmit data with virtually zero errors, no matter how noisy the channel is.

Furthermore, Shannon coined the word 'bit' (binary digit) and defined information not as meaning, but as the reduction of uncertainty (Entropy: $H = -\\sum p_i \\log_2 p_i$).

Shannon's cognitive habit was playful detachment. He rode unicycles through Bell Labs corridors, juggled while reading, and built maze-solving robotic mice. Playful curiosity, combined with rigorous mathematical reductionism, uncovered the laws of the digital universe.`,
    keyTakeaways: [
      'Information is the reduction of uncertainty: focus on high-signal, low-entropy sources.',
      'Noisy environments can still achieve near-perfect transmission if you encode signal properly.',
      'Deep intellectual breakthroughs often come from seeing pure logic inside mechanical systems.'
    ]
  },
  {
    id: 'tech_transformer',
    category: 'AI & Tech',
    title: 'The Attention Mechanism & The Scaling Hypothesis',
    authorOrSubject: 'Vaswani et al. & Sutton',
    yearOrEra: '2017–Present',
    readingTimeMinutes: 5,
    snippet: 'Why discarding recurrence in favor of self-attention unlocked foundation models and emergent reasoning.',
    content: `In 2017, a team of eight researchers at Google published 'Attention Is All You Need'. Prior to this, natural language processing relied on Recurrent Neural Networks (RNNs) and LSTMs, which processed text word by word from left to right. This sequential dependency created a severe bottleneck: earlier words were forgotten over long sequences, and models could not be trained efficiently in parallel on GPU clusters.

The Transformer eradicated recurrence entirely. It introduced 'Multi-Head Self-Attention', which allows every token in an input sequence to attend to every other token simultaneously. A word like 'bank' can dynamically update its contextual embedding depending on whether 'river' or 'money' appears elsewhere in the document.

This architectural shift dovetailed directly with Rich Sutton's famous 2019 essay 'The Bitter Lesson': the biggest lesson from 70 years of AI research is that general methods that leverage computation (search and learning) ultimately crush human-crafted heuristics.

When combined with the Scaling Hypothesis (Kaplan et al., Chinchilla laws), training these architectures on vast computational clusters revealed emergent capabilities—in-context learning, code generation, and multi-step reasoning.

The architectural lesson for human learning: parallelizing your foundational inputs and letting concepts cross-attend is vastly superior to rigid sequential memorization.`,
    keyTakeaways: [
      'Self-attention allows every concept in memory to dynamically cross-reference every other concept.',
      'Scalable general mechanisms consistently defeat narrow human-engineered heuristics over time.',
      'Massive parallel exposure to foundational literature builds deep contextual representations.'
    ]
  },
  {
    id: 'tech_vonneumann',
    category: 'AI & Tech',
    title: 'John von Neumann & Mental Computational Velocity',
    authorOrSubject: 'John von Neumann',
    yearOrEra: '1903–1957',
    readingTimeMinutes: 5,
    snippet: 'The polymath who formulated the stored-program computer, game theory, and cellular automata.',
    content: `John von Neumann was widely considered by his peers—including Nobel laureates like Hans Bethe, Eugene Wigner, and Edward Teller—to possess the fastest brain in recorded history. Bethe observed: 'I have sometimes thought that a brain like von Neumann's indicates a species superior to that of man.'

Beyond his legendary lightning mental arithmetic, von Neumann revolutionized human civilization across four separate disciplines:
1. Quantum Mechanics: Established the rigorous mathematical foundation using Hilbert spaces.
2. Economics: Founded Game Theory with Oskar Morgenstern (minimax theorem, strategic equilibrium).
3. Computer Science: Codified the 'von Neumann Architecture'—separating CPU, memory, and bus—which remains the blueprint of every personal computer and smartphone in existence.
4. Cellular Automata: Proved that a machine could theoretically reproduce itself, laying the foundation for modern nanotechnology and DNA computing.

How did von Neumann work? He could write complex mathematical proofs in train stations while surrounded by noisy children; he craved background stimuli rather than absolute silence. Yet, his structural approach was to decompose any intractable paradox into its absolute core axioms, discarding all extraneous details until only the mathematical truth remained.`,
    keyTakeaways: [
      'Deconstruct complex problems into irreducible first principles and basic axioms.',
      'The ability to hold multiple formal abstractions in memory is the ultimate leverage in science.',
      'Deep work can thrive in imperfect environments if your internal problem-model is razor sharp.'
    ]
  },

  // Business & Strategy
  {
    id: 'biz_munger',
    category: 'Business',
    title: 'Charlie Munger: Inversion & The Latticework of Models',
    authorOrSubject: 'Charlie Munger',
    yearOrEra: '1924–2023',
    readingTimeMinutes: 5,
    snippet: 'Why the surest path to success is systematically identifying and eliminating points of failure.',
    content: `Charlie Munger, the longtime vice chairman of Berkshire Hathaway and Warren Buffett's intellectual partner, spent seventy years preaching the supremacy of multidisciplinary thinking and cognitive inversion.

Munger frequently quoted the 19th-century German mathematician Carl Jacobi: 'Man muss immer umkehren' (Invert, always invert). When faced with a complex ambition—such as building an enduring enterprise, maintaining mental sanity, or achieving career excellence—do not ask 'How do I succeed?'. Instead ask: 'What would guarantee catastrophic failure?'

If you want a business to fail, you would:
- Run out of cash.
- Rely on a single dishonest supplier.
- Alienate customers with opaque pricing.
- Foster internal bureaucratic politics.
- Ignore technological shifts.

Once you identify the vectors of destruction, you systematically construct safeguards against them. Success is largely the byproduct of consistently avoiding stupidity rather than trying to be brilliant.

Munger also argued that you cannot truly understand reality through a single lens (e.g. only economics). You must construct a 'latticework of mental models' borrowed from physics (critical mass), biology (evolutionary niches), psychology (incentive-caused bias), and engineering (redundancy and safety margins).`,
    keyTakeaways: [
      'Inversion: prevent catastrophic mistakes before seeking incremental optimization.',
      'Build a latticework of mental models across biology, physics, engineering, and psychology.',
      'Recognize the overwhelming power of incentives: "Never, ever think about something else when you should be thinking about the power of incentives."'
    ]
  },
  {
    id: 'biz_flywheel',
    category: 'Business',
    title: 'Jim Collins: The Flywheel Effect & Compounding Momentum',
    authorOrSubject: 'Jim Collins',
    yearOrEra: '2001',
    readingTimeMinutes: 4,
    snippet: 'Why enduring greatness is built through relentless incremental pushes in a single coherent direction.',
    content: `In his seminal management study Good to Great, Jim Collins addressed a persistent corporate illusion: the belief that extraordinary transformations happen through a single dramatic announcement, charismatic savior, or viral campaign.

Collins used the metaphor of a massive metal flywheel: a heavy disk mounted horizontally on an axle, thirty feet in diameter and weighing 5,000 pounds.

To get the flywheel spinning, you push with all your might. After an hour of exhausting effort, you've made one full rotation. You keep pushing. With continuous, focused effort, it completes a second rotation, then a third. 

Eventually, the weight of the heavy wheel begins working for you. Centrifugal force and momentum take over. Each push compounds upon the cumulative kinetic energy of all previous pushes. The flywheel turns faster and faster, generating unstoppable momentum.

When observers see the spinning flywheel, they ask: 'What was the single miracle turn that made it accelerate so fast?' The answer is: none of them. It was the compounded force of all the turns applied consistently in one direction.

The same rule governs personal focus and skill acquisition: a single 25-minute Pomodoro session will not make you an expert. But 4 sessions a day, sustained over 300 days, creates an intellectual flywheel that outpaces 99% of your peers.`,
    keyTakeaways: [
      'Enduring progress is a cumulative process, not an overnight event.',
      'Ensure every daily study block aligns with the same overarching flywheel direction.',
      'Momentum is hard to build but even harder to stop once kinetic energy compounds.'
    ]
  },
  {
    id: 'biz_grove',
    category: 'Business',
    title: 'Andy Grove: High Output Management & Strategic Inflection Points',
    authorOrSubject: 'Andy Grove',
    yearOrEra: '1983–1996',
    readingTimeMinutes: 5,
    snippet: 'Managing attention like a high-yield manufacturing fab and confronting 10X environmental shifts.',
    content: `Andy Grove escaped communist Hungary in 1956, earned a PhD in chemical engineering, and went on to lead Intel as CEO, transforming it into the premier semiconductor powerhouse of the modern world.

In his masterwork High Output Management, Grove established the fundamental theorem of executive productivity:
'A manager's output = the output of his organization + the output of the neighboring organizations under his influence.'

Grove applied rigorous process engineering to human attention. He emphasized 'Leverage': actions that produce high returns per unit of time invested. Examples of high-leverage activities include:
- Training your team (a 1-hour session compounds over months).
- Creating clear operational metrics that reveal bottleneck constraints.
- Establishing an unambiguous culture of intellectual honesty ('constructive confrontation').

Later, in Only the Paranoid Survive, Grove introduced the concept of the 'Strategic Inflection Point'—a moment in the life of a business when its fundamentals are about to change due to a '10X force' (such as the transition from mainframes to microprocessors, or the rise of the internet). In that crucible, Grove and Gordon Moore famously asked: 'If we got kicked out and the board brought in a new CEO, what would he do?' They walked out the door, walked back in, exited Intel's core memory business, and bet the entire company on microprocessors.

Detached objectivity about your own bottlenecks is the highest form of operational discipline.`,
    keyTakeaways: [
      'Focus your limited attention strictly on high-leverage activities that compound over time.',
      'Ruthlessly identify your operational bottlenecks: solve the limiting constraint first.',
      'Practice zero-base objectivity: if you started fresh today, what distractions would you cut immediately?'
    ]
  }
];

class KnowledgeService {
  private cacheKeyPrefix = 'kanso_focus_articles_';
  private bookmarksKey = 'kanso_focus_bookmarks';

  /**
   * Loads both live daily updates (Wikipedia & Tech feeds) and curated studies
   */
  public async getDailyKnowledge(forceRefresh = false): Promise<Article[]> {
    const todayStr = new Date().toISOString().slice(0, 10);
    const cached = localStorage.getItem(this.cacheKeyPrefix + todayStr);

    if (!forceRefresh && cached) {
      try {
        const parsed = JSON.parse(cached) as Article[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // invalid cache
      }
    }

    const liveArticles: Article[] = [];

    // 1. Fetch live historical events & figures for today's date via Wikipedia API
    try {
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');

      const [selectedRes, birthsRes] = await Promise.all([
        fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/${mm}/${dd}`).then(r => r.ok ? r.json() : null).catch(() => null),
        fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${mm}/${dd}`).then(r => r.ok ? r.json() : null).catch(() => null)
      ]);

      if (selectedRes && Array.isArray(selectedRes.selected)) {
        selectedRes.selected.slice(0, 3).forEach((item: { text: string; year: number; pages?: Array<{ titles: { normalized: string }; extract?: string; content_urls?: { desktop: { page: string } } }> }, idx: number) => {
          const page = item.pages && item.pages[0];
          const title = page ? `${item.year}: ${page.titles.normalized}` : `${item.year}: Historical Breakthrough`;
          liveArticles.push({
            id: `wiki_event_${idx}_${todayStr}`,
            category: 'History Greats',
            title,
            authorOrSubject: page ? page.titles.normalized : 'Historical Event',
            yearOrEra: String(item.year),
            readingTimeMinutes: 3,
            snippet: item.text,
            content: `${item.text}\n\n${page?.extract ? page.extract : 'On this exact calendar day, this landmark occurrence influenced geopolitical, technological, or social trajectories.'}`,
            keyTakeaways: [
              `Historical context: Occurred in the year ${item.year}.`,
              'Milestones illustrate how societal inflection points often compound from single decisive acts.',
              'Study past precedents to contextualize modern volatile shifts.'
            ],
            sourceUrl: page?.content_urls?.desktop?.page || 'https://en.wikipedia.org',
            isLiveUpdate: true,
            dateAdded: todayStr
          });
        });
      }

      if (birthsRes && Array.isArray(birthsRes.births)) {
        // Pick top notable figure born today
        const prominent = birthsRes.births.slice(0, 2);
        prominent.forEach((b: { text: string; year: number; pages?: Array<{ titles: { normalized: string }; extract?: string; content_urls?: { desktop: { page: string } } }> }, idx: number) => {
          const page = b.pages && b.pages[0];
          if (!page) return;
          liveArticles.push({
            id: `wiki_birth_${idx}_${todayStr}`,
            category: 'History Greats',
            title: `Born Today (${b.year}): ${page.titles.normalized}`,
            authorOrSubject: page.titles.normalized,
            yearOrEra: `b. ${b.year}`,
            readingTimeMinutes: 3,
            snippet: page.extract || b.text,
            content: `${b.text}\n\n${page.extract || 'Known for enduring contributions across their discipline.'}`,
            keyTakeaways: [
              `Pioneering figure born on this day in ${b.year}.`,
              'Enduring legacy built over decades of deliberate practice.',
              'Notice the common thread: mastery in their craft defined their historical impact.'
            ],
            sourceUrl: page.content_urls?.desktop?.page || 'https://en.wikipedia.org',
            isLiveUpdate: true,
            dateAdded: todayStr
          });
        });
      }
    } catch (e) {
      console.warn('Wikipedia live feed unavailable:', e);
    }

    // 2. Fetch live Tech & AI / Business discussions from Hacker News
    try {
      const topRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      if (topRes.ok) {
        const ids: number[] = await topRes.json();
        const topSlice = ids.slice(0, 8);
        const itemPromises = topSlice.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.ok ? r.json() : null).catch(() => null)
        );
        const stories = await Promise.all(itemPromises);

        stories.forEach((story: { id: number; title: string; by: string; score: number; url?: string } | null) => {
          if (!story || !story.title) return;
          const lower = story.title.toLowerCase();

          let category: 'AI & Tech' | 'Business' = 'AI & Tech';
          if (
            lower.includes('business') ||
            lower.includes('startup') ||
            lower.includes('economy') ||
            lower.includes('market') ||
            lower.includes('revenue') ||
            lower.includes('pricing') ||
            lower.includes('company')
          ) {
            category = 'Business';
          }

          liveArticles.push({
            id: `hn_${story.id}`,
            category,
            title: story.title,
            authorOrSubject: story.by,
            yearOrEra: 'Today',
            readingTimeMinutes: 3,
            snippet: `Current trending discussion in innovation & systems. Ranked with ${story.score} points by ${story.by}.`,
            content: `This research or industry development is currently trending at the top of engineering and entrepreneurial discussions.\n\nTitle: "${story.title}"\nSubmitted by: ${story.by}\nUpvotes: ${story.score}\n\nDiscussion focuses on emerging technical constraints, practical trade-offs, and downstream impacts for builders and researchers.`,
            keyTakeaways: [
              'Real-time pulse of modern technical innovation and commercialization.',
              'Examine the structural incentives driving adoption or debate around this topic.',
              'Identify whether this represents a fundamental shift or a transient cycle.'
            ],
            sourceUrl: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
            isLiveUpdate: true,
            dateAdded: todayStr
          });
        });
      }
    } catch (e) {
      console.warn('Tech feed unavailable:', e);
    }

    // 3. Assemble curated foundation studies
    const curatedWithDate = CURATED_STUDIES.map(study => ({
      ...study,
      dateAdded: todayStr
    }));

    // Combine live and curated
    const allArticles = [...liveArticles, ...curatedWithDate];

    try {
      localStorage.setItem(this.cacheKeyPrefix + todayStr, JSON.stringify(allArticles));
    } catch {
      // storage quota or private mode
    }

    return allArticles;
  }

  /**
   * Bookmarks management
   */
  public getBookmarkedIds(): string[] {
    try {
      const data = localStorage.getItem(this.bookmarksKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public toggleBookmark(articleId: string): boolean {
    const list = this.getBookmarkedIds();
    const idx = list.indexOf(articleId);
    let isBookmarked = false;
    if (idx >= 0) {
      list.splice(idx, 1);
      isBookmarked = false;
    } else {
      list.push(articleId);
      isBookmarked = true;
    }
    try {
      localStorage.setItem(this.bookmarksKey, JSON.stringify(list));
    } catch {
      // ignore
    }
    return isBookmarked;
  }
}

export const knowledgeService = new KnowledgeService();
