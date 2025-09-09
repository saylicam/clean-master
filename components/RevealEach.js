import { motion, useReducedMotion } from "framer-motion";

/**
 * Révèle automatiquement tous les enfants avec un léger stagger.
 * Utilise des variants pour un rendu plus smooth.
 */
export default function RevealEach({
  children,
  delay = 0,
  duration = 0.5,
  stagger = 0.08,
  amount = 0.2,
  once = true,
  distance = 18,
}) {
  const prefersReduced = useReducedMotion();
  const container = {
    hidden: {},
    show: {
      transition: prefersReduced ? {} : { staggerChildren: stagger, delayChildren: delay }
    }
  };
  const item = {
    hidden: { opacity: 0, y: distance, filter: "blur(4px)" },
    show: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: prefersReduced ? { duration: 0 } : { duration, ease: [0.22,1,0.36,1] }
    }
  };

  // Mappe chaque enfant dans un motion.div item
  const mapped = (Array.isArray(children) ? children : [children]).map((child, i) => (
    <motion.div key={i} variants={item}>{child}</motion.div>
  ));

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "-12% 0px" }}
    >
      {mapped}
    </motion.div>
  );
}
