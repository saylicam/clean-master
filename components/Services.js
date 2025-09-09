import Image from "next/image";
import Reveal from "./Reveal";
import RevealEach from "./RevealEach";

const items = [
  { title: "Vitres", desc: "Intérieur / extérieur, rendu sans traces.", img: "/images/vitres.jpg" },
  { title: "Panneaux solaires", desc: "Nettoyage sécurisé pour un rendement optimal.", img: "/images/panneaux.jpg" },
  { title: "Vérandas", desc: "Entretien complet, accès difficiles compris.", img: "/images/veranda.jpg" },
  { title: "Terrasses", desc: "Désencrassage, décapage, remise à neuf.", img: "/images/terrasse.jpg" },
  { title: "Corniches / gouttières", desc: "Dégagement, nettoyage, évacuation.", img: "/images/corniche.jpg" },
  { title: "Fin de chantiers", desc: "Remise en état : sols, vitres, poussières.", img: "/images/chantier.jpg" },
  { title: "Locaux & bureaux", desc: "Entretien régulier, désinfection, multi-surfaces.", img: "/images/bureau.jpg" },
  { title: "Toitures", desc: "Démoussage doux et durable.", img: "/images/toiture.jpg" },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        <Reveal blur>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Nos services</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-gray-600 mt-2">Des prestations professionnelles, ajustées à vos besoins.</p>
        </Reveal>

        <RevealEach stagger={0.08} amount={0.15}>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((it) => (
              <div
                key={it.title}
                className="card p-5 hover:shadow-lg hover:-translate-y-1 transition-transform"
              >
                {/* Vignette image */}
                <div className="relative mb-4 overflow-hidden rounded-xl ring-1 ring-black/5 bg-white">
                  {/* ratio 4:3, responsive et propre */}
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={it.img || "/images/detail1.jpg"}  // fallback léger si l'image n'est pas encore là
                      alt={it.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 260px, 50vw"
                      priority={false}
                    />
                  </div>
                </div>

                <h3 className="font-medium">{it.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{it.desc}</p>
              </div>
            ))}
          </div>
        </RevealEach>
      </div>
    </section>
  );
}
