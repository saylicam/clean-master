import { useEffect, useState } from "react";

export function useScrollSpy(ids = [], offset = 120) {
  const [active, setActive] = useState(ids[0] || null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const pos = window.scrollY + offset;
          let current = ids[0];
          for (const sec of sections) {
            if (sec.offsetTop <= pos) current = sec.id;
          }
          setActive(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return active;
}
