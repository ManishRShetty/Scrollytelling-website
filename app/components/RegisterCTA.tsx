"use client";

import React, { useEffect, useRef, useState } from "react";

interface RegisterCTAProps {
    label?: string;
}

export default function RegisterCTA({ label = "Ready to build?" }: RegisterCTAProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = el.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            setVisible(scrolled >= 0 && scrolled <= total);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Scroll driver — 200vh hold */}
            <div
                ref={containerRef}
                style={{ position: "relative", height: "200vh", background: "#000" }}
            />

            {/* Fixed centered overlay */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontFamily: "'Satoshi', Helvetica, Arial, sans-serif",
                    opacity: visible ? 1 : 0,
                    pointerEvents: visible ? "auto" : "none",
                    transition: "opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    background: visible ? "#000" : "transparent",
                }}
            >
                <p style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#48484A",
                    margin: "0 0 20px 0",
                    animation: visible ? "fadeUp 0.5s ease both" : "none",
                }}>
                    {label}
                </p>

                <h2 style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    color: "#fff",
                    margin: "0 0 12px 0",
                    lineHeight: 1.05,
                    animation: visible ? "fadeUp 0.5s ease 0.05s both" : "none",
                }}>
                    Join HackMatrix
                </h2>

                <p style={{
                    fontSize: "1rem",
                    color: "#636366",
                    margin: "0 0 48px 0",
                    fontWeight: 400,
                    animation: visible ? "fadeUp 0.5s ease 0.1s both" : "none",
                }}>
                    2 – 3 Feb · SSOSC · 9:30 AM
                </p>

                <button
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        background: hovered ? "#fff" : "#0A84FF",
                        color: hovered ? "#000" : "#fff",
                        border: "none",
                        borderRadius: "980px",
                        padding: "16px 44px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        cursor: "pointer",
                        boxShadow: hovered
                            ? "0 0 48px rgba(10,132,255,0.6)"
                            : "0 0 28px rgba(10,132,255,0.3)",
                        transition: "background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                        fontFamily: "inherit",
                        animation: visible ? "fadeUp 0.5s ease 0.15s both" : "none",
                    }}
                >
                    Register Now
                </button>
            </div>

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
