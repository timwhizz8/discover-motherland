"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { id: 1, name: "Thandi Mokoena",      location: "Johannesburg, SA",   initials: "TM", color: "#C8860A", trip: "Kruger Big 5 Safari",         rating: 5, text: "Words cannot describe the magic of watching a pride of lions at sunrise in the Kruger. Discover Motherland took care of every single detail — from the luxurious lodge to the most knowledgeable ranger we have ever encountered." },
  { id: 2, name: "David & Sarah Okafor",location: "Lagos, Nigeria",      initials: "DO", color: "#C2522B", trip: "Victoria Falls Adventure",     rating: 5, text: "Swimming in Devil's Pool while the waterfall thundered beneath us was the single most exhilarating experience of our lives. The team handled our Zambian visas, transfers, and even arranged a private candlelit dinner overlooking the gorge." },
  { id: 3, name: "Maria van der Berg",  location: "Cape Town, SA",       initials: "MV", color: "#1A3C2E", trip: "Masai Mara Great Migration",   rating: 5, text: "The Great Migration balloon safari was breathtaking — thousands of wildebeest moving like a living river below us. I have travelled with many operators, but Discover Motherland is on another level." },
  { id: 4, name: "James Hutchinson",    location: "London, UK",          initials: "JH", color: "#8B5E3C", trip: "Cape Winelands & Coast",       rating: 5, text: "My wife and I celebrated our anniversary on the Cape Winelands tour. The vineyard dinners, Table Mountain sunrise hike, and whale watching at Hermanus — all perfectly timed and organised." },
  { id: 5, name: "Amara Diallo",        location: "Accra, Ghana",        initials: "AD", color: "#9A6200", trip: "Gold Reef City & Joburg Heritage", rating: 5, text: "The Soweto township tour was the highlight — meeting community leaders and hearing first-hand stories. Discover Motherland frames Africa's story with dignity and pride." },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => { setDirection(1); setCurrent((c) => (c + 1) % testimonials.length); }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDirection(1);  setCurrent((c) => (c + 1) % testimonials.length); };
  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding" style={{ background: "var(--charcoal)" }}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Traveller Stories</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, color: "var(--warm-cream)", marginBottom: 14 }}>Voices from the Motherland</h2>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
        </motion.div>

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={t.id} custom={direction}
              initial={{ opacity: 0, x: direction * 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -80 }} transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{ background: "rgba(32,32,32,0.8)", border: "1px solid rgba(200,134,10,0.15)", borderRadius: 24, padding: "48px 56px", position: "relative", backdropFilter: "blur(10px)" }}
            >
              <div style={{ position: "absolute", top: 32, right: 48, opacity: 0.12 }}><Quote size={80} style={{ color: "var(--ochre)" }} /></div>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill={i < t.rating ? "var(--ochre)" : "none"} style={{ color: "var(--ochre)" }} />)}
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.2vw, 1.2rem)", fontStyle: "italic", color: "rgba(249,243,232,0.88)", lineHeight: 1.75, margin: "24px 0 32px" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem", color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--warm-cream)", fontSize: "0.95rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(249,243,232,0.5)", marginTop: 2 }}>{t.location}</div>
                  </div>
                </div>
                <div style={{ background: "rgba(200,134,10,0.12)", border: "1px solid rgba(200,134,10,0.25)", borderRadius: 8, padding: "6px 14px" }}>
                  <div style={{ fontSize: "0.7rem", color: "rgba(249,243,232,0.5)", marginBottom: 2 }}>Travelled on</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ochre-light)" }}>{t.trip}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
            <button id="testimonial-prev" onClick={prev} aria-label="Previous testimonial" style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(200,134,10,0.12)", border: "1px solid rgba(200,134,10,0.3)", color: "var(--ochre-light)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} aria-label={`Testimonial ${i + 1}`}
                  style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? "var(--ochre)" : "rgba(200,134,10,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }}
                />
              ))}
            </div>
            <button id="testimonial-next" onClick={next} aria-label="Next testimonial" style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(200,134,10,0.12)", border: "1px solid rgba(200,134,10,0.3)", color: "var(--ochre-light)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
