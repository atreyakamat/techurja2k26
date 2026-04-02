import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* output: "export", */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirects for event pages
      { source: '/events/robo-sumo/', destination: '/events/robo-nexus/', permanent: true },
      { source: '/events/robo-soccer/', destination: '/events/cyber-strike/', permanent: true },
      { source: '/events/business-pitch/', destination: '/events/war-room-protocol/', permanent: true },
      { source: '/events/hackathon/', destination: '/events/techyothon/', permanent: true },
      { source: '/events/clash-royale/', destination: '/events/clashpunk/', permanent: true },
      { source: '/events/bridge-construction/', destination: '/events/neon-span/', permanent: true },
      { source: '/events/robo-race/', destination: '/events/santo-domingo-race/', permanent: true },
      { source: '/events/robo-maze-solver/', destination: '/events/kabuki-roundabout/', permanent: true },
      { source: '/events/capture-the-flag/', destination: '/events/ghostgrid/', permanent: true },
      { source: '/events/coding-event/', destination: '/events/escape-the-matrix/', permanent: true },
      { source: '/events/fifa/', destination: '/events/pixel-play/', permanent: true },
      { source: '/events/circuit-simulation/', destination: '/events/circuit-breach/', permanent: true },
      { source: '/events/treasure-hunt/', destination: '/events/the-cypher-heist/', permanent: true },
      { source: '/events/line-follower-robot/', destination: '/events/grid-runner/', permanent: true },
      { source: '/events/virtual-cricket/', destination: '/events/cyber-smashers/', permanent: true },
      { source: '/events/project-presentation/', destination: '/events/innovibe/', permanent: true },
      { source: '/events/robo-tug-of-war/', destination: '/events/cyber-tug/', permanent: true },

      // Redirects for registration pages
      { source: '/register/robo-sumo/', destination: '/register/robo-nexus/', permanent: true },
      { source: '/register/robo-soccer/', destination: '/register/cyber-strike/', permanent: true },
      { source: '/register/business-pitch/', destination: '/register/war-room-protocol/', permanent: true },
      { source: '/register/hackathon/', destination: '/register/techyothon/', permanent: true },
      { source: '/register/clash-royale/', destination: '/register/clashpunk/', permanent: true },
      { source: '/register/bridge-construction/', destination: '/register/neon-span/', permanent: true },
      { source: '/register/robo-race/', destination: '/register/santo-domingo-race/', permanent: true },
      { source: '/register/robo-maze-solver/', destination: '/register/kabuki-roundabout/', permanent: true },
      { source: '/register/capture-the-flag/', destination: '/register/ghostgrid/', permanent: true },
      { source: '/register/coding-event/', destination: '/register/escape-the-matrix/', permanent: true },
      { source: '/register/fifa/', destination: '/register/pixel-play/', permanent: true },
      { source: '/register/circuit-simulation/', destination: '/register/circuit-breach/', permanent: true },
      { source: '/register/treasure-hunt/', destination: '/register/the-cypher-heist/', permanent: true },
      { source: '/register/line-follower-robot/', destination: '/register/grid-runner/', permanent: true },
      { source: '/register/virtual-cricket/', destination: '/register/cyber-smashers/', permanent: true },
      { source: '/register/project-presentation/', destination: '/register/innovibe/', permanent: true },
      { source: '/register/robo-tug-of-war/', destination: '/register/cyber-tug/', permanent: true },
    ]
  },
};

export default nextConfig;
