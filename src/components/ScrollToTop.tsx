//! File: src/components/ScrollToTop.tsx

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-theme-accent/80 hover:bg-theme-accent transition-colors shadow-lg border-2 border-theme-accent/30
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"} 
        duration-300 flex items-center justify-center`}
      onClick={scrollToTop}
      style={{ backdropFilter: "blur(6px)" }}
    >
      <ArrowUp className="w-6 h-6 text-white drop-shadow" />
    </button>
  );
}