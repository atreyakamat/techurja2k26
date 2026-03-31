"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import Spline with SSR disabled for better performance
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

interface SplineSceneProps {
  scene?: string;
}

export function SplineScene({ scene = "https://prod.spline.design/UVRpBOLvT5fs5fXx/scene.splinecode" }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 border border-magenta-cyber/20 rounded-lg">
        <div className="text-magenta-cyber font-mono text-[10px] tracking-widest uppercase">
          DATA_STREAM_CORRUPTED
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <AnimatePresence>
        {(isLoading || !isInView) && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-cyan-electric/20 rounded-lg"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-t-cyan-electric border-r-transparent border-b-magenta-cyber border-l-transparent rounded-full animate-spin"></div>
              <div className="text-cyan-electric font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
                {isInView ? "ESTABLISHING_LINK..." : "IDLE_MODE"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        {isInView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full will-change-transform relative"
            onWheel={(e) => e.stopPropagation()}
          >
            <Spline 
              scene={scene}
              onLoad={() => {
                setIsLoading(false);
              }}
              onError={(e) => {
                console.error("Spline Runtime Error:", e);
                setHasError(true);
                setIsLoading(false);
              }}
              className="w-full h-full"
            />
            {/* Pointer block overlay */}
            <div className="absolute inset-0 z-10 bg-transparent" />
          </motion.div>
        )}
      </Suspense>
      
      {/* Interactive Overlay Hint */}
      {!isLoading && isInView && (
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-50 z-10">
          <div className="flex items-center gap-2 text-[10px] text-cyan-electric font-mono uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-cyan-electric animate-ping"></span>
            ARENA_ACTIVE
          </div>
        </div>
      )}
    </div>
  );
}
