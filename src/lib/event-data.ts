export type EventCategory = "Robotics" | "Computer Science" | "Puzzle / Logic" | "School-Level";
export type EventLevel = "college" | "school";

export type EventRecord = {
  slug: string;
  name: string;
  category: EventCategory;
  level: EventLevel;
  date: string;
  venue: string;
  shortDescription: string;
  description: string;
  rules: string[];
  featured?: boolean;
};

export const events: EventRecord[] = [
  {
    slug: "robo-wars-arena",
    name: "Robo Wars Arena",
    category: "Robotics",
    level: "college",
    date: "2026-02-06T11:00:00+05:30",
    venue: "Main Combat Cage",
    shortDescription: "Battle-ready bots face off in a timed knockout arena.",
    description:
      "Teams engineer autonomous or manually controlled robots and compete in a high-impact elimination bracket.",
    rules: [
      "Maximum bot weight: 15kg.",
      "External flame or liquid systems are prohibited.",
      "Each match runs for 3 minutes with judges deciding unresolved rounds.",
    ],
    featured: true,
  },
  {
    slug: "line-tracer-x",
    name: "Line Tracer X",
    category: "Robotics",
    level: "college",
    date: "2026-02-05T10:00:00+05:30",
    venue: "Automation Lab",
    shortDescription: "Precision autonomous navigation through neon race tracks.",
    description:
      "Build a line-following robot optimized for speed, control, and stability across dynamic turns and disruptions.",
    rules: [
      "Track is revealed 30 minutes before race.",
      "Bots must run with onboard power only.",
      "Manual intervention adds penalty time.",
    ],
  },
  {
    slug: "code-siege-24",
    name: "Code Siege 24",
    category: "Computer Science",
    level: "college",
    date: "2026-02-07T09:00:00+05:30",
    venue: "Dev Grid Hall",
    shortDescription: "24-hour coding sprint with product + algorithm rounds.",
    description:
      "A full-stack buildathon where teams solve real-world challenge statements and ship working prototypes.",
    rules: [
      "Team size: 2 to 4 participants.",
      "Original source code only.",
      "Final judging includes technical depth and UX quality.",
    ],
    featured: true,
  },
  {
    slug: "capture-the-stack",
    name: "Capture The Stack",
    category: "Computer Science",
    level: "college",
    date: "2026-02-06T14:00:00+05:30",
    venue: "Security Bay",
    shortDescription: "Cybersecurity CTF with web, crypto, and reverse challenges.",
    description:
      "Participants attack and defend systems in a controlled CTF environment with progressive difficulty flags.",
    rules: [
      "Internet usage limited to official challenge domains.",
      "Flag sharing leads to disqualification.",
      "Bring your own laptop with local tooling pre-installed.",
    ],
  },
  {
    slug: "neuro-puzzle-rift",
    name: "Neuro Puzzle Rift",
    category: "Puzzle / Logic",
    level: "college",
    date: "2026-02-05T13:00:00+05:30",
    venue: "Mind Arena",
    shortDescription: "Cryptic clues, logic grids, and timed elimination rounds.",
    description:
      "A rapid sequence of brain-game stages focused on pattern recognition, deduction, and computational thinking.",
    rules: [
      "Solo participation only.",
      "No external electronic aids allowed.",
      "Top 12 from prelims advance to finals.",
    ],
  },
  {
    slug: "data-detective-jr",
    name: "Data Detective Jr.",
    category: "School-Level",
    level: "school",
    date: "2026-02-06T09:30:00+05:30",
    venue: "Junior Innovation Room",
    shortDescription: "School students solve visual data puzzles and story problems.",
    description:
      "A beginner-friendly analytics challenge that teaches chart reading, reasoning, and quick decision-making.",
    rules: [
      "Grades 8 to 12 eligible.",
      "Team size: 2 students.",
      "School ID is mandatory at check-in.",
    ],
    featured: true,
  },
  {
    slug: "school-robot-sprint",
    name: "School Robot Sprint",
    category: "School-Level",
    level: "school",
    date: "2026-02-07T10:00:00+05:30",
    venue: "Junior Robotics Lane",
    shortDescription: "Assemble and race beginner bots in guided mini-missions.",
    description:
      "Students receive standard kits and complete speed and accuracy challenges under mentor supervision.",
    rules: [
      "Open to school teams only.",
      "Only provided kit components may be used.",
      "Two mission retries allowed.",
    ],
  },
  {
    slug: "cipher-chase",
    name: "Cipher Chase",
    category: "Puzzle / Logic",
    level: "college",
    date: "2026-02-07T15:00:00+05:30",
    venue: "Cryptic Zone",
    shortDescription: "Decode layered ciphers and unlock the final vault.",
    description:
      "A team-based puzzle gauntlet featuring substitution ciphers, steganography, and lateral logic constraints.",
    rules: [
      "Team size: 2.",
      "No phones in puzzle arena.",
      "Hints are available with score penalties.",
    ],
  },
];

export const categories: { title: EventCategory; tone: string; description: string }[] = [
  {
    title: "Robotics",
    tone: "Cyan circuits + mechanical textures",
    description: "Combat systems, autonomous builds, and hardware speed trials.",
  },
  {
    title: "Computer Science",
    tone: "Terminal grids + high-contrast overlays",
    description: "Coding marathons, security games, and software engineering battles.",
  },
  {
    title: "Puzzle / Logic",
    tone: "Abstract symbols + deep contrast blocks",
    description: "Riddles, pattern-matching, and brain-intensive elimination rounds.",
  },
  {
    title: "School-Level",
    tone: "Energetic neon with cleaner onboarding",
    description: "Junior-friendly events crafted for curious school innovators.",
  },
];

export function getFeaturedEvents(): EventRecord[] {
  return events.filter((event) => event.featured).slice(0, 3);
}

export function getEventBySlug(slug: string): EventRecord | undefined {
  return events.find((event) => event.slug === slug);
}

export function getFilteredEvents(search = "", category = "all", level = "all"): EventRecord[] {
  const term = search.toLowerCase().trim();

  return events.filter((event) => {
    const matchesSearch =
      term.length === 0 ||
      event.name.toLowerCase().includes(term) ||
      event.shortDescription.toLowerCase().includes(term);

    const matchesCategory = category === "all" || event.category === category;
    const matchesLevel = level === "all" || event.level === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });
}
