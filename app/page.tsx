"use client";

import { useEffect, useRef, useState } from "react";
import ScrollVideo from "./components/ScrollVideo";
import RulesSection from "./components/RulesSection";
import Timeline from "./components/Timeline";
import EventInfo from "./components/EventInfo";
import Footer from "./components/Footer";
import RegisterCTA from "./components/RegisterCTA";

/** Maps scroll progress [0–1] to opacity using enter/peak/exit/leave thresholds */
function calcOpacity(
  p: number,
  enter: number,
  peak: number,
  exit: number,
  leave: number
): number {
  if (p < enter) return 0;
  if (p < peak) return (p - enter) / (peak - enter);
  if (p < exit) return 1;
  if (p < leave) return 1 - (p - exit) / (leave - exit);
  return 0;
}

const fixedSection: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 2rem",
  transition: "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

export default function Home() {
  const [scroll, setScroll] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Clamp to just the 400vh video spacer — not the full page height
      const maxScroll = 4 * window.innerHeight;
      setScroll(Math.min(window.scrollY / maxScroll, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Each section's visible scroll window (0–1)
  const heroOpacity = calcOpacity(scroll, 0, 0, 0.26, 0.33);
  const midOpacity = calcOpacity(scroll, 0.33, 0.37, 0.62, 0.68);
  const endOpacity = calcOpacity(scroll, 0.68, 0.72, 0.92, 1.0);

  return (
    <>
      <ScrollVideo />

      {/* Tall spacer drives scroll length */}
      <div style={{ height: "400vh" }} />

      {/* Fixed overlay — all sections live here */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* ——— Hero ——— */}
        <section style={{ ...fixedSection, opacity: heroOpacity }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HackMatrix
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "1rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "480px",
              lineHeight: 1.6,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            Organized by Nexus SIT &amp; CSBS
          </p>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              animation: "bounce 2s ease infinite",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Scroll
            </span>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" style={{ opacity: 0.3 }}>
              <rect x="1" y="1" width="18" height="26" rx="9" stroke="white" strokeWidth="1.5" />
              <circle cx="10" cy="8" r="2.5" fill="white">
                <animate attributeName="cy" values="8;18;8" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* ——— Mid ——— */}
        <section style={{ ...fixedSection, opacity: midOpacity }}>
          <p
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "560px",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}
          >
            A 7 Hour Hackathon.
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>
              Build. Innovate. Compete.
            </span>
          </p>
        </section>

        {/* ——— End ——— */}
        <section style={{ ...fixedSection, opacity: endOpacity }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "white",
            }}
          >
            The clock is running.
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
            }}
          >
            Register before time runs out.
          </p>
        </section>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>

      {/* Fixed Register Now button — fades in after video completes */}
      <div
        style={{
          position: "fixed",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          opacity: scroll >= 1 && !ctaVisible ? 1 : 0,
          pointerEvents: scroll >= 1 && !ctaVisible ? "auto" : "none",
          transition: "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            background: btnHovered ? "#fff" : "#0A84FF",
            color: btnHovered ? "#000" : "#fff",
            border: "none",
            borderRadius: "980px",
            padding: "14px 36px",
            fontSize: "0.95rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            cursor: "pointer",
            boxShadow: btnHovered
              ? "0 0 40px rgba(10,132,255,0.6)"
              : "0 0 24px rgba(10,132,255,0.3)",
            transition: "background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
            transform: btnHovered ? "scale(1.05)" : "scale(1)",
            fontFamily: "'Satoshi', Helvetica, Arial, sans-serif",
          }}
        >
          Register Now
        </button>
      </div>

      {/* 100vh buffer — lets video text fully fade before EventInfo appears
      <div style={{ height: "100vh", background: "#000", position: "relative", zIndex: 20 }} /> */}

      {/* Event info — venue, date, time */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <EventInfo />
      </div>

      {/* Rules section */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <RulesSection />
      </div>

      {/* Timeline section */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <Timeline />
      </div>

      {/* Register CTA — after all sections */}
      <div ref={ctaRef} style={{ position: "relative", zIndex: 21 }}>
        <RegisterCTA label="What are you waiting for?" />
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <Footer />
      </div>
    </>
  );
}
