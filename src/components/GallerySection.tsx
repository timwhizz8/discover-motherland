"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye } from "lucide-react";

const galleryItems = [
  { id: "kruger",   title: "Kruger National Park", subtitle: "South Africa",      src: "/gallery-kruger.png",        alt: "Aerial view of Kruger National Park with wildlife", size: "large" },
  { id: "lion",     title: "Big 5 Encounters",     subtitle: "Savanna Wildlife",  src: "/gallery-lion.png",          alt: "Majestic African lion portrait in golden grass",    size: "small" },
  { id: "victoria", title: "Victoria Falls",       subtitle: "Zambia & Zimbabwe", src: "/gallery-victoria-falls.png", alt: "Victoria Falls with rainbow mist over the gorge",  size: "small" },
  { id: "suncity",  title: "Sun City Resort",      subtitle: "South Africa",      src: "/gallery-suncity.png",       alt: "Sun City Palace Hotel at dusk",                    size: "large" },
];

function GalleryItem({ item, isLarge }: { item: typeof galleryItems[0]; isLarge?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const imgX    = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);
  const imgY    = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      style={{ gridColumn: isLarge ? "span 2" : "span 1", position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", height: isLarge ? 420 : 300, rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000, border: "1px solid rgba(200,134,10,0.15)", boxShadow: hovered ? "var(--shadow-gold)" : "0 8px 30px rgba(0,0,0,0.4)", transition: "box-shadow 0.3s ease" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setHovered(false); }}
      initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}
    >
      <motion.div style={{ position: "absolute", inset: "-8%", x: imgX, y: imgY }}>
        <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease" }} />
      </motion.div>
      <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.1) 60%)" : "linear-gradient(to top, rgba(20,20,20,0.7) 0%, rgba(20,20,20,0.05) 70%)", transition: "background 0.4s ease" }} />
      <motion.div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
        <motion.div animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0.8 }} transition={{ duration: 0.3 }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--ochre)", textTransform: "uppercase", marginBottom: 4 }}>{item.subtitle}</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: isLarge ? "1.6rem" : "1.2rem", fontWeight: 700, color: "var(--warm-cream)", lineHeight: 1.2 }}>{item.title}</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }} transition={{ duration: 0.25 }}
          style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(200,134,10,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(200,134,10,0.4)", borderRadius: 20, padding: "6px 14px" }}
        >
          <Eye size={13} style={{ color: "var(--ochre-light)" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--ochre-light)", fontWeight: 600 }}>Explore</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="section-padding" style={{ background: "var(--charcoal-mid)" }}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Destinations Gallery</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, color: "var(--warm-cream)", marginBottom: 14 }}>Where Will Africa Take You?</h2>
          <p style={{ maxWidth: 520, margin: "0 auto", color: "rgba(249,243,232,0.58)", lineHeight: 1.7 }}>From the Big 5 on the Kruger plains to the thundering mists of Victoria Falls — each destination is a world unto itself.</p>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {galleryItems.map((item) => <GalleryItem key={item.id} item={item} isLarge={item.size === "large"} />)}
        </div>
        <style>{`@media(max-width:768px){#gallery .container-custom>div:last-child{grid-template-columns:1fr!important}#gallery .container-custom>div:last-child>div{grid-column:span 1!important;height:260px!important}}`}</style>
      </div>
    </section>
  );
}
