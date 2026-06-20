"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Phone, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Destinations", href: "#campaigns" },
  { label: "Gallery",      href: "#gallery" },
  { label: "About Us",     href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Enquire",      href: "#enquiry" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "all 0.4s ease",
          background: scrolled ? "rgba(20,20,20,0.92)" : "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,134,10,0.18)" : "none",
        }}
      >
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, #C8860A, #C2522B)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Globe size={22} color="#fff" strokeWidth={1.8} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "#F9F3E8", lineHeight: 1.2 }}>Discover Motherland</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", fontWeight: 600 }}>Africa Tours</div>
            </div>
          </a>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                style={{ color: "rgba(249,243,232,0.85)", textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, letterSpacing: "0.04em", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ochre-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(249,243,232,0.85)")}
              >{link.label}</a>
            ))}
            <a href="tel:+27649396831" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ochre)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
              <Phone size={14} />+27 64 939 6831
            </a>
            <a href="#enquiry" onClick={(e) => handleNavClick(e, "#enquiry")} className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.82rem" }}>
              Book Now <ChevronRight size={14} />
            </a>
          </div>

          <button id="mobile-menu-toggle" aria-label="Toggle mobile menu" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "transparent", border: "none", color: "var(--warm-cream)", cursor: "pointer", padding: 8 }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.35 }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "80%", maxWidth: 360, background: "rgba(18,18,18,0.97)", backdropFilter: "blur(20px)", zIndex: 200, padding: "100px 32px 40px", borderLeft: "1px solid rgba(200,134,10,0.2)", display: "flex", flexDirection: "column", gap: 8 }}
          >
            {navLinks.map((link, i) => (
              <motion.a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.1 }}
                style={{ color: "var(--warm-cream)", textDecoration: "none", fontSize: "1.4rem", fontFamily: "var(--font-display)", fontWeight: 600, padding: "14px 0", borderBottom: "1px solid rgba(200,134,10,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                {link.label}<ChevronRight size={18} style={{ color: "var(--ochre)" }} />
              </motion.a>
            ))}
            <motion.a href="#enquiry" onClick={(e) => handleNavClick(e, "#enquiry")} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="btn-primary" style={{ marginTop: 32, justifyContent: "center" }}>
              Enquire Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 150 }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
