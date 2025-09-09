// components/Footer.js
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-black/[0.06] bg-white/70 backdrop-blur">
      <div className="container py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        
        {/* Copyright */}
        <p>© {year} Clean Master. Tous droits réservés.</p>
        
        {/* Crédit auteur */}
        <p>
          Site par <span className="font-medium text-gray-800">Ilyas Nassiri</span> —{" "}
          <a
            href="mailto:nassiriilyase@gmail.com"
            className="hover:underline"
          >
            nassiriilyase@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}

