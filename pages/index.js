import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import FeaturePanels from "../components/FeaturePanels";
import BeforeAfter from "../components/BeforeAfter";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Clean Master — Nettoyage professionnel</title>
        <meta
          name="description"
          content="Vitres, locaux, toitures, panneaux solaires, terrasses, corniches, fin de chantiers. Devis sous 24h partout en Belgique."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Clean Master — Nettoyage professionnel" />
        <meta
          property="og:description"
          content="Nettoyage de vitres, locaux, toitures, panneaux solaires, terrasses. Devis gratuit sous 24h."
        />
        <meta property="og:image" content="/logo-clean-master.png" />
        <meta property="og:url" content="https://cleanmaster.example" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Clean Master",
              image: "/logo-clean-master.png",
              url: "https://cleanmaster.example",
              email: "cleanmasterbe@gmail.com",
              telephone: "+32 471 05 12 39",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bruxelles",
                addressCountry: "BE",
              },
              areaServed: "Belgique",
              sameAs: ["https://www.instagram.com/cleanmaster.be/"],
            }),
          }}
        />
      </Head>

      <main>
        <Navbar />
        <div id="hero">
          <Hero />
        </div>
        <About />
        <Services />
        <FeaturePanels />
        <BeforeAfter />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
