// components/Hero.js
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center">
      {/* Image en arrière-plan */}
      <Image
        src="/images/hero-clean.jpg"
        alt="Nettoyage de vitre professionnel"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/25" />

      {/* Contenu */}
      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-white text-3xl md:text-5xl font-semibold leading-tight">
            Votre environnement,<br /> notre priorité.
          </h1>

          <p className="mt-4 text-white/90 text-base md:text-lg max-w-xl">
            Services de nettoyage professionnels pour bureaux, commerces et espaces résidentiels.
            Un rendu impeccable, rapide et durable.
          </p>

          {/* Boutons */}
          <div className="mt-6 w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-5 py-3 rounded-full
                           bg-white text-black font-medium shadow
                           hover:opacity-90 transition"
              >
                Demander un devis
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto text-center px-5 py-3 rounded-full
                           bg-white/10 text-white ring-1 ring-white/40 backdrop-blur
                           hover:bg-white/20 transition"
              >
                Voir les services
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
