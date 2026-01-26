import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useReducedMotion
} from "framer-motion";

type IntroAnimationProps = {
  onFinish: () => void;
};

export default function IntroAnimation({ onFinish }: IntroAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const overlayControls = useAnimation();
  const petalContainerControls = useAnimation();
  const petalPathControls = useAnimation();
  const wordmarkClipControls = useAnimation();
  const petalaTextControls = useAnimation();
  const decorTextControls = useAnimation();
  const [skipRequested, setSkipRequested] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      onFinish();
      return;
    }

    const handleSkip = () => setSkipRequested(true);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        setSkipRequested(true);
      }
    };

    window.addEventListener("click", handleSkip);
    window.addEventListener("touchstart", handleSkip);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("click", handleSkip);
      window.removeEventListener("touchstart", handleSkip);
      window.removeEventListener("keydown", handleKey);
    };
  }, [prefersReducedMotion, onFinish]);

  useEffect(() => {
    if (prefersReducedMotion || finishedRef.current) {
      return;
    }

    const runTimeline = async () => {
      await petalContainerControls.start({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
      });
      await petalPathControls.start({
        pathLength: 1,
        transition: { duration: 0.8, ease: "easeInOut" }
      });
      await petalPathControls.start({
        fillOpacity: 1,
        transition: { duration: 0.6, ease: "easeInOut" }
      });
      await wordmarkClipControls.start({
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 0.6, ease: "easeOut" }
      });
      await petalaTextControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" }
      });
      await decorTextControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut", delay: 0.12 }
      });
      await overlayControls.start({
        opacity: 0,
        scale: 0.98,
        transition: { duration: 0.55, ease: "easeInOut" }
      });
      finishedRef.current = true;
      onFinish();
    };

    runTimeline();
  }, [
    overlayControls,
    petalContainerControls,
    petalPathControls,
    wordmarkClipControls,
    petalaTextControls,
    decorTextControls,
    prefersReducedMotion,
    onFinish
  ]);

  useEffect(() => {
    if (!skipRequested || finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    onFinish();
  }, [skipRequested, onFinish]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-porcelain/95 vignette"
      initial={{ opacity: 1, scale: 1 }}
      animate={overlayControls}
      aria-label="Animação de entrada da Pétala Decor"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.svg
          width="140"
          height="190"
          viewBox="0 0 140 190"
          className="text-navy"
          initial={{
            opacity: 0,
            scale: 0.92,
            filter: "blur(6px)"
          }}
          animate={petalContainerControls}
        >
          <motion.path
            d="M70 18C54 18 38 28 30 46C18 74 20 108 32 134C42 160 56 176 70 180C84 176 98 160 108 134C120 108 122 74 110 46C102 28 86 18 70 18C76 22 78 28 70 34C62 28 64 22 70 18Z"
            fill="url(#petal-gradient)"
            fillOpacity={0}
            stroke="rgba(31, 59, 92, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={0}
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={petalPathControls}
          />
          <motion.path
            d="M70 38C56 46 46 66 46 92C46 124 58 146 70 156"
            fill="none"
            stroke="rgba(31, 59, 92, 0.18)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              transition: { duration: 1.1, ease: "easeInOut", delay: 0.6 }
            }}
          />
          <defs>
            <linearGradient id="petal-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f9f7f2" />
              <stop offset="70%" stopColor="#e9dcc8" />
              <stop offset="100%" stopColor="#c9a27e" />
            </linearGradient>
          </defs>
        </motion.svg>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-end gap-2 text-navy"
            initial={{
              opacity: 0,
              clipPath: "inset(0% 100% 0% 0%)"
            }}
            animate={wordmarkClipControls}
            style={{ letterSpacing: "0.08em" }}
          >
            <motion.span
              className="font-serif text-3xl"
              initial={{ opacity: 0, y: 6 }}
              animate={petalaTextControls}
            >
              Pétala
            </motion.span>
            <motion.span
              className="text-sm uppercase tracking-[0.3em] text-navy/70"
              initial={{ opacity: 0, y: 6 }}
              animate={decorTextControls}
            >
              decor
            </motion.span>
          </motion.div>
        </div>
        <p className="text-xs uppercase tracking-[0.45em] text-muted">
          clique para pular
        </p>
      </div>
    </motion.div>
  );
}
