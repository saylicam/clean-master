import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const panels = [
  { title: "Vitres & vérandas", desc: "Intérieur / extérieur, accès difficiles, rendu sans traces.", img: "/images/detail1.jpg" },
  { title: "Panneaux solaires", desc: "Optimisez le rendement avec un nettoyage sécurisé.", img: "/images/detail2.jpg" },
  { title: "Toitures & corniches", desc: "Démoussage doux, gouttières dégagées, entretien durable.", img: "/images/detail3.jpg" },
  { title: "Locaux & bureaux", desc: "Remise en état complète : sols, vitres, poussières.", img: "/images/detail4.jpg" },
];

export default function FeaturePanels() {
  const ref = useRef(null);
  // 4 panneaux => translation 0% → -300%
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Nos expertises</h2>
      </div>

      <div ref={ref} className="relative h-[450vh] mt-8">
        <div className="sticky top-20 h-[70vh] overflow-hidden">
          <motion.div style={{ x }} className="flex h-full">
            {panels.map((p, i) => <Panel key={i} {...p} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, desc, img }) {
  return (
    <div className="min-w-full h-full px-6">
      <div className="card grid md:grid-cols-2 items-center gap-8 h-full p-6">
        {/* Colonne texte centrée verticalement */}
        <div className="h-full flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
          <p className="text-gray-600 mt-3 max-w-prose">{desc}</p>
        </div>

        {/* Colonne image qui remplit toute la hauteur */}
        <div className="relative h-full rounded-xl2 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-white/50 pointer-events-none rounded-xl2" />
        </div>
      </div>
    </div>
  );
}
