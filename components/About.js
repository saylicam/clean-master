import Reveal from "./Reveal";
import RevealEach from "./RevealEach";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <Reveal direction="left" blur>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">À propos de Clean Master</h2>
            <p className="text-gray-600 mt-4 max-w-prose">
              Spécialistes du <strong>nettoyage professionnel</strong> en Belgique : vitres, locaux, toitures,
              panneaux solaires, terrasses, corniches et fin de chantiers. Interventions rapides, soignées,
              avec des produits et méthodes certifiés.
            </p>
            <p className="text-gray-600 mt-3">
              Notre priorité : un rendu impeccable et durable — que ce soit pour des bureaux, commerces
              ou espaces résidentiels.
            </p>
          </div>
        </Reveal>

        <RevealEach>
          <div className="card p-6">
            <div className="text-4xl font-semibold">300+</div>
            <div className="text-gray-600">interventions réalisées</div>
          </div>
          <div className="card p-6">
            <div className="text-4xl font-semibold">24h</div>
            <div className="text-gray-600">de délai moyen pour un devis</div>
          </div>
          <div className="card p-6">
            <div className="text-4xl font-semibold">4.9★</div>
            <div className="text-gray-600">satisfaction clients</div>
          </div>
        </RevealEach>
      </div>
    </section>
  );
}
