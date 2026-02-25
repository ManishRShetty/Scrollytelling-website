"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
    {
        eyebrow: "Venue",
        value: "SSOSC",
        description: "Sri Siddhartha College of Engineering, the arena for HackMatrix.",
        secondary: "Organized by",
        secondaryBold: "Nexus SIT & CSBS",
    },
    {
        eyebrow: "Duration",
        value: "7 + 3",
        description: "Hours of hacking followed by a presentation period the next day.",
        secondary: "hrs total across",
        secondaryBold: "2 days",
    },
    {
        eyebrow: "Starts on",
        value: "2 Feb",
        description: "Hacking kicks off at 9:30 AM sharp. Be there early.",
        secondary: "Presentations",
        secondaryBold: "3 Feb, 9:30 AM",
    },
];

export default function EventInfo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const el = containerRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const total = el.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;

            setVisible(scrolled >= 0 && scrolled <= total);

            // First 25% of scroll = fade-in hold on slide 0, then cycle remaining 75%
            const holdPx = total * 0.25;
            const slideScrolled = Math.max(0, scrolled - holdPx);
            const slidePx = total - holdPx;
            const p = Math.max(0, Math.min(1, slideScrolled / slidePx));
            const idx = Math.min(stats.length - 1, Math.floor(p * stats.length));
            setActiveIndex(idx);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const s = stats[activeIndex];

    return (
        <>
            {/* Scroll driver — 3 slides × 100vh */}
            <div
                ref={containerRef}
                style={{ position: "relative", height: `${stats.length * 100 + 100}vh`, background: "#000" }}
            />

            {/* Fixed overlay */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 14,
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    fontFamily: "'Satoshi', Helvetica, Arial, sans-serif",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: visible ? "#000" : "transparent",
                    padding: "0 min(10vw, 120px)",
                }}
            >

                {/* Dot indicators */}
                <div style={{ position: "absolute", top: "44px", right: "48px", display: "flex", gap: "6px" }}>
                    {stats.map((_, i) => (
                        <div key={i} style={{
                            width: i === activeIndex ? "20px" : "6px",
                            height: "6px",
                            borderRadius: "3px",
                            background: i === activeIndex ? "#0A84FF" : "#2C2C2E",
                            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }} />
                    ))}
                </div>

                {/* Two-column layout */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    padding: "0 6vw",
                    gap: "4vw",
                }}>
                    {/* LEFT — big label */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        height: "100%",
                    }}>
                        <p style={{
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.05em",
                            lineHeight: 0.9,
                            color: "#1C1C1E",
                            margin: 0,
                            userSelect: "none",
                            textTransform: "uppercase",
                        }}>
                            Event<br />Details
                        </p>
                    </div>

                    {/* RIGHT — animated slide content */}
                    <div style={{ width: "100%" }}>

                        {/* Eyebrow */}
                        <p key={`ey-${activeIndex}`} style={{
                            fontSize: "14px",
                            color: "#8E8E93",
                            fontWeight: 400,
                            margin: "0 0 12px 0",
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) both",
                        }}>
                            {s.eyebrow}
                        </p>

                        {/* Big value */}
                        <p key={`val-${activeIndex}`} style={{
                            fontSize: "clamp(4rem, 12vw, 9rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.05em",
                            color: "#fff",
                            margin: "0 0 28px 0",
                            lineHeight: 1,
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s both",
                        }}>
                            {s.value}
                        </p>

                        {/* Description */}
                        <p key={`desc-${activeIndex}`} style={{
                            fontSize: "1.1rem",
                            color: "#636366",
                            lineHeight: 1.65,
                            margin: "0 0 32px 0",
                            fontWeight: 400,
                            maxWidth: "480px",
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s both",
                        }}>
                            {s.description}
                        </p>

                        {/* Accent line */}
                        <div style={{
                            height: "2px",
                            background: "#1C1C1E",
                            borderRadius: "2px",
                            marginBottom: "24px",
                            position: "relative",
                            overflow: "hidden",
                            maxWidth: "480px",
                        }}>
                            <div style={{
                                position: "absolute",
                                inset: "0 auto 0 0",
                                width: `${((activeIndex + 1) / stats.length) * 100}%`,
                                background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.3))",
                                transition: "width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            }} />
                        </div>

                        {/* Secondary */}
                        <p key={`sec-${activeIndex}`} style={{
                            fontSize: "14px",
                            color: "#8E8E93",
                            margin: 0,
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s both",
                        }}>
                            {s.secondary}{" "}
                            <span style={{ color: "#fff", fontWeight: 600 }}>{s.secondaryBold}</span>
                        </p>
                    </div>{/* end right column */}
                </div>{/* end two-column grid */}

                {/* Counter */}
                <p style={{
                    position: "absolute",
                    bottom: "40px",
                    right: "48px",
                    fontSize: "12px",
                    color: "#48484A",
                    margin: 0,
                    fontVariantNumeric: "tabular-nums",
                }}>
                    {String(activeIndex + 1).padStart(2, "0")} / {String(stats.length).padStart(2, "0")}
                </p>
            </div>{/* end fixed overlay */}

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}

