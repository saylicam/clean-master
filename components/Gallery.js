// components/Gallery.js
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Gallery() {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Pause / play auto selon visibilité
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = el.querySelector("video");
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
          setIsPlaying(true);
        } else {
          v.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Toggle audio
  const toggleMute = () => {
    const v = ref.current?.querySelector("video");
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // Toggle play
  const togglePlay = () => {
    const v = ref.current?.querySelector("video");
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Showreel</h2>
        <p className="text-gray-600 mt-2">
          10&nbsp;secondes pour voir l’esprit Clean Master.
        </p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative mt-8 rounded-2xl overflow-hidden ring-1 ring-white/50 shadow-soft bg-black"
        >
          {/* Vidéo */}
          <video
            className="w-full h-[58vh] min-h-[320px] object-cover"
            playsInline
            muted
            loop
            autoPlay
          >
            <source src="/video/showreel.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo HTML5.
          </video>

          {/* Overlay dégradé */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Texte + contrôles */}
          <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-xl">
              <h3 className="text-white text-2xl md:text-3xl font-semibold">
                Surfaces impeccables, reflets nets.
              </h3>
              <p className="text-white/80 mt-1">
                Vitres, toitures, terrasses, panneaux solaires : un rendu clean & durable.
              </p>
            </div>

            {/* Commandes */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="px-3 py-2 rounded-full bg-white/90 hover:bg-white text-black text-sm font-medium transition"
              >
                {isPlaying ? "Pause" : "Lire"}
              </button>
              <button
                onClick={toggleMute}
                className="px-3 py-2 rounded-full bg-white/90 hover:bg-white text-black text-sm font-medium transition"
              >
                {muted ? "Activer son" : "Couper son"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
