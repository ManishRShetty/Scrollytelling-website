"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 40;

function getFramePath(index: number): string {
  const num = String(index + 1).padStart(3, "0");
  return `/home/ezgif-frame-${num}.jpg`;
}

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Draw a single frame on the canvas with cover-fit
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    // Cover-fit logic
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Resize canvas to fill viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Set up scroll listener & resize
  useEffect(() => {
    if (!loaded) return;

    resizeCanvas();

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = Math.min(scrollTop / maxScroll, 1);
        const frameIndex = Math.min(
          Math.floor(scrollFraction * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    const handleResize = () => resizeCanvas();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Draw first frame
    drawFrame(0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame, resizeCanvas]);

  return (
    <>
      {/* Loading screen */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          transition: "opacity 0.8s ease, visibility 0.8s ease",
          opacity: loaded ? 0 : 1,
          visibility: loaded ? "hidden" : "visible",
          pointerEvents: loaded ? "none" : "auto",
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: 300,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "2rem",
          }}
        >
          Loading
        </div>
        <div
          style={{
            width: "200px",
            height: "2px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
              borderRadius: "1px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.35)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Fixed canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      />
    </>
  );
}
