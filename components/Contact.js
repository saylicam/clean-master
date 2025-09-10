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
        className="
          pointer-events-none absolute left-3 top-3 px-1 text-gray-500 transition-all
          /* état vide */
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
          /* focus */
          peer-focus:-top-2 peer-focus:bg-white peer-focus:text-xs peer-focus:text-black/80
          /* valeur tapée */
          peer-[:not(:placeholder-shown)]:-top-2
          peer-[:not(:placeholder-shown)]:bg-white
          peer-[:not(:placeholder-shown)]:text-xs
          /* auto-remplissage Chrome/Edge */
          peer-[:-webkit-autofill]:-top-2
          peer-[:-webkit-autofill]:bg-white
          peer-[:-webkit-autofill]:text-xs
        "
      >
        {label} {required && <sup className="text-red-500">*</sup>}
      </span>
    </label>
  );
}

export default function Contact() {
  const [sending, setSending] = useState(false);
  const to = siteConfig.email || "cleanmasterbe@gmail.com";

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
    window.location.href = url;
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
                  className="
                    pointer-events-none absolute left-3 top-3 px-1 text-gray-500 transition-all
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                    peer-focus:-top-2 peer-focus:bg-white peer-focus:text-xs peer-focus:text-black/80
                    peer-[:not(:placeholder-shown)]:-top-2
                    peer-[:not(:placeholder-shown)]:bg-white
                    peer-[:not(:placeholder-shown)]:text-xs
                  "
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

          {/* Info pane + réseaux */}
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

              {/* Réseaux sociaux */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Suivez-nous</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/cleanmaster.be/?hl=fr"
                    target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full
                               border border-gray-200 bg-white/90 text-gray-700 shadow
                               transition hover:border-black/30 hover:bg-black hover:text-white"
                    title="Instagram"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 15.8 2.8 2.8 0 0 0 12 9.2zm5.3-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61559950247331"
                    target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full
                               border border-gray-200 bg-white/90 text-gray-700 shadow
                               transition hover:border-black/30 hover:bg-black hover:text-white"
                    title="Facebook"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.6V12h2.6V9.7c0-2.6 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.tiktok.com/@cleanmaster_be"
                    target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full
                               border border-gray-200 bg-white/90 text-gray-700 shadow
                               transition hover:border-black/30 hover:bg-black hover:text-white"
                    title="TikTok"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 8.2a6.8 6.8 0 0 1-4-1.3v7.2a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v2.7a3.4 3.4 0 1 0 2.7 3.3V2.5h2.5a6.8 6.8 0 0 0 4 4v1.7z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-gray-900/5 to-gray-900/0 p-6 shadow-soft">
              <h4 className="font-semibold">Besoin d’un devis ?</h4>
              <p className="mt-1 text-gray-700">
                Décrivez votre besoin, nous revenons avec une estimation claire.
              </p>
              <a
                href={`mailto:${to}?subject=${encodeURIComponent("Demande de devis")}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-white transition hover:opacity-90"
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
