"use client";

import { useRef } from "react";
import { motion, useInView, Variant } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: { hidden: Variant; visible: Variant };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

const BLUR_FADE_VARIANTS = {
  hidden: { opacity: 0, y: 6, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true });
  const isVisible = !inView || inViewResult;

  const resolvedVariants = variant ?? {
    hidden: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={resolvedVariants}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
