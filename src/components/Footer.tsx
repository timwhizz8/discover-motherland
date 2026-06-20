"use client";
import { Globe, Phone, Mail, MapPin, Share2, Camera, MessageCircle, PlayCircle, ExternalLink } from "lucide-react";
import Galaxy from "./Galaxy";

const footerLinks = {
  Destinations: [
    { label: "Kruger National Park",    href: "#campaigns" },
    { label: "Victoria Falls",          href: "#campaigns" },
    { label: "Sun City Resort",         href: "#campaigns" },
    { label: "Masai Mara, Kenya",       href: "#campaigns" },
    { label: "Cape Winelands",          href: "#campaigns" },
    { label: "Gold Reef City",          href: "#campaigns" },
  ],
  Company: [
    { label: "About Us",        href: "#about" },
    { label: "How It Works",    href: "#campaigns" },
    { label: "Testimonials",    href: "#testimonials" },
    { label: "Gallery",         href: "#gallery" },
    { label: "Contact",         href: "#enquiry" },
  ],
  Legal: [
    { label: "Refund & Cancellation Policy", href: "/legal/refund-policy",   external: true },
    { label: "Privacy Policy (POPIA)",       href: "/legal/privacy-policy",  external: true },
    { label: "Terms & Conditions",           href: "/legal/terms",           external: true },
    { label: "Cookie Policy",               href: "/legal/cookies",         external: true },
  ],
};

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.872.555 9.388.555 9.388.555s7.516 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M12.012 2c-5.506 0-9.97 4.46-9.97 9.963 0 1.93.546 3.73 1.492 5.277L2 22l5.002-1.314a9.89 9.89 0 0 0 5.01 1.35c5.505 0 9.967-4.462 9.967-9.963 0-5.502-4.462-9.963-9.967-9.963zm5.727 13.914c-.244.69-1.42 1.34-1.947 1.4-.492.057-1.127.1-3.29-.76-2.766-1.1-4.545-3.93-4.68-4.12-.136-.18-.993-1.33-.993-2.538 0-1.21.616-1.8 1.012-2.21.166-.17.373-.24.5-.24H8c.12 0 .285-.02.438.35.166.4.57 1.39.62 1.49.05.1.08.22.012.35-.067.13-.1.216-.2.333l-.27.32a.79.79 0 0 0-.15.85c.34.6 1.5 2.5 3.2 4.02a4.42 4.42 0 0 0 2.2 1.25.96.96 0 0 0 .86-.06c.23-.27.87-1.01.99-1.2.12-.18.25-.15.42-.08l1.7.8c.17.08.35.16.4.24.05.08.05.47-.2.1.2.14.7z" />
  </svg>
);

const socials = [
  { Icon: FacebookIcon,   href: "https://facebook.com/discovermotherland", label: "Facebook"  },
  { Icon: InstagramIcon,  href: "https://instagram.com/discovermotherland", label: "Instagram" },
  { Icon: TwitterIcon,    href: "https://twitter.com/discovermother", label: "Twitter"   },
  { Icon: YoutubeIcon,    href: "https://youtube.com/@discovermotherland", label: "YouTube"   },
  { Icon: WhatsappIcon,   href: "https://wa.me/27649396831", label: "WhatsApp"   },
];

const navClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Footer() {
  return (
    <footer style={{ position: "relative", overflow: "hidden", background: "#0c0a0f", borderTop: "1px solid rgba(200,134,10,0.15)" }}>
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={1.2}
        glowIntensity={0.4}
        saturation={85}
        hueShift={35}
        twinkleIntensity={0.4}
        rotationSpeed={0.08}
        repulsionStrength={2.5}
        autoCenterRepulsion={0}
        starSpeed={0.4}
        speed={0.8}
      />
      {/* CTA Banner */}
      <div style={{ position: "relative", zIndex: 1, background: "linear-gradient(135deg, var(--deep-green), rgba(26,60,46,0.8))", padding: "60px 0", borderBottom: "1px solid rgba(200,134,10,0.15)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--warm-cream)", marginBottom: 16 }}>Ready to Experience Africa?</h2>
          <p style={{ color: "rgba(249,243,232,0.65)", marginBottom: 32, fontSize: "1rem" }}>Let our experts craft your perfect African journey — no obligation, no cost to enquire.</p>
          <a href="#enquiry" onClick={(e) => navClick(e, "#enquiry")} className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }}>Plan My Trip</a>
        </div>
      </div>

      {/* Main content */}
      <div className="container-custom" style={{ position: "relative", zIndex: 1, padding: "72px 24px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr", gap: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #C8860A, #C2522B)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Globe size={22} color="#fff" strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#F9F3E8", lineHeight: 1.2 }}>Discover Motherland</div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", fontWeight: 600 }}>Africa Tours</div>
              </div>
            </div>
            <p style={{ color: "rgba(249,243,232,0.55)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: 28, maxWidth: 300 }}>
              Premium African travel experiences curated for the discerning explorer. Born in Africa. Designed for the world.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              <a href="tel:+27649396831" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(249,243,232,0.6)", textDecoration: "none", fontSize: "0.85rem" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--ochre-light)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(249,243,232,0.6)"}
              ><Phone size={14} style={{ color: "var(--ochre)" }} /> +27 64 939 6831</a>
              <a href="https://wa.me/27649396831" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(249,243,232,0.6)", textDecoration: "none", fontSize: "0.85rem" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--ochre-light)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(249,243,232,0.6)"}
              >
                <WhatsappIcon style={{ color: "#25D366" }} /> +27 64 939 6831 (WhatsApp)
              </a>
              <a href="mailto:info@discovermotherland.co.za" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(249,243,232,0.6)", textDecoration: "none", fontSize: "0.85rem" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--ochre-light)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(249,243,232,0.6)"}
              ><Mail size={14} style={{ color: "var(--ochre)" }} /> info@discovermotherland.co.za</a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(249,243,232,0.6)", fontSize: "0.85rem" }}>
                <MapPin size={14} style={{ color: "var(--ochre)", marginTop: 2, flexShrink: 0 }} />
                Johannesburg, Gauteng<br />South Africa
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(200,134,10,0.1)", border: "1px solid rgba(200,134,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(249,243,232,0.6)", transition: "all 0.25s ease", textDecoration: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(200,134,10,0.25)"; (e.currentTarget as HTMLElement).style.color = "var(--ochre-light)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(200,134,10,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(249,243,232,0.6)"; }}
                ><Icon /></a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>{section}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                      target={(link as { external?: boolean }).external ? "_blank" : undefined}
                      rel={(link as { external?: boolean }).external ? "noopener noreferrer" : undefined}
                      onClick={(e) => { if (!(link as { external?: boolean }).external) navClick(e, link.href); }}
                      style={{ color: "rgba(249,243,232,0.55)", fontSize: "0.87rem", textDecoration: "none", transition: "color 0.2s ease", display: "flex", alignItems: "center", gap: 5 }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--warm-cream)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(249,243,232,0.55)"}
                    >
                      {link.label}
                      {(link as { external?: boolean }).external && <ExternalLink size={11} style={{ opacity: 0.6 }} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 0" }}>
        <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: "0.78rem", color: "rgba(249,243,232,0.35)" }}>
            © {new Date().getFullYear()} Discover Motherland Africa Tours. All rights reserved. Registered in South Africa. POPIA compliant.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[{ label: "Privacy Policy", href: "/legal/privacy-policy" }, { label: "Refund Policy", href: "/legal/refund-policy" }, { label: "Terms", href: "/legal/terms" }].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" style={{ fontSize: "0.76rem", color: "rgba(249,243,232,0.35)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--ochre)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(249,243,232,0.35)"}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:560px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}
