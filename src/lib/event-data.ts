export type EventCategory = "Robotics" | "Computer Science" | "Mechanical" | "Management" | "Innovation" | "General";
export type EventLevel = "college" | "school" | "higher secondary";

export type Coordinator = {
  name: string;
  phone: string;
};

export type EventFormConfig = {
  minParticipants: number;
  maxParticipants: number;
  hasTeamName?: boolean;
  isRobowar?: boolean;
};

export type EventRecord = {
  slug: string;
  name: string;
  category: EventCategory;
  level: EventLevel;
  date: string;
  time: string;
  venue: string;
  shortDescription: string;
  description: string;
  rules: string[];
  rulebookUrl?: string;
  image?: string;
  featured?: boolean;
  registrationFee: number | string;
  feeDetails?: string;
  prizePool?: string;
  flair?: "Gold" | "Silver" | "Bronze" | "Flagship";
  prizes?: {
    first?: string;
    second?: string;
  };
  coordinators: Coordinator[];
  formConfig?: EventFormConfig;
};

export const events: EventRecord[] = [
  // FLAGSHIP EVENTS
  {
    slug: "robowar-15kg",
    name: "ROBOWAR (15KG)",
    category: "Robotics",
    level: "college",
    date: "29-30 April 2026",
    time: "11AM ONWARDS",
    venue: "Robowars Arena AITD",
    shortDescription: "Heavyweight robot combat (15KG).",
    description: "The ultimate heavyweight battle in the arena. High-octane mechanical warfare.",
    rules: ["Weight limit: 15kg", "Matches last 3 minutes", "No fire or liquid weapons"],
    registrationFee: 1180,
    prizePool: "₹2,00,000 (Combined)",
    featured: true,
    flair: "Flagship",
    image: "/event-pics/Event pics/ROBOWAR.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1XPS_037_vhqvbRNxtHjZSAylT601gTvs/view?usp=drive_link",
    coordinators: [
      { name: "Yash Karekar", phone: "7498686247" },
      { name: "Yash Sanikop", phone: "8177963886" },
      { name: "Anay Govekar", phone: "8459341728" },
      { name: "Vedansh Dhargalkar", phone: "7720907356" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true, isRobowar: true }
  },
  {
    slug: "robowar-8kgs",
    name: "ROBOWAR (8KGS)",
    category: "Robotics",
    level: "college",
    date: "29-30 April 2026",
    time: "11AM ONWARDS",
    venue: "Robowars Arena AITD",
    shortDescription: "Mid-weight robot combat (8KG).",
    description: "Intense mid-weight mechanical showdown.",
    rules: ["Weight limit: 8kg", "Standard arena protocols apply"],
    registrationFee: 944,
    prizePool: "₹2,00,000 (Combined)",
    flair: "Flagship",
    image: "/event-pics/Event pics/ROBOWAR.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1XPS_037_vhqvbRNxtHjZSAylT601gTvs/view?usp=drive_link",
    coordinators: [
      { name: "Yash Karekar", phone: "7498686247" },
      { name: "Yash Sanikop", phone: "8177963886" },
      { name: "Anay Govekar", phone: "8459341728" },
      { name: "Vedansh Dhargalkar", phone: "7720907356" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true, isRobowar: true }
  },
  {
    slug: "robowar-3lbs",
    name: "ROBOWAR (3LBS)",
    category: "Robotics",
    level: "college",
    date: "29-30 April 2026",
    time: "11AM ONWARDS",
    venue: "Robowars Arena AITD",
    shortDescription: "Beetleweight robot combat (3LBS).",
    description: "Fast-paced small-scale mechanical destruction.",
    rules: ["Weight limit: 3lbs", "High-speed combat sequences"],
    registrationFee: 590,
    prizePool: "₹2,00,000 (Combined)",
    flair: "Flagship",
    image: "/event-pics/Event pics/ROBOWAR.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1XPS_037_vhqvbRNxtHjZSAylT601gTvs/view?usp=drive_link",
    coordinators: [
      { name: "Yash Karekar", phone: "7498686247" },
      { name: "Yash Sanikop", phone: "8177963886" },
      { name: "Anay Govekar", phone: "8459341728" },
      { name: "Vedansh Dhargalkar", phone: "7720907356" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true, isRobowar: true }
  },
  // GOLD EVENTS
  {
    slug: "robo-nexus",
    name: "ROBO NEXUS",
    category: "Robotics",
    level: "college",
    date: "30 April 2026",
    time: "10AM ONWARDS",
    venue: "Admin Block AITD",
    flair: "Gold",
    shortDescription: "Autonomous Robo Sumo wrestling.",
    description: "Push your opponent out of the ring in this high-tech sumo battle.",
    rules: ["Autonomous bots only", "Standard sumo ring dimensions"],
    registrationFee: 472,
    prizePool: "₹30,000",
    image: "/event-pics/Event pics/ROBO SUMO.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1dJXMtRVHhAv0Rgci5cJ-lmoRr9A_SYm3/view?usp=drive_link",
    coordinators: [
      { name: "Vedh Naik", phone: "8010362301" },
      { name: "Saitesh Kalangutkar", phone: "7972524953" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "cyber-strike",
    name: "CYBER STRIKE",
    category: "Robotics",
    level: "college",
    date: "29 April 2026",
    time: "11AM ONWARDS",
    venue: "AITD FOYER",
    flair: "Gold",
    shortDescription: "1v1 remote-controlled robot soccer combat.",
    description: "One bot vs another in a high-octane mechanical football match. Score more goals to dominate the pitch.",
    rules: ["1 vs 1 format", "Knockout matches: 2 minutes", "Quarter/Semi-finals: 2 minutes", "Finals: 3 minutes"],
    registrationFee: 413,
    prizePool: "₹20,000",
    image: "/event-pics/Event pics/ROBO SOCCER.jpg",
    rulebookUrl: "https://drive.google.com/file/d/12ti-eQ3F0D6y8c9wUu5_N4U51UZMQm3V/view?usp=drive_link",
    coordinators: [
      { name: "Dia Saji", phone: "9699259703" },
      { name: "Rohan Saikar", phone: "8007944512" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "grid-runner",
    name: "GRID RUNNER",
    category: "Robotics",
    level: "college",
    date: "29 April 2026",
    time: "11AM ONWARDS",
    venue: "LHE 2,3",
    flair: "Gold",
    shortDescription: "Autonomous navigation on predefined paths.",
    description: "Fastest robot to complete the black line track wins.",
    rules: ["Standard track width", "Two trials allowed"],
    registrationFee: 295,
    prizePool: "₹10,000",
    prizes: {
      first: "₹6,000",
      second: "₹4,000"
    },
    image: "/event-pics/Event pics/LINE FOLLOWER ROBOT.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1W66mGxViAOhifhpYGckMq9sFF7L-qmJQ/view?usp=drive_link",
    coordinators: [
      { name: "Dakshesh Verma", phone: "9834095981" },
      { name: "Soham Polle", phone: "9307207645" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true }
  },
  {
    slug: "santo-domingo-race",
    name: "SANTO DOMINGO RACE",
    category: "Robotics",
    level: "college",
    date: "30 April 2026",
    time: "10AM ONWARDS",
    venue: "G-Block AITD",
    flair: "Gold",
    shortDescription: "High-speed mechanical racing event.",
    description: "Race your robots through an obstacle-filled track.",
    rules: ["Fastest lap wins", "Max 2 trials allowed"],
    registrationFee: 354,
    feeDetails: "Re-entry: ₹177",
    prizePool: "₹15,000",
    image: "/event-pics/Event pics/ROBO RACE.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1hYVl98mLUTZ3QssM7LcQdxVDwXDVyD2Y/view?usp=drive_link",
    coordinators: [
      { name: "Sanjana Vaday", phone: "9226013380" },
      { name: "Tanisha Kolhar", phone: "8767254192" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true }
  },
  // SILVER EVENTS
  {
    slug: "cyber-tug",
    name: "CYBER TUG",
    category: "Robotics",
    level: "college",
    date: "29 April 2026",
    time: "11AM ONWARDS",
    venue: "Sport Gymkhana AITD",
    flair: "Silver",
    shortDescription: "Test of raw torque and traction.",
    description: "Pull your opponent across the center line using pure mechanical force.",
    rules: ["Maximum weight: 5kg", "No spiked wheels"],
    registrationFee: 354,
    prizePool: "₹15,000",
    image: "/event-pics/Event pics/ROBO TUG OF WAR.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1aweeTCfdJ07CmuW0WNv11MbEYtY4AKei/view?usp=drive_link",
    coordinators: [
      { name: "Shreyas Manerikar", phone: "8830018722" },
      { name: "Vikas Ghotane", phone: "8767526594" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "escape-the-matrix",
    name: "ESCAPE THE MATRIX",
    category: "Computer Science",
    level: "college",
    date: "29 April 2026",
    time: "11AM ONWARDS",
    venue: "LBC5, LBC6",
    flair: "Silver",
    shortDescription: "Competitive programming marathon.",
    description: "Solve algorithmic challenges under time pressure.",
    rules: ["Teams of two participants", "No internet usage"],
    registrationFee: 118,
    prizePool: "₹10,000",
    image: "/event-pics/Event pics/CODING EVENT.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1yMHIsVTduOjoBDaCx4q6NLR4ndZiRVr4/view?usp=drive_link",
    coordinators: [
      { name: "Myron Dcruz", phone: "7378389612" },
      { name: "Ashwith Shetty", phone: "7218694977" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "innovibe",
    name: "INNOVIBE",
    category: "Innovation",
    level: "college",
    date: "30 April 2026",
    time: "10AM - 5PM",
    venue: "Seminar Hall AITD",
    flair: "Silver",
    shortDescription: "Showcase your technical innovations.",
    description: "Present your research or projects to a panel of experts.",
    rules: ["10-minute presentation", "Prototype demonstration"],
    registrationFee: 236,
    prizePool: "₹20,000",
    prizes: {
      first: "₹12,000",
      second: "₹8,000"
    },
    image: "/event-pics/Event pics/PROJECT PRESENTATION.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1f1GTzgGK7CRSUVHeIwlamDld3S0em-Xs/view?usp=drive_link",
    coordinators: [
      { name: "Joyce Martins", phone: "8767179587" },
      { name: "Rudra Malvankar", phone: "9145450734" }
    ],
    formConfig: { minParticipants: 4, maxParticipants: 4, hasTeamName: true }
  },
  {
    slug: "kabuki-roundabout",
    name: "KABUKI ROUNDABOUT",
    category: "Robotics",
    level: "college",
    date: "29 April 2026",
    time: "11AM ONWARDS",
    venue: "LHC2, LHC3",
    flair: "Silver",
    shortDescription: "Autonomous navigation through complex mazes.",
    description: "Code your robot to find the exit in the shortest time.",
    rules: ["Time-based scoring", "No manual override"],
    registrationFee: 354,
    feeDetails: "Re-entry: ₹177",
    prizePool: "₹10,000",
    image: "/event-pics/Event pics/ROBO MAZE SOLVER.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1x0RhL2zKUPvrOcfGfN9dYqMjHADjIfHQ/view?usp=drive_link",
    coordinators: [
      { name: "Deesh Naik", phone: "9146480787" },
      { name: "Shourya Dhupkar", phone: "8010909892" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true }
  },
  // BRONZE EVENTS
  {
    slug: "neon-span",
    name: "NEON SPAN",
    category: "Mechanical",
    level: "college",
    date: "29 April 2026",
    time: "11AM ONWARDS",
    venue: "Thermal Lab AITD",
    flair: "Bronze",
    shortDescription: "Structural engineering challenge.",
    description: "Build the strongest bridge using limited materials.",
    rules: ["Materials provided", "Weight-to-load ratio judging"],
    registrationFee: 295,
    prizePool: "₹8,000",
    image: "/event-pics/Event pics/BRIDGE CONSTRUCTION.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1DHHXEtVJsPdLk1XP8wM30hCi0SmXYhnA/view?usp=drive_link",
    coordinators: [
      { name: "Samuel Pinto", phone: "8830472562" },
      { name: "Joaquim", phone: "8766596447" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "ghostgrid",
    name: "GHOSTGRID",
    category: "Computer Science",
    level: "college",
    date: "30 April 2026",
    time: "10AM ONWARDS",
    venue: "LBC4",
    flair: "Bronze",
    shortDescription: "Cybersecurity hacking challenge.",
    description: "Find hidden flags by exploiting vulnerabilities.",
    rules: ["Teams of two participants", "No DoS attacks allowed"],
    registrationFee: 118,
    prizePool: "₹10,000",
    image: "/event-pics/Event pics/CAPTURE THE FLAG.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1uC95XNA0QrunE9-R0UeFDnUYBwQ_No3b/view?usp=drive_link",
    coordinators: [
      { name: "Samson Sequeira", phone: "9607560849" },
      { name: "Shrish Bordekar", phone: "9356826227" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "circuit-breach",
    name: "CIRCUIT BREACH",
    category: "Computer Science",
    level: "college",
    date: "30 April 2026",
    time: "10AM - 5PM",
    venue: "LBE 2-6 AITD",
    flair: "Bronze",
    shortDescription: "Hardware logic and design challenge.",
    description: "Design and simulate complex electronic circuits.",
    rules: ["Accuracy and speed metrics", "Standard gear provided"],
    registrationFee: 236,
    prizePool: "₹10,000",
    prizes: {
      first: "₹6,000",
      second: "₹4,000"
    },
    image: "/event-pics/Event pics/CIRCUIT SIMULATION.png",
    rulebookUrl: "https://drive.google.com/file/d/1YliI8ogw5WXyXKSpXrUJ3De6g5kGQ6og/view?usp=sharing",
    coordinators: [
      { name: "Joel D'Lima", phone: "8605675478" },
      { name: "Jaeden", phone: "9356320798" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "war-room-protocol",
    name: "WAR ROOM PROTOCOL",
    category: "Management",
    level: "college",
    date: "29 April 2026",
    time: "11AM ONWARDS",
    venue: "FY MBA Classroom AITD",
    flair: "Bronze",
    shortDescription: "Startup idea and business plan showcase.",
    description: "Pitch your next big business idea to potential investors.",
    rules: ["5-minute pitch duration", "Pitch deck required"],
    registrationFee: 236,
    prizePool: "₹8,000",
    prizes: {
      first: "₹5,000",
      second: "₹3,000"
    },
    image: "/event-pics/Event pics/BUSINESS PITCH.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1os_PVFEhQxYh91D7bczSxSXysCz6j-mY/view?usp=drive_link",
    coordinators: [
      { name: "Valora Ferrao", phone: "9765953309" }
    ],
    formConfig: { minParticipants: 3, maxParticipants: 3, hasTeamName: true }
  },
  // NO FLAIR EVENTS
  {
    slug: "pixel-play",
    name: "PIXEL PLAY",
    category: "General",
    level: "college",
    date: "30 April 2026",
    time: "10AM ONWARDS",
    venue: "MBA AITD",
    shortDescription: "E-sports football tournament.",
    description: "Compete in the virtual pitch for the ultimate football glory.",
    rules: ["Standard match rules apply", "Knockout format"],
    registrationFee: 295,
    feeDetails: "Re-entry: ₹236",
    prizePool: "₹8,000",
    image: "/event-pics/Event pics/FIFA.jpg",
    rulebookUrl: "https://drive.google.com/file/d/11JRb87sZshPqcO3nYzPm3Y-DXxXpPlzV/view?usp=drive_link",
    coordinators: [
      { name: "Aaryan Desai", phone: "8007249603" },
      { name: "Jaydeep Rane", phone: "7498965325" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "clashpunk",
    name: "CLASHPUNK",
    category: "General",
    level: "college",
    date: "30 April 2026",
    time: "10AM ONWARDS",
    venue: "LHC4 AITD",
    shortDescription: "Mobile strategy gaming tournament.",
    description: "Battle it out in the arena with your best decks.",
    rules: ["Tournament standard levels", "Single elimination"],
    registrationFee: 59,
    prizePool: "₹3,000",
    image: "/event-pics/Event pics/CLASH ROYALE.png",
    rulebookUrl: "https://drive.google.com/file/d/1LIGLk4pOJPsvWeuRkp-Mkx4qCt2gH29b/view?usp=drive_link",
    coordinators: [
      { name: "Areeb Shaikh", phone: "9730405881" },
      { name: "Mukund Mahambrey", phone: "9405332300" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "the-cypher-heist",
    name: "THE CYPHER HEIST",
    category: "General",
    level: "college",
    date: "29 April 2026",
    time: "10AM - 5PM",
    venue: "AITD (ECE Tutorial Hall)",
    shortDescription: "Clue-based campus scavenger hunt.",
    description: "Solve riddles and find items across the campus.",
    rules: ["Teams of 4", "Time-based completion"],
    registrationFee: 295,
    prizePool: "₹10,000",
    prizes: {
      first: "₹6,000",
      second: "₹4,000"
    },
    image: "/event-pics/Event pics/TREASURE HUNT.png",
    rulebookUrl: "https://drive.google.com/file/d/10AUc8vzH4wolM3I6plRyrzYvOp_kSdjH/view?usp=drive_link",
    coordinators: [
      { name: "Arya Bandiwadekar", phone: "9146973373" },
      { name: "Dikshita Kotharkar", phone: "9579376865" }
    ],
    formConfig: { minParticipants: 4, maxParticipants: 4, hasTeamName: true }
  },
  {
    slug: "cyber-smashers",
    name: "CYBER SMASHERS",
    category: "General",
    level: "college",
    date: "29-30 April 2026",
    time: "10AM - 5PM",
    venue: "Library AITD",
    shortDescription: "E-sports cricket simulation. (Only batting no bowling)",
    description: "Show off your batting skills in the virtual world. (Only batting no bowling)",
    rules: ["5-over matches", "Knockout format"],
    registrationFee: 59,
    prizePool: "₹3,000",
    image: "/event-pics/Event pics/VIRTUAL CRICKET.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1odzOBF6j_ENm5Hr30fyrTFCPFViSYtfg/view?usp=drive_link",
    coordinators: [
      { name: "Soham Joshi", phone: "9922967609" },
      { name: "Shuban", phone: "7414993238" }
    ],
    formConfig: { minParticipants: 1, maxParticipants: 2, hasTeamName: true }
  },
  {
    slug: "techyothon",
    name: "TECHYOTHON",
    category: "Innovation",
    level: "college",
    date: "29-30 April 2026",
    time: "2PM-2PM(24HRS)",
    venue: "Multipurpose Hall AITD",
    shortDescription: "24-hour product buildathon.",
    description: "Build a working prototype for a real-world problem.",
    rules: ["24-hour duration", "Team size: 2-4"],
    registrationFee: 590,
    prizePool: "₹30,000",
    featured: true,
    image: "/event-pics/Event pics/HACKATHON.png",
    rulebookUrl: "https://drive.google.com/file/d/1TVoT0c1R3zBNAZbxAPlAgAqh2SSUsLBO/view?usp=drive_link",
    coordinators: [
      { name: "Atreya Kamat", phone: "7744020601" }
    ],
    formConfig: { minParticipants: 2, maxParticipants: 4, hasTeamName: true }
  },
  {
    slug: "symmetry-art",
    name: "SYMMETRY ART",
    category: "General",
    level: "higher secondary",
    date: "29 April 2026",
    time: "10AM ONWARDS",
    venue: "DHM1 AITD",
    shortDescription: "Higher Secondary Abstract Art competition.",
    description: "Express the aesthetic of technology through art. Restricted to Higher Secondary students only.",
    rules: ["Restricted to Higher Secondary students", "College students cannot participate", "Materials provided"],
    registrationFee: "Free",
    prizePool: "₹6,000",
    image: "/event-pics/Event pics/SYMMETRY ART.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1fx2x-0b5wWg_ap9-S3oJDQ6LAVBhTUpZ/view?usp=drive_link",
    coordinators: [
      { name: "Salmesh Calangutkar", phone: "9028064354" },
      { name: "Vedika Patil", phone: "9371862427" }
    ],
    formConfig: { minParticipants: 4, maxParticipants: 4, hasTeamName: true }
  },
  {
    slug: "structomat",
    name: "STRUCTOMAT",
    category: "Mechanical",
    level: "higher secondary",
    date: "29 April 2026",
    time: "10AM ONWARDS",
    venue: "DHM2 AITD",
    shortDescription: "Higher Secondary Straw Structure Designing.",
    description: "Design complex models using straws. Restricted to Higher Secondary students only.",
    rules: ["Restricted to Higher Secondary students", "College students cannot participate", "Time-bound challenge"],
    registrationFee: "Free",
    prizePool: "₹6,000",
    image: "/event-pics/Event pics/STRUCTOMAT.jpg",
    rulebookUrl: "https://drive.google.com/file/d/1mRmUyG5ZYtC8nn92v3H8Vwep2Gx7gcN5/view?usp=drive_link",
    coordinators: [
      { name: "Mihir Shirodkar", phone: "9130357440" },
      { name: "Harsh Mapsekar", phone: "9604107596" }
    ],
    formConfig: { minParticipants: 4, maxParticipants: 4, hasTeamName: true }
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
      event.shortDescription.toLowerCase().includes(term) ||
      (event.flair && event.flair.toLowerCase().includes(term));

    const matchesCategory = category === "all" || event.category === category;
    const matchesLevel = level === "all" || event.level === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });
}
