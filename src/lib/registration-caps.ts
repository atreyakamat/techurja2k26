/**
 * REGISTRATION LIMITS CONFIGURATION
 * Define the maximum number of allowed entries (teams/solo) per event.
 */
export const REGISTRATION_CAPS: Record<string, number> = {
  "techyothon": 50, // Increased from 0
  "escape-the-matrix": 50, // Increased from 3
  "ghostgrid": 30, // Updated to 30 as requested
  "innovibe": 25, // Added for Project Expo
  
  // Default cap for any event not listed above
  "DEFAULT": 1000 
};

/**
 * INITIAL OFFSETS
 * Existing registrations before the counter system was active.
 */
export const REGISTRATION_OFFSETS: Record<string, number> = {
  "techyothon": 11,
  "escape-the-matrix": 0,
  "ghostgrid": 0
};

/**
 * EVENT CODENAMES
 * Short identifiers for easy searching and internal tracking.
 */
export const EVENT_CODENAMES: Record<string, string> = {
  "robowar-15kg": "RW-15",
  "robowar-8kgs": "RW-8",
  "robowar-3lbs": "RW-3",
  "robo-nexus": "RN-SUMO",
  "cyber-strike": "CS-SOCCER",
  "grid-runner": "GR-LFR",
  "santo-domingo-race": "SDR-RACE",
  "cyber-tug": "CT-TUG",
  "escape-the-matrix": "ETM-CODE",
  "innovibe": "INB-PROJ",
  "kabuki-roundabout": "KR-MAZE",
  "neon-span": "NS-BRIDGE",
  "ghostgrid": "CTF-HACK", // Identified as CTF
  "circuit-breach": "CB-LOGIC",
  "war-room-protocol": "WRP-PITCH",
  "pixel-play": "PP-FIFA",
  "clashpunk": "CP-CR",
  "the-cypher-heist": "TCH-HUNT",
  "cyber-smashers": "CS-CRICKET",
  "techyothon": "TY-HACK",
  "symmetry-art": "SA-ART",
  "structomat": "SM-STRAW"
};

export function getEventCap(slug: string): number {
  return REGISTRATION_CAPS[slug] || REGISTRATION_CAPS["DEFAULT"];
}

export function getEventOffset(slug: string): number {
  return REGISTRATION_OFFSETS[slug] || 0;
}

export function getEventCodename(slug: string): string {
  return EVENT_CODENAMES[slug] || "GEN-EVENT";
}
