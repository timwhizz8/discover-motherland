"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Globe, MessageSquare, Shield, CheckCircle, AlertCircle, Send, ChevronDown } from "lucide-react";
import { enquirySchema, type EnquiryFormData, partySizeOptions, monthOptions, budgetOptions } from "@/lib/validation";
import { campaigns } from "@/lib/campaigns";

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <AlertCircle size={12} style={{ color: "#e05252", flexShrink: 0 }} />
          <span style={{ fontSize: "0.76rem", color: "#e05252" }}>{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormField({ label, error, children, required }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(249,243,232,0.75)", letterSpacing: "0.03em" }}>
        {label} {required && <span style={{ color: "var(--ochre)" }}>*</span>}
      </label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

const sel: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,134,10,0.25)", borderRadius: 6, padding: "14px 18px", color: "var(--warm-cream)", fontFamily: "var(--font-body)", fontSize: "0.95rem", outline: "none", appearance: "none", cursor: "pointer" };

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { marketingConsent: false },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitting(true);
    console.log("Enquiry submitted:", data); // TODO: wire to API / Formspree / EmailJS
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="enquiry" className="section-padding" style={{ background: "var(--charcoal-mid)" }}>
        <div className="container-custom" style={{ textAlign: "center", maxWidth: 560 }}>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, var(--ochre), var(--terracotta))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <CheckCircle size={44} style={{ color: "#fff" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--warm-cream)", marginBottom: 16 }}>Thank You!</h2>
            <p style={{ color: "rgba(249,243,232,0.7)", lineHeight: 1.75, marginBottom: 32 }}>
              Your enquiry has been received. A specialist will contact you within 24 hours to start planning your perfect African adventure.
            </p>
            <button onClick={() => { setSubmitted(false); reset(); }} className="btn-outline">Submit Another Enquiry</button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="section-padding" style={{ background: "var(--charcoal-mid)" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "start" }} className="enquiry-grid">

          {/* Left info panel */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="section-label">Plan Your Journey</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--warm-cream)", lineHeight: 1.2, marginBottom: 20 }}>
              Start Your African<br /><span className="text-gradient-gold">Adventure Today</span>
            </h2>
            <p style={{ color: "rgba(249,243,232,0.65)", lineHeight: 1.8, marginBottom: 36 }}>
              Complete the form and one of our African travel specialists will craft a bespoke itinerary tailored specifically for you — at no obligation.
            </p>
            {[
              { icon: CheckCircle, label: "No booking fees or hidden charges" },
              { icon: CheckCircle, label: "Personalised itinerary within 24 hours" },
              { icon: CheckCircle, label: "Expert field guides on every tour" },
              { icon: CheckCircle, label: "Fully bonded & insured operator" },
              { icon: Shield,      label: "Data protected under POPIA & GDPR" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(200,134,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} style={{ color: "var(--ochre-light)" }} />
                </div>
                <span style={{ fontSize: "0.88rem", color: "rgba(249,243,232,0.75)" }}>{label}</span>
              </div>
            ))}
            <div style={{ marginTop: 40, padding: "24px", background: "rgba(200,134,10,0.08)", border: "1px solid rgba(200,134,10,0.2)", borderRadius: 14 }}>
              <div style={{ fontSize: "0.78rem", letterSpacing: "0.12em", color: "var(--ochre)", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>Contact Us Directly</div>
              <a href="tel:+27649396831" style={{ color: "rgba(249,243,232,0.8)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Phone size={14} style={{ color: "var(--ochre)" }} /> +27 64 939 6831 (Calls)
              </a>
              <a href="https://wa.me/27649396831" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(249,243,232,0.8)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <MessageSquare size={14} style={{ color: "#25D366" }} /> +27 64 939 6831 (WhatsApp)
              </a>
              <a href="mailto:info@discovermotherland.co.za" style={{ color: "rgba(249,243,232,0.8)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>
                <Mail size={14} style={{ color: "var(--ochre)" }} /> info@discovermotherland.co.za
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <form id="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate
              style={{ background: "rgba(28,28,28,0.8)", border: "1px solid rgba(200,134,10,0.15)", borderRadius: 24, padding: "40px", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", gap: 22 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <FormField label="First Name" error={errors.firstName?.message} required>
                  <div style={{ position: "relative" }}>
                    <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                    <input id="field-firstName" className={`form-input${errors.firstName ? " error" : ""}`} style={{ paddingLeft: 42 }} placeholder="First name" {...register("firstName")} />
                  </div>
                </FormField>
                <FormField label="Last Name" error={errors.lastName?.message} required>
                  <div style={{ position: "relative" }}>
                    <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                    <input id="field-lastName" className={`form-input${errors.lastName ? " error" : ""}`} style={{ paddingLeft: 42 }} placeholder="Last name" {...register("lastName")} />
                  </div>
                </FormField>
              </div>

              <FormField label="Email Address" error={errors.email?.message} required>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                  <input id="field-email" type="email" className={`form-input${errors.email ? " error" : ""}`} style={{ paddingLeft: 42 }} placeholder="your@email.com" {...register("email")} />
                </div>
              </FormField>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <FormField label="Phone Number" error={errors.phone?.message}>
                  <div style={{ position: "relative" }}>
                    <Phone size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                    <input id="field-phone" type="tel" className={`form-input${errors.phone ? " error" : ""}`} style={{ paddingLeft: 42 }} placeholder="+27 00 000 0000" {...register("phone")} />
                  </div>
                </FormField>
                <FormField label="Country of Residence" error={errors.country?.message} required>
                  <div style={{ position: "relative" }}>
                    <Globe size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none", zIndex: 1 }} />
                    <input id="field-country" className={`form-input${errors.country ? " error" : ""}`} style={{ paddingLeft: 42 }} placeholder="e.g. South Africa" {...register("country")} />
                  </div>
                </FormField>
              </div>

              <FormField label="Trip of Interest" error={errors.tripInterest?.message} required>
                <div style={{ position: "relative" }}>
                  <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                  <select id="field-tripInterest" style={{ ...sel, border: errors.tripInterest ? "1px solid #e05252" : sel.border }} {...register("tripInterest")}>
                    <option value="" style={{ background: "#1c1c1c" }}>Select a trip...</option>
                    {campaigns.map((c) => <option key={c.id} value={c.title} style={{ background: "#1c1c1c" }}>{c.title}</option>)}
                    <option value="Custom Itinerary" style={{ background: "#1c1c1c" }}>Custom / Bespoke Itinerary</option>
                  </select>
                </div>
              </FormField>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <FormField label="Party Size" error={errors.travelPartySize?.message} required>
                  <div style={{ position: "relative" }}>
                    <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                    <select id="field-partySize" style={{ ...sel, border: errors.travelPartySize ? "1px solid #e05252" : sel.border }} {...register("travelPartySize")}>
                      <option value="" style={{ background: "#1c1c1c" }}>Select size...</option>
                      {partySizeOptions.map((o) => <option key={o} value={o} style={{ background: "#1c1c1c" }}>{o}</option>)}
                    </select>
                  </div>
                </FormField>
                <FormField label="Preferred Month" error={errors.preferredTravelMonth?.message} required>
                  <div style={{ position: "relative" }}>
                    <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                    <select id="field-travelMonth" style={{ ...sel, border: errors.preferredTravelMonth ? "1px solid #e05252" : sel.border }} {...register("preferredTravelMonth")}>
                      <option value="" style={{ background: "#1c1c1c" }}>Select month...</option>
                      {monthOptions.map((m) => <option key={m} value={m} style={{ background: "#1c1c1c" }}>{m}</option>)}
                    </select>
                  </div>
                </FormField>
              </div>

              <FormField label="Budget Range (per person)" error={errors.budget?.message}>
                <div style={{ position: "relative" }}>
                  <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                  <select id="field-budget" style={sel} {...register("budget")}>
                    <option value="" style={{ background: "#1c1c1c" }}>Select budget (optional)...</option>
                    {budgetOptions.map((b) => <option key={b} value={b} style={{ background: "#1c1c1c" }}>{b}</option>)}
                  </select>
                </div>
              </FormField>

              <FormField label="Additional Message" error={errors.message?.message}>
                <div style={{ position: "relative" }}>
                  <MessageSquare size={16} style={{ position: "absolute", left: 14, top: 14, color: "rgba(200,134,10,0.6)", pointerEvents: "none" }} />
                  <textarea id="field-message" className={`form-input${errors.message ? " error" : ""}`} style={{ paddingLeft: 42, minHeight: 100, resize: "vertical" }} placeholder="Tell us about your dream trip..." {...register("message")} />
                </div>
              </FormField>

              {/* POPIA Consent */}
              <div style={{ background: "rgba(200,134,10,0.06)", border: "1px solid rgba(200,134,10,0.2)", borderRadius: 12, padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Shield size={18} style={{ color: "var(--ochre)" }} />
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--ochre-light)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Data Privacy &amp; POPIA Consent</div>
                </div>

                <label id="popia-consent-label" style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                  <input id="field-popiaConsent" type="checkbox" {...register("popiaConsent")} style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--ochre)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", color: "rgba(249,243,232,0.78)", lineHeight: 1.6 }}>
                    <strong style={{ color: "var(--warm-cream)" }}>I consent to the processing of my personal information</strong> by Discover Motherland Africa Tours for the purpose of responding to my travel enquiry, as described in our{" "}
                    <a href="/legal/privacy-policy" target="_blank" style={{ color: "var(--ochre-light)", textDecoration: "underline" }}>Privacy Policy</a>.
                    I understand my rights under POPIA No. 4 of 2013. <span style={{ color: "var(--ochre)" }}>*Required</span>
                  </span>
                </label>
                <FieldError msg={errors.popiaConsent?.message} />

                <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                  <input id="field-marketingConsent" type="checkbox" {...register("marketingConsent")} style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--ochre)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", color: "rgba(249,243,232,0.65)", lineHeight: 1.6 }}>
                    I agree to receive occasional travel inspiration and offers. I can opt out at any time. <em>(Optional)</em>
                  </span>
                </label>
              </div>

              <motion.button id="enquiry-submit" type="submit" disabled={submitting} whileHover={{ scale: submitting ? 1 : 1.02 }} whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "16px", opacity: submitting ? 0.75 : 1 }}
              >
                {submitting ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%" }} />Sending...</>
                ) : (<>Send My Enquiry <Send size={16} /></>)}
              </motion.button>

              <p style={{ fontSize: "0.74rem", color: "rgba(249,243,232,0.4)", textAlign: "center", lineHeight: 1.5 }}>
                Your information is encrypted and never sold. Processed solely for travel planning under POPIA.
              </p>
            </form>
          </motion.div>
        </div>
        <style>{`@media(max-width:768px){.enquiry-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
      </div>
    </section>
  );
}
