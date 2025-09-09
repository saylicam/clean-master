import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — apparition au scroll configurable
 *
 * Props:
 * - delay: nombre (sec)
 * - duration: nombre (sec)
 * - distance: décalage px (par défaut 24)
 * - direction: "up" | "down" | "left" | "right" | "scale" | "fade"
 * - once: bool (par défaut true)
 * - amount: "some" | "all" | nombre 0..1 (seuil d'apparition)
 * - blur: bool (ajoute un léger flou à l’entrée)
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 24,
  direction = "up",
  once = true,
  amount = 0.2,
  blur = false,
  className = "",
}) {
  const prefersReduced = useReducedMotion();

  const from = (() => {
    if (direction === "fade") return { opacity: 0 };
    if (direction === "scale") return { opacity: 0, scale: 0.96 };
    if (direction === "down") return { opacity: 0, y: -distance };
    if (direction === "left") return { opacity: 0, x: distance };
    if (direction === "right") return { opacity: 0, x: -distance };
    // "up"
    return { opacity: 0, y: distance };
  })();

  const to = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

  const initial = blur ? { ...from, filter: "blur(6px)" } : from;

  const transition = prefersReduced
    ? { duration: 0 } // respect réduit-mouvement
    : { duration, delay, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={to}
      viewport={{ once, amount, margin: "-15% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
