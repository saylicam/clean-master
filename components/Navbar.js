import { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollSpy } from "../hooks/useScrollSpy";

const LINKS = [
  { id: "about", label: "À propos" },
  { id: "services", label: "Services" },
  { id: "before-after", label: "Avant/Après" },
  { id: "gallery", label: "Galerie" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(["hero", ...LINKS.map(l => l.id)], 140);

  // Shrink + blur au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // Fermer le menu après clic sur un lien
  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white/70 backdrop-blur-md border-b border-white/30 shadow-soft" : "bg-white/0"}
        ${scrolled ? "h-14" : "h-16"}`}
      aria-label="Barre de navigation"
    >
      <div className="container h-full flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3">
          <Image
            src="/logo-clean-master.png"
            alt="Clean Master logo"
            width={36}
            height={36}
            className="object-contain rounded-full ring-1 ring-black/10 bg-white"
            priority
          />
          <span className="font-semibold tracking-tight">Clean Master</span>
        </a>

        {/* Liens desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative transition-colors ${
                active === l.id ? "text-black" : "text-gray-600 hover:text-black"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-black transition-all
                  ${active === l.id ? "w-full opacity-100" : "w-0 opacity-0"}`}
              />
            </a>
          ))}

          <a
            href="#devis"
            className="inline-flex items-center px-4 py-2 rounded-full bg-black text-white hover:opacity-90 transition"
          >
            Demander un devis
          </a>
        </nav>

        {/* Burger mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/10 bg-white/70"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <BurgerIcon open={open} />
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-[${scrolled ? "56px" : "64px"}] top-14
          ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={close}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-[calc(100vh-3.5rem)] w-[84%] max-w-sm
            bg-white shadow-xl border-l border-black/10
            transition-transform duration-300 ease-out
            ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <nav className="p-6 flex flex-col gap-2">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={close}
                className={`px-4 py-3 rounded-xl transition
                  ${active === l.id ? "bg-black text-white" : "hover:bg-gray-100"}`}
              >
                {l.label}
              </a>
            ))}

            <a
              href="#devis"
              onClick={close}
              className="mt-4 px-4 py-3 rounded-xl bg-black text-white text-center"
            >
              Demander un devis
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* Icône burger animée */
function BurgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className="stroke-black">
      <g
        className={`origin-center transition-all duration-300 ${open ? "opacity-0 -translate-y-1" : "opacity-100"}`}
      >
        <line x1="4" y1="7" x2="20" y2="7" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="12" x2="20" y2="12" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="17" x2="20" y2="17" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g
        className={`origin-center transition-all duration-300 ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"}`}
      >
        <line x1="5" y1="5" x2="19" y2="19" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="5" x2="5" y2="19" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
