import { useState, useEffect } from "react";

export default function LoadingScreen({ isLoading }) {
  const [phase, setPhase] = useState("active"); // active -> exiting -> done

  useEffect(() => {
    if (!isLoading && phase === "active") {
      setPhase("exiting");
      const timer = setTimeout(() => setPhase("done"), 900);
      return () => clearTimeout(timer);
    }
  }, [isLoading, phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#06060e] transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "exiting"
          ? "opacity-0 scale-[1.02]"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="loading-particle absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(168, 85, 247, ${0.15 + Math.random() * 0.3})`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow behind logo */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/[0.04] blur-[100px] loading-pulse" />

      <div className="relative flex flex-col items-center gap-10">
        {/* Animated ring + monogram */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer ring - draws itself */}
          <svg
            className="absolute inset-0 w-full h-full loading-ring"
            viewBox="0 0 112 112"
          >
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="1"
              strokeDasharray="327"
              strokeDashoffset="327"
              strokeLinecap="round"
              className="loading-ring-circle"
            />
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner decorative ring */}
          <svg
            className="absolute inset-2 loading-ring-inner"
            viewBox="0 0 96 96"
          >
            <circle
              cx="48"
              cy="48"
              r="44"
              fill="none"
              stroke="rgba(168, 85, 247, 0.08)"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              className="loading-ring-dashes"
            />
          </svg>

          {/* Monogram */}
          <span className="text-2xl font-light tracking-[0.15em] text-white/90 loading-monogram select-none">
            KP
          </span>

          {/* Orbiting dot */}
          <div className="absolute inset-0 loading-orbit">
            <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent loading-progress rounded-full" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[11px] font-light tracking-[0.3em] uppercase text-white/30 loading-text">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}
