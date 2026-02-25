"use client";

import React, { useEffect, useRef, useState } from "react";

const rules = [
    {
        number: "01",
        title: "Event Schedule",
        body: "The hackathon has a 7-hour Hacking Period (9:30 AM – 4:30 PM) followed by a 3-hour Presentation Period the next day (9:30 AM – 12:30 PM).",
        detail: "7 hrs hacking · 3 hrs presentations",
    },
    {
        number: "02",
        title: "Team Formation",
        body: "Teams of exactly 4 members. Cross-departmental collaboration is encouraged — diverse skills lead to stronger solutions.",
        detail: "4 members per team",
    },
    {
        number: "03",
        title: "Git & Submissions",
        body: "Maintain a regular cadence of Git commits. All code must be pushed no later than 4:30 PM on Day 1. Late commits are not considered.",
        detail: "Final commit deadline · 4:30 PM Day 1",
    },
    {
        number: "04",
        title: "Documentation",
        body: "Your final repository must include a detailed README — problem explanation, solution architecture, tech stack, and step-by-step setup instructions.",
        detail: "README.md required",
    },
    {
        number: "05",
        title: "Judging Criteria",
        body: "Projects are scored on Originality, Technical Execution, Potential Impact, and Presentation quality during the 3-hour demo period.",
        detail: "Originality · Execution · Impact · Presentation",
    },
];

export default function RulesSection() {
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

            // Show the fixed overlay only while the container is the "current" scroll area
            const isInSection = scrolled >= 0 && scrolled <= total;
            setVisible(isInSection);

            const p = Math.max(0, Math.min(1, scrolled / total));
            const idx = Math.min(rules.length - 1, Math.floor(p * rules.length));
            setActiveIndex(idx);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // run once on mount
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const rule = rules[activeIndex];

    return (
        <>
            {/* Tall container — drives the scroll */}
            <div
                ref={containerRef}
                style={{
                    position: "relative",
                    height: `${rules.length * 100}vh`,
                    background: "#000",
                }}
            />

            {/* Fixed overlay — same pattern as the scrollytelling hero */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 15,
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: visible ? "#000" : "transparent",
                }}
            >
                {/* Section label */}
                <p
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#48484A",
                        margin: 0,
                        whiteSpace: "nowrap",
                    }}
                >
                    Rules &amp; Format
                </p>

                {/* Progress dots */}
                <div
                    style={{
                        position: "absolute",
                        top: "44px",
                        right: "48px",
                        display: "flex",
                        gap: "6px",
                    }}
                >
                    {rules.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: i === activeIndex ? "20px" : "6px",
                                height: "6px",
                                borderRadius: "3px",
                                background: i === activeIndex ? "#0A84FF" : "#2C2C2E",
                                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            }}
                        />
                    ))}
                </div>

                {/* Main content */}
                <div
                    style={{
                        maxWidth: "640px",
                        width: "100%",
                        padding: "0 32px",
                        textAlign: "left",
                    }}
                >
                    <p
                        key={`num-${activeIndex}`}
                        style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#0A84FF",
                            letterSpacing: "0.15em",
                            margin: "0 0 16px 0",
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) both",
                        }}
                    >
                        {rule.number}
                    </p>

                    <h2
                        key={`title-${activeIndex}`}
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            color: "#fff",
                            margin: "0 0 24px 0",
                            lineHeight: 1.05,
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s both",
                        }}
                    >
                        {rule.title}
                    </h2>

                    <p
                        key={`body-${activeIndex}`}
                        style={{
                            fontSize: "1.1rem",
                            color: "#8E8E93",
                            lineHeight: 1.7,
                            margin: "0 0 36px 0",
                            fontWeight: 400,
                            maxWidth: "520px",
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s both",
                        }}
                    >
                        {rule.body}
                    </p>

                    {/* Growing progress bar */}
                    <div
                        style={{
                            height: "2px",
                            background: "#1C1C1E",
                            borderRadius: "2px",
                            marginBottom: "24px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: "0 auto 0 0",
                                width: `${((activeIndex + 1) / rules.length) * 100}%`,
                                background: "linear-gradient(90deg, #0A84FF, rgba(10,132,255,0.4))",
                                transition: "width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            }}
                        />
                    </div>

                    <p
                        key={`detail-${activeIndex}`}
                        style={{
                            fontSize: "13px",
                            color: "#636366",
                            fontWeight: 500,
                            margin: 0,
                            animation: "fadeUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s both",
                        }}
                    >
                        {rule.detail}
                    </p>
                </div>

                {/* Scroll hint */}
                {activeIndex === 0 && (
                    <p
                        style={{
                            position: "absolute",
                            bottom: "40px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "11px",
                            color: "#48484A",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            margin: 0,
                            whiteSpace: "nowrap",
                        }}
                    >
                        Scroll to explore rules
                    </p>
                )}

                {/* Counter */}
                <p
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        right: "48px",
                        fontSize: "12px",
                        color: "#48484A",
                        margin: 0,
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {String(activeIndex + 1).padStart(2, "0")} / {String(rules.length).padStart(2, "0")}
                </p>
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
}
