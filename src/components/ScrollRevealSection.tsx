import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

type ScrollRevealSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  imageSrc: string;
  features?: string[];
  flip?: boolean;
};

export default function ScrollRevealSection({
  id,
  eyebrow,
  title,
  text,
  imageSrc,
  features = [],
  flip = false
}: ScrollRevealSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1], {
    clamp: true
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, 0], {
    clamp: true
  });
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0, 1], {
    clamp: true
  });
  const textY = useTransform(scrollYProgress, [0.15, 0.6], [24, 0], {
    clamp: true
  });

  const enableScroll = isDesktop && !prefersReducedMotion;

  return (
    <div
      id={id}
      ref={sectionRef}
      className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:min-h-[70vh] md:grid-cols-2 md:items-center"
    >
      <div
        className={`${
          flip ? "md:order-2" : "md:order-1"
        } flex items-center`}
      >
        <motion.div
          className="relative w-full overflow-hidden rounded-[32px] border border-navy/10 bg-transparent shadow-soft md:sticky md:top-24"
          style={enableScroll ? { y: imageY } : undefined}
          initial={
            enableScroll || prefersReducedMotion
              ? false
              : { opacity: 0, scale: 1.08 }
          }
          whileInView={
            enableScroll || prefersReducedMotion
              ? undefined
              : { opacity: 1, scale: 1 }
          }
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative flex h-[320px] w-full items-center justify-center p-6 md:h-[520px] md:p-10">
            <motion.img
              src={imageSrc}
              alt={title}
              className="h-full w-full object-contain"
              loading="lazy"
              style={
                enableScroll
                  ? { scale, transformOrigin: "center" }
                  : { opacity: 1 }
              }
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        className={`${
          flip ? "md:order-1" : "md:order-2"
        } flex flex-col gap-4`}
        style={enableScroll ? { opacity: textOpacity, y: textY } : undefined}
        initial={
          enableScroll || prefersReducedMotion
            ? false
            : { opacity: 0, y: 24 }
        }
        whileInView={
          enableScroll || prefersReducedMotion
            ? undefined
            : { opacity: 1, y: 0 }
        }
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs uppercase tracking-[0.4em] text-muted">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl text-navy md:text-4xl">
          {title}
        </h2>
        <p className="text-base text-muted md:text-lg">{text}</p>
        {features.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-navy/70">
            {features.map((item) => (
              <li
                key={item}
                className="rounded-full border border-navy/15 px-4 py-2"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
