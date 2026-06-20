"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
import CampaignCard from "./CampaignCard";
import { campaigns, categories, type Category } from "@/lib/campaigns";

export default function CampaignsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const filtered = activeCategory === "All" ? campaigns : campaigns.filter((c) => c.category === activeCategory);

  return (
    <section id="campaigns" className="section-padding" style={{ background: "var(--charcoal)" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              <Compass size={14} />Active &amp; Upcoming Campaigns
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: "var(--warm-cream)", marginBottom: 16, lineHeight: 1.2 }}>
              Your Next African Adventure
            </h2>
            <p style={{ maxWidth: 560, margin: "0 auto", color: "rgba(249,243,232,0.62)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Hand-picked journeys designed for the discerning traveller. Every detail curated. Every moment unforgettable.
            </p>
            <div className="divider-gold" style={{ margin: "24px auto" }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
            style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}
          >
            {categories.map((cat) => (
              <button key={cat} id={`filter-${cat.toLowerCase().replace(" ", "-")}`} onClick={() => setActiveCategory(cat)}
                style={{ padding: "9px 22px", borderRadius: 30, border: activeCategory === cat ? "1.5px solid var(--ochre)" : "1.5px solid rgba(200,134,10,0.25)", background: activeCategory === cat ? "linear-gradient(135deg, var(--ochre), var(--terracotta))" : "rgba(255,255,255,0.04)", color: activeCategory === cat ? "#fff" : "rgba(249,243,232,0.65)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.25s ease" }}
              >{cat}</button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}
          >
            {filtered.map((campaign, index) => (
              <CampaignCard key={campaign.id} campaign={campaign} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ textAlign: "center", marginTop: 64 }}>
          <p style={{ color: "rgba(249,243,232,0.55)", marginBottom: 20, fontSize: "0.95rem" }}>Don&apos;t see a trip that suits you? We create bespoke itineraries.</p>
          <a href="#enquiry" onClick={(e) => { e.preventDefault(); document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline">
            Request Custom Itinerary
          </a>
        </motion.div>
      </div>
    </section>
  );
}
