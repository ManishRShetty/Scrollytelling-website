import ScrollVideo from "./components/ScrollVideo";

export default function Home() {
  return (
    <>
      <ScrollVideo />

      {/* Scroll spacer — height determines scroll length */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ——— Section 1: Hero ——— */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Scroll to Explore
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1.15rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              maxWidth: "420px",
              lineHeight: 1.6,
            }}
          >
            Experience the story frame by frame as you scroll down
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
            <svg
              width="20"
              height="28"
              viewBox="0 0 20 28"
              fill="none"
              style={{ opacity: 0.3 }}
            >
              <rect
                x="1"
                y="1"
                width="18"
                height="26"
                rx="9"
                stroke="white"
                strokeWidth="1.5"
              />
              <circle cx="10" cy="8" r="2.5" fill="white">
                <animate
                  attributeName="cy"
                  values="8;18;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </section>

        {/* ——— Section 2: Mid-scroll text ——— */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "560px",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}
          >
            Every frame tells a story.
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>
              Keep scrolling to uncover the narrative.
            </span>
          </p>
        </section>

        {/* ——— Section 3: End ——— */}
        <section
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "white",
            }}
          >
            The Black Hole.
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
            }}
          >
            Scroll back up to replay
          </p>
        </section>
      </div>

      {/* Bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </>
  );
}
