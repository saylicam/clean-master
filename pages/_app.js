import "../styles/globals.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.08 });
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className={inter.className}>
      <ScrollProgress />
      <Component {...pageProps} />
    </div>
  );
}
