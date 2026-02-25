"use client";

import React from "react";
import FadeIn from "./FadeIn";

export default function Footer() {
    return (
        <footer
            style={{
                background: "#000",
                borderTop: "1px solid #1C1C1E",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                padding: "60px 24px 40px",
            }}
        >
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                {/* Top row — logos + tagline */}
                <FadeIn delay={0}>
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
                        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                            {/* Nexus logo placeholder */}
                            <div
                                style={{
                                    width: "80px",
                                    height: "40px",
                                    border: "1px dashed #2C2C2E",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span style={{ fontSize: "10px", color: "#48484A", letterSpacing: "0.1em" }}>
                                    NEXUS
                                </span>
                            </div>

                            <div style={{ width: "1px", height: "32px", background: "#1C1C1E" }} />

                            {/* CSBS logo placeholder */}
                            <div
                                style={{
                                    width: "80px",
                                    height: "40px",
                                    border: "1px dashed #2C2C2E",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span style={{ fontSize: "10px", color: "#48484A", letterSpacing: "0.1em" }}>
                                    CSBS
                                </span>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div style={{ textAlign: "right" }}>
                            <p
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "#fff",
                                    margin: "0 0 4px 0",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                HackMatrix
                            </p>
                            <p style={{ fontSize: "13px", color: "#636366", margin: 0, fontWeight: 400 }}>
                                Organized by Nexus SIT &amp; CSBS
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* Bottom row */}
                <FadeIn delay={150}>
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
                            2 – 3 Feb · SSOSC · 9:30 AM
                        </p>
                        <p style={{ fontSize: "12px", color: "#48484A", margin: 0 }}>
                            &copy; {new Date().getFullYear()} HackMatrix. All rights reserved.
                        </p>
                    </div>
                </FadeIn>

            </div>
        </footer>
    );
}
