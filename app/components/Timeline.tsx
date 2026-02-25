"use client";

import React, { useEffect, useRef, useState } from "react";

const events = [
    { time: "9:30 AM", day: "Day 1", label: "Inauguration", desc: "Opening ceremony, team check-in & briefing." },
    { time: "10:00 AM", day: "Day 1", label: "Hacking Begins", desc: "7-hour build sprint starts. Clock is running." },
    { time: "1:00 PM", day: "Day 1", label: "Lunch Break", desc: "Refuel. 30 minutes. Get back to work." },
    { time: "4:30 PM", day: "Day 1", label: "Submission Closes", desc: "Final commits pushed. Hacking window ends." },
    { time: "5:00 PM", day: "Day 1", label: "Day 1 Wrap-up", desc: "Debrief, networking & team wind-down." },
    { time: "9:30 AM", day: "Day 2", label: "Presentations", desc: "3-hour demo round. Judges evaluate every project." },
    { time: "12:30 PM", day: "Day 2", label: "Results & Closing", desc: "Winners announced. HackMatrix concludes." },
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [revealed, setRevealed] = useState<boolean[]>(Array(events.length).fill(false));
    const prevVisible = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            const el = containerRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const total = el.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            const isVisible = scrolled >= 0 && scrolled <= total;
            setVisible(isVisible);

            // Reset when scrolled back above
            if (!isVisible && prevVisible.current && scrolled < 0) {
                setRevealed(Array(events.length).fill(false));
                setProgress(0);
                prevVisible.current = false;
                return;
            }
            prevVisible.current = isVisible;
            if (!isVisible) return;

            const p = Math.max(0, Math.min(1, scrolled / total));
            setProgress(p);

            // Reveal nodes as line passes them
            const linePos = p * events.length; // how many nodes the line has passed
            setRevealed(prev => {
                const next = [...prev];
                events.forEach((_, i) => {
                    if (linePos >= i + 0.5 && !next[i]) next[i] = true;
                });
                return next;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Blue line height as % of the track
    const lineHeightPct = Math.min(100, progress * 100);

    return (
        <>
            {/* Scroll driver */}
            <div
                ref={containerRef}
                style={{ position: "relative", height: `${events.length * 100}vh` }}
            />

            {/* Fixed overlay */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 17,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Satoshi', Helvetica, Arial, sans-serif",
                    opacity: visible ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.5s ease",
                    background: visible ? "#000" : "transparent",
                    padding: "48px 8vw",
                }}
            >
                {/* Header */}
                <p style={{
                    position: "absolute",
                    top: "44px",
                    left: "8vw",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#48484A",
                    margin: 0,
                }}>Schedule</p>

                {/* Counter */}
                <p style={{
                    position: "absolute",
                    bottom: "40px",
                    right: "6vw",
                    fontSize: "12px",
                    color: "#48484A",
                    margin: 0,
                    fontVariantNumeric: "tabular-nums",
                }}>
                    {revealed.filter(Boolean).length.toString().padStart(2, "0")} / {String(events.length).padStart(2, "0")}
                </p>

                {/* Timeline body — flex row: [track] [events] */}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                    width: "100%",
                    maxWidth: "720px",
                    height: "min(600px, 80vh)",
                    gap: 0,
                }}>
                    {/* Left: vertical track */}
                    <div style={{
                        position: "relative",
                        width: "1px",
                        flexShrink: 0,
                        marginRight: "36px",
                        background: "#1C1C1E",
                    }}>
                        {/* Growing blue fill */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "1px",
                            height: `${lineHeightPct}%`,
                            background: "linear-gradient(180deg, #0A84FF, rgba(10,132,255,0.5))",
                            transition: "height 0.12s linear",
                        }} />

                        {/* Dot per node — evenly spaced % */}
                        {events.map((_, i) => {
                            const pct = (i / (events.length - 1)) * 100;
                            const hit = revealed[i];
                            return (
                                <div
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: `${pct}%`,
                                        transform: "translate(-50%, -50%)",
                                        width: hit ? "10px" : "6px",
                                        height: hit ? "10px" : "6px",
                                        borderRadius: "50%",
                                        background: hit ? "#0A84FF" : "#2C2C2E",
                                        boxShadow: hit ? "0 0 10px rgba(10,132,255,0.9)" : "none",
                                        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Right: events column — flex column, evenly spaced */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                    }}>
                        {events.map((ev, i) => {
                            const hit = revealed[i];
                            return (
                                <div
                                    key={`${i}-${hit}`}
                                    style={{
                                        opacity: hit ? 1 : 0.08,
                                        animation: hit ? "scaleReveal 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
                                        transition: "opacity 0.3s ease",
                                    }}
                                >
                                    <span style={{
                                        fontSize: "11px",
                                        fontWeight: 600,
                                        color: hit ? "#0A84FF" : "#48484A",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        display: "block",
                                        marginBottom: "2px",
                                        transition: "color 0.3s ease",
                                    }}>
                                        {ev.day} · {ev.time}
                                    </span>
                                    <span style={{
                                        fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
                                        fontWeight: 700,
                                        color: "#fff",
                                        letterSpacing: "-0.02em",
                                        display: "block",
                                        lineHeight: 1.15,
                                    }}>
                                        {ev.label}
                                    </span>
                                    <span style={{
                                        fontSize: "12px",
                                        color: "#636366",
                                        fontWeight: 400,
                                        display: "block",
                                    }}>
                                        {ev.desc}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scaleReveal {
                    from {
                        opacity: 0;
                        transform: scale(1.12) translateY(6px);
                        filter: blur(8px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                        filter: blur(0);
                    }
                }
            `}</style>
        </>
    );
}
