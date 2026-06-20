"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Star, Users, Award } from "lucide-react";

const floatingBadges = [
  { icon: Star,   label: "5-Star Rated",      value: "4.9/5",  delay: 0.8 },
  { icon: Users,  label: "Happy Travellers",  value: "2,400+", delay: 1.0 },
  { icon: Award,  label: "Years Excellence",  value: "12+",    delay: 1.2 },
  { icon: MapPin, label: "Destinations",      value: "18+",    delay: 1.4 },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY     = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={containerRef} id="hero" style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: 0, y: yParallax }}>
        <Image src="/hero-savanna.png" alt="Golden African savanna at sunset" fill priority style={{ objectFit: "cover", objectPosition: "center" }} className="animate-ken-burns" />
        <div className="gradient-hero" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,28,28,0.5) 0%, transparent 60%)" }} />
      </motion.div>

      <motion.div style={{ position: "relative", zIndex: 10, height: "100%", y: textY, opacity }} className="container-custom">
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 100, maxWidth: 780 }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="section-label" style={{ color: "var(--ochre-light)", marginBottom: 24 }}>
            Premium African Travel Experiences
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.1, color: "var(--warm-cream)", marginBottom: 24 }}
          >
            <span className="text-gradient-gold">Scream Africa.</span><br />
            <span>Feel the Pulse<br />of the Motherland.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.25rem)", color: "rgba(249,243,232,0.82)", maxWidth: 560, marginBottom: 44, lineHeight: 1.75 }}
          >
            Curated luxury safaris, iconic landmarks, and transformative cultural journeys across South Africa, Zambia, Zimbabwe, Kenya and beyond.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a id="hero-explore-cta" href="#campaigns" onClick={(e) => { e.preventDefault(); document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-primary">
              Explore Trips <ChevronDown size={16} />
            </a>
            <a id="hero-enquiry-cta" href="#enquiry" onClick={(e) => { e.preventDefault(); document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline">
              Free Consultation
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} style={{ display: "flex", gap: 16, marginTop: 56, flexWrap: "wrap" }}>
            {floatingBadges.map(({ icon: Icon, label, value, delay }) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.5, type: "spring" }}
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,134,10,0.25)", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, rgba(200,134,10,0.3), rgba(194,82,43,0.3))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={17} style={{ color: "var(--ochre-light)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--warm-cream)", lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(249,243,232,0.6)", marginTop: 2 }}>{label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.button onClick={() => document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 20 }}
        aria-label="Scroll down" className="animate-float"
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(249,243,232,0.5)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 28, height: 44, border: "1.5px solid rgba(200,134,10,0.5)", borderRadius: 14, display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ochre)" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
