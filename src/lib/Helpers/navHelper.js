import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function IconButton({ children, onClick, ariaLabel, className = "" }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative rounded-xl border px-3 py-2 shadow-sm backdrop-blur-md transition-all duration-200",
        "border-amber-200/40 bg-white/50 hover:bg-white/70",
        "dark:border-amber-400/20 dark:bg-slate-800/50 dark:hover:bg-slate-700/60",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export function CrescentMoon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function StarSparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={cn("w-3 h-3", className)}>
      <path d="M10 1l2.39 6.26L19 9l-5.5 4.74L15.12 21 10 17.27 4.88 21l1.62-7.26L1 9l6.61-1.74L10 1z" />
    </svg>
  );
}

export function AnimatedBorderPill({ children, isDark }) {
  return (
    <>
      <style>{`
        @keyframes gradient-rotate {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-border-pill {
          background: linear-gradient(270deg, #059669, #f59e0b, #10b981, #fbbf24, #059669);
          background-size: 300% 300%;
          animation: gradient-rotate 3s ease infinite;
          padding: 1.5px;
          border-radius: 9999px;
        }
      `}</style>
      <div className="animated-border-pill shadow-xl">
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-2xl"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(6,78,59,0.3) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(236,253,245,0.88) 50%, rgba(255,251,235,0.92) 100%)",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}