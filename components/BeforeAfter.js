import { useRef } from "react";
import Reveal from "./Reveal";

export default function BeforeAfter() {
  const ref = useRef(null);

  return (
    <section id="before-after" className="py-16 md:py-24">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Reveal><h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Avant / Après</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="text-gray-600 mt-3">
              Le résultat parle de lui-même. Un nettoyage soigné qui redonne de l’éclat.
            </p>
          </Reveal>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>• Produits et méthodes certifiés</li>
            <li>• Interventions planifiées et rapides</li>
            <li>• Satisfaction garantie</li>
          </ul>
        </div>

        {/* Slider */}
        <div
          ref={ref}
          className="relative w-full h-72 md:h-80 rounded-xl2 overflow-hidden shadow-soft"
        >
          {/* AVANT (gauche) — image de fond */}
          <img
            src="/images/before.jpg"
            alt="Avant"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute left-3 top-3 z-10 text-xs px-2 py-1 rounded-full bg-black/50 text-white">
            Avant
          </span>

          {/* Curseur */}
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            onInput={(e) =>
              ref.current?.style.setProperty("--cut", e.currentTarget.value + "%")
            }
            className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 w-2/3 accent-black"
            aria-label="Comparateur Avant/Après"
          />

          {/* APRÈS (droite) — image au-dessus, on masque la PARTIE GAUCHE */}
          <div
            className="absolute inset-0"
            // 👇 ICI le correctif : on masque la partie gauche jusqu'à --cut
            style={{ clipPath: "inset(0 0 0 var(--cut,50%))" }}
          >
            <img
              src="/images/after.jpg"
              alt="Après"
              className="w-full h-full object-cover"
            />
            <span className="absolute left-3 top-3 z-10 text-xs px-2 py-1 rounded-full bg-black/50 text-white">
              Après
            </span>
          </div>

          {/* Ligne + poignée au niveau du cut */}
          <div className="absolute top-0 bottom-0" style={{ left: "var(--cut,50%)" }}>
            <div className="h-full w-[2px] bg-white/80 shadow" />
            <div className="absolute top-1/2 -translate-y-1/2 -ml-3 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center text-xs">
              ↔
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
