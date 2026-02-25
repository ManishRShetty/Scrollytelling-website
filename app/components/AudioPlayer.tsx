"use client";

import React, { useEffect, useRef, useState, createContext, useContext } from "react";

// Context to share audio state globally
interface AudioContextType {
    isPlaying: boolean;
    togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType>({
    isPlaying: false,
    togglePlay: () => { },
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Try to auto-play on mount (browsers often block this until interaction)
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Start at 50% volume
            audioRef.current.loop = true;
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, togglePlay }}>
            {/* Audio element pointing to user's requested path */}
            <audio ref={audioRef} src="/bg.mp3" preload="auto" />
            {children}
        </AudioContext.Provider>
    );
}

// Floating toggle button component
export function AudioToggle() {
    const { isPlaying, togglePlay } = useAudio();

    return (
        <button
            onClick={togglePlay}
            style={{
                position: "fixed",
                bottom: "32px",
                right: "32px",
                zIndex: 100,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(28, 28, 30, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(44, 44, 46, 0.8)";
                e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(28, 28, 30, 0.6)";
                e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
        >
            {isPlaying ? (
                // Simple pause icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            ) : (
                // Simple play icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "translateX(2px)" }}>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            )}
        </button>
    );
}
