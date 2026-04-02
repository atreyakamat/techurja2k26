"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HSSEventsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main events page with the level filter applied
    router.replace("/events?level=higher+secondary");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-cyan-electric">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-cyan-electric border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs uppercase tracking-[0.3em] animate-pulse">Accessing HSS Division Protocols...</p>
      </div>
    </div>
  );
}
