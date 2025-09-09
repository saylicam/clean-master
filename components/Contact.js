// components/Contact.js
import { useState } from "react";
import { siteConfig } from "../lib/siteConfig"; // { company, phone, email, address }

function Field({ name, type = "text", label, required, autoComplete, className = "" }) {
  return (
    <label className={`relative block ${className}`}>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 outline-none transition
                   focus:border-black/60 focus:ring-4 focus:ring-black/5"
      />
      <span
        className="pointer-events-none absolute left-3 top-3 px-1 text-gray-500 transition-all
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                   peer-focus:-top-2 peer-focus:bg-white peer-focus:text-xs peer-focus:text-black/80
                   peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:text-xs"
      >
        {label} {required && <sup className="text-red-500">*</sup>}
      </span>
    </label>
  );
}

export default function Contact() {
  const [sending, setSending] = useState(false);
  const to = siteConfig.email || "cleanmasterbe@gmail.com";

  // On construit une URL mailto propre (Gmail s’ouvrira avec le contenu)
  const onSubmit = (e) => {
    e.preventDefault();
    if (sending) return;

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") || "";
    const email = fd.get("email") || "";
    const phone = fd.get("phone") || "";
    const subject = fd.get("subject") || "Demande d'information";
    const message = fd.get("message") || "";

    const body =
      `Nom : ${name}\n` +
      `Email : ${email}\n` +
      (phone ? `Téléphone : ${phone}\n` : "") +
      `\nMessage :\n${message}\n`;

    const url =
      `mailto:${encodeURIComponent(to)}` +
      `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSending(true);
    // Ouvre le client mail (Gmail si configuré par l’utilisateur)
    window.location.href = url;
    // petit délai pour réactiver le bouton si l’utilisateur revient
    setTimeout(() => setSending(false), 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Form card */}
          <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-soft">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Contactez-nous</h2>
            <p className="mt-2 text-gray-600">Une question, un devis ? Réponse sous 24h.</p>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field name="name" label="Votre nom" required autoComplete="name" />
                <Field name="email" type="email" label="Votre email" required autoComplete="email" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field name="phone" label="Téléphone (optionnel)" autoComplete="tel" />
                <Field name="subject" label="Objet (optionnel)" />
              </div>

              <label className="relative block">
                <textarea
                  name="message"
                  placeholder=" "
                  required
                  rows={6}
                  className="peer w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 outline-none transition
                             focus:border-black/60 focus:ring-4 focus:ring-black/5"
                />
                <span
                  className="pointer-events-none absolute left-3 top-3 px-1 text-gray-500 transition-all
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                             peer-focus:-top-2 peer-focus:bg-white peer-focus:text-xs peer-focus:text-black/80
                             peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:text-xs"
                >
                  Votre message <sup className="text-red-500">*</sup>
                </span>
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-gray-500">
                  En cliquant sur « Envoyer », votre application e-mail s’ouvrira avec votre message pré-rempli.
                </p>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 self-start rounded-full bg-black px-6 py-3 text-white
                             shadow transition hover:opacity-90 disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" />
                        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" />
                      </svg>
                      Envoi…
                    </>
                  ) : (
                    <>Envoyer</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info pane */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-soft">
              <h3 className="text-lg font-semibold">{siteConfig.company || "Clean Master"}</h3>

              <div className="mt-4 space-y-3 text-gray-700">
                {siteConfig.address && (
                  <p className="flex items-start gap-3">
                    <svg className="mt-1 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z"/><circle cx="12" cy="11" r="2"/></svg>
                    {siteConfig.address}
                  </p>
                )}

                {siteConfig.phone && (
                  <p className="flex items-center gap-3">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 5.1 2 2 0 0 1 4.1 3h3a2 2 0 0 1 2 1.72c.12.89.32 1.76.6 2.6a2 2 0 0 1-.45 2.11L8.09 10a16 16 0 0 0 6 6l.57-1.16a2 2 0 0 1 2.11-.45c.84.28 1.71.48 2.6.6A2 2 0 0 1 22 16.92Z"/></svg>
                    <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="font-medium hover:underline">
                      {siteConfig.phone}
                    </a>
                  </p>
                )}

                {siteConfig.email && (
                  <p className="flex items-center gap-3">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m4 6 8 6 8-6"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
                    <a href={`mailto:${siteConfig.email}`} className="font-medium hover:underline">
                      {siteConfig.email}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-brand/10 to-brand/5 p-6 shadow-soft">
              <h4 className="font-semibold">Besoin d’un devis ?</h4>
              <p className="mt-1 text-gray-700">
                Décrivez votre besoin, nous revenons avec une estimation claire.
              </p>
              <a
                href={`mailto:${to}?subject=${encodeURIComponent("Demande de devis")}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-white transition hover:opacity-90"
              >
                Demander un devis
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
