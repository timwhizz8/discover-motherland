"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Heart, Leaf, Globe } from "lucide-react";

const stats = [
  { value: 2400, suffix: "+", label: "Happy Travellers",    icon: Heart },
  { value: 12,   suffix: "+", label: "Years of Excellence", icon: Shield },
  { value: 18,   suffix: "",  label: "Destinations",        icon: Globe },
  { value: 98,   suffix: "%", label: "Satisfaction Rate",   icon: Leaf },
];

const values = [
  { icon: Shield, title: "POPIA & GDPR Compliant",  desc: "Your data is handled with full transparency and legal compliance." },
  { icon: Heart,  title: "Passion for Africa",       desc: "Every journey we curate is infused with authenticity and African warmth." },
  { icon: Leaf,   title: "Responsible Tourism",      desc: "We partner with eco-certified lodges and community-owned initiatives." },
  { icon: Globe,  title: "Pan-African Reach",        desc: "Our network spans 18+ African destinations across the continent." },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  useEffect(() => {
    if (!isInView) return;
    let val = 0;
    const timer = setInterval(() => {
      val += Math.ceil(target / 80);
      if (val >= target) { setCount(target); clearInterval(timer); }
      else setCount(val);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section id="about" className="section-padding" style={{ background: "var(--deep-green)" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, background: "rgba(0,0,0,0.2)", borderRadius: 20, border: "1px solid rgba(200,134,10,0.15)", overflow: "hidden", marginBottom: 100 }}>
          {stats.map(({ value, suffix, label, icon: Icon }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
              style={{ padding: "48px 32px", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(200,134,10,0.1)" : "none" }}
            >
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(200,134,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Icon size={22} style={{ color: "var(--ochre-light)" }} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 800, color: "var(--ochre-light)", lineHeight: 1, marginBottom: 8 }}>
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div style={{ fontSize: "0.85rem", color: "rgba(249,243,232,0.65)", fontWeight: 500 }}>{label}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="section-label">About Us</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--warm-cream)", lineHeight: 1.2, marginBottom: 24 }}>
              More Than a Tour Operator —<br /><span className="text-gradient-gold">We Are Storytellers of Africa</span>
            </h2>
            <p style={{ color: "rgba(249,243,232,0.7)", lineHeight: 1.8, marginBottom: 20 }}>
              Discover Motherland Africa Tours was founded with a singular mission: to give every traveller an authentic, transformative encounter with the African continent.
            </p>
            <p style={{ color: "rgba(249,243,232,0.7)", lineHeight: 1.8, marginBottom: 32 }}>
              Our team of seasoned African travel experts, field guides, and cultural liaisons craft bespoke journeys that go beyond the surface — immersing you in the landscape, the people, and the heartbeat of the motherland.
            </p>
            <a href="#enquiry" onClick={(e) => { e.preventDefault(); document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-primary">
              Start Your Journey
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(200,134,10,0.15)", borderRadius: 14, padding: "22px 18px" }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(200,134,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon size={18} style={{ color: "var(--ochre-light)" }} />
                </div>
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--warm-cream)", marginBottom: 8, lineHeight: 1.3 }}>{title}</h4>
                <p style={{ fontSize: "0.8rem", color: "rgba(249,243,232,0.6)", lineHeight: 1.65 }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
      </div>
    </section>
  );
}
