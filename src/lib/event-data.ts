export type EventCategory = "Robotics" | "Computer Science" | "Puzzle / Logic" | "School-Level" | "Mechanical" | "Management" | "Innovation" | "General";
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
  registrationFee: number;
};

export const events: EventRecord[] = [
  {
    slug: "robowar-15kg",
    name: "ROBOWAR (15KG)",
    category: "Robotics",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "ROBOWAR ARENA",
    shortDescription: "High-impact 15kg robot combat elimination.",
    description: "The ultimate showdown of 15kg robots in an elimination bracket.",
    rules: ["Weight limit: 15kg", "Matches last 3 minutes", "No fire or liquid weapons"],
    featured: true,
    registrationFee: 1500
  },
  {
    slug: "robowar-8kgs",
    name: "ROBOWAR (8KGS)",
    category: "Robotics",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "ROBOWAR ARENA",
    shortDescription: "Mid-weight robot combat battle.",
    description: "8kg robots face off in a test of engineering and driving skill.",
    rules: ["Weight limit: 8kg", "Standard arena rules apply"],
    registrationFee: 1000
  },
  {
    slug: "robowar-3lbs",
    name: "ROBOWAR (3LBS)",
    category: "Robotics",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "ROBOWAR ARENA",
    shortDescription: "Lightweight beetleweight robot combat.",
    description: "Small but fierce 3lbs robots clash in a high-speed arena.",
    rules: ["Weight limit: 3lbs", "Fast-paced elimination"],
    registrationFee: 500
  },
  {
    slug: "robo-sumo",
    name: "ROBO SUMO",
    category: "Robotics",
    level: "college",
    date: "2026-04-30T10:00:00+05:30",
    venue: "AITD FOYER",
    shortDescription: "Autonomous bots pushing each other out of the ring.",
    description: "A battle of strength and sensors where bots try to push opponents out of the circular arena.",
    rules: ["Autonomous bots only", "Standard sumo ring dimensions"],
    registrationFee: 250
  },
  {
    slug: "robo-tug-of-war",
    name: "ROBO TUG OF WAR",
    category: "Robotics",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "GYMKHANA",
    shortDescription: "Test of raw torque and traction.",
    description: "Two robots linked by a rope try to pull the other across the center line.",
    rules: ["Maximum weight: 10kg", "No spiked wheels"],
    registrationFee: 200
  },
  {
    slug: "fifa",
    name: "FIFA",
    category: "General",
    level: "college",
    date: "2026-04-30T10:00:00+05:30",
    venue: "SY MBA",
    shortDescription: "E-sports football tournament.",
    description: "Compete in the virtual arena for the ultimate football glory.",
    rules: ["Standard match time", "Group stages followed by knockouts"],
    registrationFee: 100
  },
  {
    slug: "bridge-construction",
    name: "BRIDGE CONSTRUCTION",
    category: "Mechanical",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "DHM1",
    shortDescription: "Structural engineering challenge.",
    description: "Build the strongest bridge using limited materials and test its load capacity.",
    rules: ["Materials provided", "Weight-to-load ratio judging"],
    registrationFee: 150
  },
  {
    slug: "robo-soccer",
    name: "ROBO SOCCER",
    category: "Robotics",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "AITD FOYER",
    shortDescription: "Remote-controlled robots playing football.",
    description: "Score goals against opponents in this mechanical adaptation of the beautiful game.",
    rules: ["3 vs 3 robots", "5-minute halves"],
    registrationFee: 300
  },
  {
    slug: "coding-event",
    name: "CODING EVENT",
    category: "Computer Science",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "LBC5, LBC6",
    shortDescription: "Competitive programming marathon.",
    description: "Solve algorithmic challenges under time pressure.",
    rules: ["No internet usage", "Multiple language support"],
    featured: true,
    registrationFee: 150
  },
  {
    slug: "clash-royal",
    name: "CLASH ROYAL",
    category: "General",
    level: "college",
    date: "2026-04-30T10:00:00+05:30",
    venue: "LHC4",
    shortDescription: "Mobile strategy gaming tournament.",
    description: "Battle it out in the arena with your best decks.",
    rules: ["Friendly battle levels", "Single elimination"],
    registrationFee: 50
  },
  {
    slug: "capture-the-flag",
    name: "CAPTURE THE FLAG",
    category: "Computer Science",
    level: "college",
    date: "2026-04-30T10:00:00+05:30",
    venue: "LBC4",
    shortDescription: "Cybersecurity hacking challenge.",
    description: "Find hidden flags by exploiting vulnerabilities in a controlled environment.",
    rules: ["Solo or team of 2", "Strict no-attack policy on servers"],
    registrationFee: 200
  },
  {
    slug: "line-follower-robot",
    name: "LINE FOLLOWER ROBOT",
    category: "Robotics",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "LHE 2, 3",
    shortDescription: "Autonomous navigation on predefined paths.",
    description: "Fastest robot to complete the black line track wins.",
    rules: ["Standard track width", "Two trials allowed"],
    registrationFee: 200
  },
  {
    slug: "treasure-hunt",
    name: "TREASURE HUNT",
    category: "General",
    level: "college",
    date: "2026-04-29T10:00:00+05:30",
    venue: "ECE TUTORIAL HALL",
    shortDescription: "Clue-based campus scavenger hunt.",
    description: "Solve riddles and find items across the campus.",
    rules: ["Teams of 3", "Time-based completion"],
    registrationFee: 150
  },
  {
    slug: "project-presentation",
    name: "PROJECT PRESENTATION",
    category: "General",
    level: "college",
    date: "2026-04-30T10:00:00+05:30",
    venue: "SEMINAR HALL",
    shortDescription: "Showcase your technical innovations.",
    description: "Present your research or projects to a panel of experts.",
    rules: ["10-minute presentation", "Q&A session"],
    registrationFee: 150
  },
  {
    slug: "virtual-cricket",
    name: "VIRTUAL CRICKET",
    category: "General",
    level: "college",
    date: "2026-04-29T10:00:00+05:30",
    venue: "LIBRARY",
    shortDescription: "E-sports cricket simulation.",
    description: "Show off your batting and bowling skills in the virtual world.",
    rules: ["5 overs per match", "Limited tournament slots"],
    registrationFee: 100
  },
  {
    slug: "circuit-simulation",
    name: "CIRCUIT SIMULATION",
    category: "Computer Science",
    level: "college",
    date: "2026-04-30T10:00:00+05:30",
    venue: "LBE 2, 3, 4, 5, 6",
    shortDescription: "Hardware logic and design challenge.",
    description: "Design and simulate complex electronic circuits under time constraints.",
    rules: ["Simulation software provided", "Accuracy and speed judging"],
    registrationFee: 100
  },
  {
    slug: "business-pitch",
    name: "BUSINESS PITCH",
    category: "Management",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "FY MBA",
    shortDescription: "Startup idea and business plan showcase.",
    description: "Pitch your next big business idea to potential investors.",
    rules: ["Pitch deck required", "5-minute pitch duration"],
    registrationFee: 150
  },
  {
    slug: "robo-maze-solver",
    name: "ROBO MAZE SOLVER",
    category: "Robotics",
    level: "college",
    date: "2026-04-29T11:00:00+05:30",
    venue: "LHC3, LHC2",
    shortDescription: "Autonomous navigation through complex mazes.",
    description: "Code your robot to find the exit in the shortest time possible.",
    rules: ["No manual override", "Maze mapping algorithm required"],
    registrationFee: 250
  },
  {
    slug: "robo-race",
    name: "ROBO RACE",
    category: "Robotics",
    level: "college",
    date: "2026-04-30T10:00:00+05:30",
    venue: "BASKETBALL COURT",
    shortDescription: "High-speed mechanical racing event.",
    description: "Race your robots through an obstacle-filled outdoor track.",
    rules: ["Remote controlled or autonomous", "Fastest lap wins"],
    registrationFee: 300
  },
  {
    slug: "hackathon",
    name: "HACKATHON",
    category: "Innovation",
    level: "college",
    date: "2026-04-29T14:00:00+05:30",
    venue: "MULTIPURPOSE HALL",
    shortDescription: "24-hour product buildathon.",
    description: "Build a working prototype for a real-world problem statement.",
    rules: ["24-hour duration", "Team size: 2-4", "Original code only"],
    featured: true,
    registrationFee: 500
  },
  {
    slug: "symmetry-art",
    name: "SYMMETRY ART",
    category: "General",
    level: "college",
    date: "2026-04-29T10:00:00+05:30",
    venue: "PHYSICS LAB",
    shortDescription: "Mathematical art competition.",
    description: "Create stunning visuals using geometric symmetry principles.",
    rules: ["Design on site", "Materials provided"],
    registrationFee: 50
  },
  {
    slug: "structomat",
    name: "STRUCTOMAT",
    category: "Mechanical",
    level: "college",
    date: "2026-04-29T10:00:00+05:30",
    venue: "DHM2",
    shortDescription: "Mechanical modeling and design.",
    description: "Assemble or design a mechanical structure based on the prompt.",
    rules: ["Time-bound challenge", "Judging based on stability and design"],
    registrationFee: 100
  }
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
    title: "Mechanical",
    tone: "Solid steel + structural industrial themes",
    description: "Bridges, modeling, and core engineering structures.",
  },
  {
    title: "Management",
    tone: "Corporate neon + strategic data overlays",
    description: "Business plans, pitches, and startup logic.",
  },
  {
    title: "Innovation",
    tone: "Gold circuitry + futuristic prototypes",
    description: "Hackathons and product-building marathons.",
  },
  {
    title: "General",
    tone: "Vibrant neon + varied textures",
    description: "E-sports, art, and scavenger hunts.",
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
