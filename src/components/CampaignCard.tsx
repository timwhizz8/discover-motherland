"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Users, ArrowRight, CheckCircle } from "lucide-react";
import type { Campaign } from "@/lib/campaigns";

interface CampaignCardProps { campaign: Campaign; index: number; }

const badgeColors: Record<string, string> = {
  "BESTSELLER":    "linear-gradient(135deg, #C8860A, #C2522B)",
  "LIMITED SPOTS": "linear-gradient(135deg, #C2522B, #8B1A1A)",
  "NEW":           "linear-gradient(135deg, #1A3C2E, #2D5C46)",
  "SOLD OUT":      "linear-gradient(135deg, #444, #222)",
};

export default function CampaignCard({ campaign, index }: CampaignCardProps) {
  const scrollToEnquiry = () => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{ background: "rgba(32,32,32,0.9)", border: "1px solid rgba(200,134,10,0.12)", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", cursor: "pointer", display: "flex", flexDirection: "column" }}
      onClick={scrollToEnquiry}
    >
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <Image src={campaign.image} alt={`${campaign.title} — ${campaign.location}`} fill style={{ objectFit: "cover", transition: "transform 0.5s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,20,20,0.85) 0%, transparent 60%)" }} />
        {campaign.badge && (
          <div style={{ position: "absolute", top: 16, left: 16, background: badgeColors[campaign.badge] || "#888", color: "#fff", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 6 }}>
            {campaign.badge}
          </div>
        )}
        <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(249,243,232,0.9)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 20 }}>
          {campaign.category}
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 16, textAlign: "right" }}>
          <div style={{ fontSize: "0.68rem", color: "rgba(249,243,232,0.6)", marginBottom: 2 }}>from</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--ochre-light)", lineHeight: 1 }}>
            {campaign.currency} {campaign.price.toLocaleString()}
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "rgba(249,243,232,0.55)" }}><MapPin size={12} style={{ color: "var(--ochre)" }} />{campaign.country}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "rgba(249,243,232,0.55)" }}><Clock size={12} style={{ color: "var(--ochre)" }} />{campaign.duration}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "rgba(249,243,232,0.55)" }}><Users size={12} style={{ color: "var(--ochre)" }} />{campaign.groupSize}</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--warm-cream)", marginBottom: 4, lineHeight: 1.25 }}>{campaign.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
          <MapPin size={13} style={{ color: "var(--terracotta-light)" }} />
          <span style={{ fontSize: "0.82rem", color: "var(--terracotta-light)" }}>{campaign.location}</span>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(200,134,10,0.1)", border: "1px solid rgba(200,134,10,0.25)", borderRadius: 8, padding: "6px 12px", marginBottom: 14, width: "fit-content" }}>
          <Calendar size={13} style={{ color: "var(--ochre)" }} />
          <span style={{ fontSize: "0.8rem", color: "var(--ochre-light)", fontWeight: 600 }}>{campaign.dateRange}</span>
        </div>

        <p style={{ fontSize: "0.88rem", color: "rgba(249,243,232,0.65)", lineHeight: 1.65, marginBottom: 18, flex: 1 }}>{campaign.description}</p>

        <div style={{ marginBottom: 22 }}>
          {campaign.highlights.slice(0, 3).map((h) => (
            <div key={h} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <CheckCircle size={14} style={{ color: "var(--ochre)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.82rem", color: "rgba(249,243,232,0.75)" }}>{h}</span>
            </div>
          ))}
        </div>

        <button id={`card-enquire-${campaign.id}`} onClick={(e) => { e.stopPropagation(); scrollToEnquiry(); }} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          Enquire Now <ArrowRight size={15} />
        </button>
      </div>
    </motion.article>
  );
}
