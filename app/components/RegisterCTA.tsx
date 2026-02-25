"use client";

import React, { useState } from "react";

interface RegisterCTAProps {
    /** Optional label variant for top/bottom placement */
    label?: string;
}

export default function RegisterCTA({ label = "Ready to build?" }: RegisterCTAProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <section
            style={{
                background: "#000",
                fontFamily: "'Satoshi', Helvetica, Arial, sans-serif",
                padding: "100px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                borderTop: "1px solid #1C1C1E",
            }}
        >
            <p
                style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#48484A",
                    margin: "0 0 20px 0",
                }}
            >
                {label}
            </p>

            <h2
                style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: "#fff",
                    margin: "0 0 12px 0",
                    lineHeight: 1.1,
                }}
            >
                Join HackMatrix
            </h2>

            <p
                style={{
                    fontSize: "1rem",
                    color: "#636366",
                    margin: "0 0 40px 0",
                    fontWeight: 400,
                }}
            >
                2 – 3 Feb · SSOSC · 9:30 AM
            </p>

            <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    pointerEvents: "auto",
                    background: hovered ? "#fff" : "#0A84FF",
                    color: hovered ? "#000" : "#fff",
                    border: "none",
                    borderRadius: "980px",
                    padding: "16px 40px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    boxShadow: hovered
                        ? "0 0 40px rgba(10,132,255,0.5)"
                        : "0 0 24px rgba(10,132,255,0.25)",
                    transition:
                        "background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
                    transform: hovered ? "scale(1.04)" : "scale(1)",
                    fontFamily: "inherit",
                }}
            >
                Register Now
            </button>
        </section>
    );
}
