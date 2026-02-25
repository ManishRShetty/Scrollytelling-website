"use client";

import React from "react";

export default function Footer() {
    return (
        <footer
            style={{
                background: "#000",
                borderTop: "1px solid #1C1C1E",
                fontFamily: "'Satoshi', Helvetica, Arial, sans-serif",
                padding: "60px 24px 40px",
            }}
        >
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                {/* Top row — logos + tagline */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "32px",
                        paddingBottom: "40px",
                        borderBottom: "1px solid #1C1C1E",
                    }}
                >
                    {/* Logos */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <a
                            href="https://www.nexusclubs.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                textDecoration: "none",
                                cursor: "pointer",
                                transition: "opacity 0.2s ease",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                        >
                            <div style={{
                                width: "48px",
                                height: "48px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src="/nexus.svg" alt="Nexus Logo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                            </div>
                            <span style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#fff",
                                letterSpacing: "0.03em",
                            }}>
                                NEXUS SIT
                            </span>
                        </a>

                        {/* Divider */}
                        <div style={{ width: "1px", height: "24px", background: "#3A3A3C" }} />

                        <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src="/cb.svg" alt="CSBS Logo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "invert(1) brightness(0.9)" }} />
                        </div>
                    </div>

                    {/* Tagline */}
                    <div style={{ textAlign: "right" }}>
                        <p style={{
                            fontSize: "1.1rem", fontWeight: 700,
                            letterSpacing: "-0.03em", color: "#fff",
                            margin: "0 0 4px 0",
                        }}>
                            HackMatrix
                        </p>
                        <p style={{ fontSize: "13px", color: "#636366", margin: 0, fontWeight: 400 }}>
                            Organized by Nexus SIT &amp; CSBS
                        </p>
                    </div>
                </div>

                {/* Bottom row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px",
                        paddingTop: "28px",
                    }}
                >
                    <p style={{ fontSize: "12px", color: "#48484A", margin: 0 }}>
                        2 – 3 Feb · SIT · 9:30 AM
                    </p>
                    <p style={{ fontSize: "12px", color: "#48484A", margin: 0 }}>
                        &copy; {new Date().getFullYear()} HackMatrix. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
