import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Sparkles, ArrowRight } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface FarmLinkSplashProps {
  onComplete: () => void;
}

export const FarmLinkSplash = ({ onComplete }: FarmLinkSplashProps) => {
  const { settings } = useAccessibility();
  const isReduced = settings.reducedMotion;

  // Animation phase states:
  // Phase 0: Logo & Brand Mark visible, Seed suspended in air above soil
  // Phase 1: Seed drops downward and settles into the soil (0.3s - 1.1s)
  // Phase 2: Roots push down, green stem begins emerging upward (1.1s - 2.0s)
  // Phase 3: Stem shoots upward, two leaves unfurl left and right (2.0s - 2.9s)
  // Phase 4: Apical bud blooms, sunlight rays appear, final plant visible (2.9s - 4.0s)
  const [phase, setPhase] = useState<number>(isReduced ? 4 : 0);
  const [progress, setProgress] = useState<number>(isReduced ? 100 : 0);

  useEffect(() => {
    if (isReduced) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }

    const t1 = setTimeout(() => setPhase(1), 350);   // Seed drops into soil
    const t2 = setTimeout(() => setPhase(2), 1200);  // Roots branch & stem rises
    const t3 = setTimeout(() => setPhase(3), 2100);  // Stem reaches full height & leaves unfurl
    const t4 = setTimeout(() => setPhase(4), 3000);  // Crown blooms & final plant rests
    const tComplete = setTimeout(() => onComplete(), 4300); // Transition to role selection

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 2.5, 100);
      });
    }, 100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tComplete);
      clearInterval(interval);
    };
  }, [isReduced, onComplete]);

  const getStatusText = () => {
    if (isReduced) return 'Growing connections. Strengthening communities.';
    switch (phase) {
      case 0:
        return 'Welcome to FarmLink...';
      case 1:
        return 'Sowing verified agricultural seeds into fertile soil...';
      case 2:
        return 'Establishing deep roots in mandi trade networks...';
      case 3:
        return 'Sprouting direct farmer-to-buyer connections...';
      case 4:
      default:
        return 'Growing connections. Strengthening communities.';
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto min-h-[580px] flex flex-col justify-between items-center px-4 py-6 sm:py-8 select-none">
      {/* ====================================================================
          1. RESTORED OFFICIAL FARMLINK LOGO & BRAND IDENTITY
          ==================================================================== */}
      <motion.div
        initial={isReduced ? undefined : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-3"
      >
        {/* Network Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-farm-surface border border-farm-border shadow-subtle text-xs font-bold text-farm-brand">
          <span className="w-2 h-2 rounded-full bg-farm-brand"></span>
          <span>Live Mandi Trade Network</span>
          <span className="text-farm-border">•</span>
          <span className="text-farm-text-secondary font-medium">Tamil Nadu &bull; Karnataka &bull; Maharashtra</span>
        </div>

        {/* Official FarmLink Brand Emblem & Logo */}
        <div className="flex flex-col items-center gap-2.5 pt-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-farm-brand border-2 border-farm-gold flex items-center justify-center text-white shadow-card relative group">
            {/* Signature Sprout Emblem */}
            <Sprout className="w-9 h-9 sm:w-11 sm:h-11 text-white" strokeWidth={2.4} />
          </div>

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-farm-brand tracking-tight">
              FARMLINK
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-farm-text-secondary mt-1">
              Growing connections. Strengthening communities.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ====================================================================
          2. RESTORED VISIBLE SEED-TO-PLANT GROWTH ANIMATION CANVAS
          ==================================================================== */}
      <div className="w-full flex flex-col items-center justify-center my-auto py-3">
        <div className="w-72 h-64 sm:w-88 sm:h-72 relative flex items-center justify-center bg-farm-surface rounded-3xl border border-farm-border shadow-card p-3 overflow-hidden">
          <svg
            viewBox="0 0 300 220"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Sky Atmosphere (Solid Neutral Circle) */}
            <circle
              cx="150"
              cy="95"
              r="78"
              className="fill-farm-surface-muted"
            />

            {/* Morning Sun (Solid Gold Disc) */}
            <circle
              cx="230"
              cy="45"
              r="18"
              className="fill-farm-gold-soft stroke-farm-border"
              strokeWidth="1.5"
            />
            <circle
              cx="230"
              cy="45"
              r="9"
              className="fill-farm-gold"
            />

            {/* Sunlight Rays in Phase >= 4 */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 4 ? 0.9 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <line x1="205" y1="45" x2="190" y2="45" className="stroke-farm-gold" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="230" y1="70" x2="230" y2="85" className="stroke-farm-gold" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="212" y1="63" x2="198" y2="77" className="stroke-farm-gold" strokeWidth="2" strokeDasharray="3 3" />
            </motion.g>

            {/* Horizon Furrows */}
            <path
              d="M20 140 Q 85 134 150 138 T 280 136"
              className="stroke-farm-border"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 146 Q 80 140 150 144 T 290 142"
              className="stroke-farm-border-strong"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Deep Organic Soil Layer */}
            <path
              d="M10 148 Q 80 142 150 146 Q 220 150 290 146 L 290 218 L 10 218 Z"
              className="fill-farm-terracotta-soft"
            />
            <path
              d="M10 162 Q 90 156 150 160 Q 210 164 290 158 L 290 218 L 10 218 Z"
              className="fill-farm-terracotta opacity-20"
            />

            {/* Soil Surface Ridge Line */}
            <path
              d="M15 148 Q 80 142 150 146 T 285 146"
              className="stroke-farm-terracotta"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Soil Texture Grains */}
            <circle cx="70" cy="172" r="2.5" className="fill-farm-terracotta" />
            <circle cx="110" cy="190" r="3" className="fill-farm-terracotta" />
            <circle cx="185" cy="180" r="2.5" className="fill-farm-terracotta" />
            <circle cx="225" cy="195" r="2" className="fill-farm-terracotta" />
            <circle cx="150" cy="205" r="2.5" className="fill-farm-terracotta" />

            {/* ==============================================================
                A. ROOT SYSTEM (Grows downward in Phase >= 2)
                ============================================================== */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Primary Taproot */}
              <motion.path
                d="M150 152 Q 149 174 150 196"
                className="stroke-farm-brand"
                strokeWidth="2.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
              {/* Left Feeder Root */}
              <motion.path
                d="M149 168 Q 134 176 122 184"
                className="stroke-farm-brand opacity-80"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 3 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              {/* Right Feeder Root */}
              <motion.path
                d="M150 174 Q 166 182 178 188"
                className="stroke-farm-brand opacity-80"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 3 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.g>

            {/* ==============================================================
                B. THE SEED (STEP 2: Appears in air -> STEP 3: Falls -> STEP 4: Settles)
                ============================================================== */}
            <motion.g
              initial={isReduced ? { y: 0, opacity: 1 } : { y: -95, opacity: 1 }}
              animate={{
                y: isReduced ? 0 : phase === 0 ? -95 : 0,
                opacity: 1,
                scale: phase >= 3 ? 0.9 : 1,
              }}
              transition={{
                duration: 0.75,
                ease: [0.34, 1.56, 0.64, 1], // Spring bounce on impact
              }}
            >
              {/* Seed Outer Shell (Solid Terracotta with crisp stroke) */}
              <ellipse
                cx="150"
                cy="150"
                rx="9"
                ry="6.5"
                className="fill-farm-terracotta stroke-farm-brand"
                strokeWidth="1.8"
                transform="rotate(-15 150 150)"
              />
              {/* Seed Embryo Core (Warm Gold) */}
              <ellipse
                cx="149"
                cy="149"
                rx="4.5"
                ry="3"
                className="fill-farm-gold"
                transform="rotate(-15 149 149)"
              />
            </motion.g>

            {/* ==============================================================
                C. MAIN STEM (STEP 5: Visible stem grows upward)
                ============================================================== */}
            <motion.path
              d="M150 150 C 150 120, 147 90, 150 52"
              className="stroke-farm-brand"
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={{ pathLength: isReduced ? 1 : 0 }}
              animate={{
                pathLength: isReduced ? 1 : phase < 2 ? 0 : phase === 2 ? 0.45 : phase === 3 ? 0.85 : 1,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* ==============================================================
                D. LEFT COTYLEDON LEAF (STEP 6: Left leaf grows and unfurls)
                ============================================================== */}
            <motion.g
              initial={isReduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={{
                scale: isReduced || phase >= 3 ? 1 : 0,
                opacity: isReduced || phase >= 3 ? 1 : 0,
              }}
              transition={{ duration: 0.55, type: 'spring', stiffness: 220, damping: 14 }}
              style={{ originX: '150px', originY: '100px' }}
            >
              {/* Leaf Blade */}
              <path
                d="M150 100 C 108 96, 94 74, 104 60 C 126 64, 146 84, 150 100 Z"
                className="fill-farm-brand stroke-farm-brand-hover"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              {/* Leaf Central Vein */}
              <path
                d="M150 100 C 128 88, 116 74, 104 60"
                className="stroke-white opacity-40"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.g>

            {/* ==============================================================
                E. RIGHT COTYLEDON LEAF (STEP 6: Right leaf grows and unfurls)
                ============================================================== */}
            <motion.g
              initial={isReduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={{
                scale: isReduced || phase >= 3 ? 1 : 0,
                opacity: isReduced || phase >= 3 ? 1 : 0,
              }}
              transition={{ duration: 0.55, delay: isReduced ? 0 : 0.12, type: 'spring', stiffness: 220, damping: 14 }}
              style={{ originX: '150px', originY: '80px' }}
            >
              {/* Leaf Blade */}
              <path
                d="M150 80 C 192 76, 206 54, 196 40 C 174 44, 154 64, 150 80 Z"
                className="fill-farm-brand stroke-farm-brand-hover"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              {/* Leaf Central Vein */}
              <path
                d="M150 80 C 172 68, 184 54, 196 40"
                className="stroke-white opacity-40"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.g>

            {/* ==============================================================
                F. TOP APICAL BUD (STEP 7: Small plant blooms & remains visible)
                ============================================================== */}
            <motion.g
              initial={isReduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={{
                scale: isReduced || phase >= 4 ? 1 : 0,
                opacity: isReduced || phase >= 4 ? 1 : 0,
              }}
              transition={{ duration: 0.45, type: 'spring', stiffness: 260 }}
              style={{ originX: '150px', originY: '52px' }}
            >
              {/* Apical Bud Tip */}
              <path
                d="M150 52 C 140 38, 144 24, 150 18 C 156 24, 160 38, 150 52 Z"
                className="fill-farm-brand-hover stroke-farm-brand"
                strokeWidth="1.5"
              />
              {/* Golden Bud Core */}
              <circle
                cx="150"
                cy="18"
                r="4.5"
                className="fill-farm-gold"
              />
            </motion.g>
          </svg>
        </div>

        {/* ====================================================================
            3. ROTATING STATUS MESSAGE & PROGRESS BAR
            ==================================================================== */}
        <div className="w-full max-w-xs space-y-2.5 mt-5">
          <div className="h-6 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs sm:text-sm font-semibold text-farm-text flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-farm-gold shrink-0" />
                <span>{getStatusText()}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Solid Progress Bar */}
          <div className="w-full h-2 rounded-full bg-farm-surface-muted border border-farm-border overflow-hidden p-[1px]">
            <motion.div
              className="h-full rounded-full bg-farm-brand"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-farm-text-secondary font-medium">
            <span>Direct Farmgate Marketplace</span>
            <span className="font-bold text-farm-brand">{progress}%</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          4. FOOTER TRUST & SKIP ACTION
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-center pt-2 flex flex-col items-center gap-2"
      >
        <p className="text-[11px] sm:text-xs font-semibold text-farm-text-muted tracking-wide">
          Direct Producer Network &bull; Fair Mandi Rates &bull; 100% Escrow Secured
        </p>

        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center gap-1 text-xs font-bold text-farm-brand hover:text-farm-brand-hover underline underline-offset-4 cursor-pointer mt-1"
          id="splash-skip-link"
        >
          <span>Continue to Role Selection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};

export default FarmLinkSplash;
