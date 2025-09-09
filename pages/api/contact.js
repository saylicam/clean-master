// pages/api/contact.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO || "cleanmasterbe@gmail.com";
const FROM = process.env.CONTACT_FROM || "Clean Master <onboarding@resend.dev>";

function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, (m) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  ));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name = "", email = "", subject = "", message = "" } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: "Champs requis manquants." });

    const html = `
      <h2>Nouveau message depuis le site Clean Master</h2>
      <p><b>Nom :</b> ${escapeHtml(name)}</p>
      <p><b>Email :</b> ${escapeHtml(email)}</p>
      ${subject ? `<p><b>Objet :</b> ${escapeHtml(subject)}</p>` : ""}
      <p><b>Message :</b></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
    `;

    await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: subject ? `Contact – ${subject}` : `Demande de contact – ${name}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Impossible d'envoyer l’email pour le moment." });
  }
}
