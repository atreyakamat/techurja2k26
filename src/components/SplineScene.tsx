"use client";

import Spline from "@splinetool/react-spline";
import { Suspense } from "react";
import { motion } from "framer-motion";

interface SplineSceneProps {
  scene?: string;
}

export function SplineScene({ scene = "https://prod.spline.design/2d10e7e5-cc41-4dc7-94d7-7c14615f19dd/scene.splinecode" }: SplineSceneProps) {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/20 animate-pulse border border-cyan-electric/20 rounded-lg">
          <div className="text-cyan-electric font-mono text-sm tracking-widest">
            INITIALIZING 3D CORES...
          </div>
        </div>
      }>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <Spline 
            scene={scene}
            className="w-full h-full"
          />
        </motion.div>
      </Suspense>
      
      {/* Interactive Overlay Hint */}
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-50">
        <div className="flex items-center gap-2 text-[10px] text-cyan-electric font-mono uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-cyan-electric animate-ping"></span>
          Interact with the grid
        </div>
      </div>
    </div>
  );
}
