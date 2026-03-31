"use client";

import Spline from "@splinetool/react-spline";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplineSceneProps {
  scene?: string;
}

export function SplineScene({ scene = "https://prod.spline.design/UVRpBOLvT5fs5fXx/scene.splinecode" }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-cyan-electric/20 rounded-lg"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-t-cyan-electric border-r-transparent border-b-magenta-cyber border-l-transparent rounded-full animate-spin"></div>
              <div className="text-cyan-electric font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
                INITIALIZING_NEURAL_LINK...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
          onWheel={(e) => e.stopPropagation()}
        >
          <Spline 
            scene={scene}
            onLoad={() => {
              console.log("Spline Scene Loaded:", scene);
              setIsLoading(false);
            }}
            onError={(e) => {
              console.error("Spline Load Error:", e);
            }}
            className="w-full h-full pointer-events-none"
          />
        </motion.div>
      </Suspense>
      
      {/* Interactive Overlay Hint */}
      {!isLoading && (
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-50 z-10">
          <div className="flex items-center gap-2 text-[10px] text-cyan-electric font-mono uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-cyan-electric animate-ping"></span>
            MANIPULATE_GRID
          </div>
        </div>
      )}
    </div>
  );
}
