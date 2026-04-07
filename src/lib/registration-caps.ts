/**
 * REGISTRATION LIMITS CONFIGURATION
 * Define the maximum number of allowed entries (teams/solo) per event.
 */
export const REGISTRATION_CAPS: Record<string, number> = {
  "techyothon": 15,
  "escape-the-matrix": 3,
  "ghostgrid": 2,
  
  // Default cap for any event not listed above (set high to be effectively unlimited)
  "DEFAULT": 1000 
};

/**
 * INITIAL OFFSETS
 * If you already have registrations before this system was implemented,
 * add them here so the counter starts from the correct number.
 */
export const REGISTRATION_OFFSETS: Record<string, number> = {
  "techyothon": 11, // Starting from your existing 11 registrations
  "escape-the-matrix": 0,
  "ghostgrid": 0
};

/**
 * Helper to get cap for an event
 */
export function getEventCap(slug: string): number {
  return REGISTRATION_CAPS[slug] || REGISTRATION_CAPS["DEFAULT"];
}

/**
 * Helper to get initial offset for an event
 */
export function getEventOffset(slug: string): number {
  return REGISTRATION_OFFSETS[slug] || 0;
}
