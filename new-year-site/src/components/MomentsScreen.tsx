import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import FinalCardScreen from "./FinalCardScreen";

/* ---------- IMAGES ---------- */
const images = [
  "/1.jpeg","/2.jpeg","/3.jpeg","/4.jpeg","/5.jpeg",
  "/6.jpeg","/7.jpeg","/8.jpeg","/9.jpeg","/10.jpeg",
  "/11.jpeg","/12.jpeg","/13.jpeg","/14.jpeg","/15.jpeg",
  "/16.jpeg","/17.jpeg","/18.jpeg","/19.jpeg","/20.jpeg",
  "/21.jpeg",
];

/* ---------- BACKGROUND MUSIC ---------- */
function BackgroundMusic({ stop }: { stop: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const startMusic = () => {
    if (!audioRef.current || started) return;

    const audio = audioRef.current;
    audio.volume = 0;
    audio.play().catch(() => {});
    setStarted(true);

    // Smooth fade-in (feels louder & premium)
    let v = 0;
    const fade = setInterval(() => {
      v += 0.05;
      if (audio) audio.volume = Math.min(v, 0.9);
      if (v >= 0.9) clearInterval(fade);
    }, 120);
  };

  // Stop music when FinalCard opens
  if (stop && audioRef.current) {
    audioRef.current.pause();
  }

  return (
    <>
      <audio ref={audioRef} src="/bgm.mp3" loop muted={muted} />

      {/* Music Toggle */}
      <button
        onClick={() => setMuted(m => !m)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 999,
          padding: "10px 14px",
          color: "white",
          fontFamily: '"Comic Neue", cursive',
          fontSize: 14,
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          zIndex: 100,
        }}
      >
        {muted ? "🔇 Music Off" : "🎶 Music On"}
      </button>

      {/* Expose starter */}
      <div id="music-starter" onClick={startMusic} />
    </>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function MomentsScreen() {
  const [index, setIndex] = useState(0);
  const [showFinalCard, setShowFinalCard] = useState(false);

  const handleNext = () => {
    // Start music on FIRST user interaction
    const starter = document.getElementById("music-starter");
    starter?.click();

    if (index < images.length - 1) {
      setIndex(i => i + 1);
    } else {
      setShowFinalCard(true);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showFinalCard && (
        <motion.div
          key="moments"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            color: "white",
            fontFamily: '"Comic Neue", cursive',
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "clamp(22px, 5vw, 34px)", marginBottom: 8 }}>
            Some moments from this year
          </h1>

          <p style={{ opacity: 0.6, marginBottom: 24 }}>
            Tap the card to continue
          </p>

          <div style={{ position: "relative", width: 280 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: "rotate(4deg)",
                borderRadius: 18,
                background: "#ffffff",
                opacity: 0.15,
              }}
            />

            <motion.div
              key={images[index]}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleNext}
              style={{
                position: "relative",
                borderRadius: 18,
                background: "#ffffff",
                padding: 10,
                cursor: "pointer",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={images[index]}
                alt="Moment"
                style={{
                  width: "100%",
                  height: 360,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            </motion.div>
          </div>

          <p style={{ marginTop: 18, fontSize: 13, opacity: 0.5 }}>
            {index + 1} / {images.length}
          </p>

          <BackgroundMusic stop={false} />
        </motion.div>
      )}

      {showFinalCard && (
        <motion.div
          key="final"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <BackgroundMusic stop />
          <FinalCardScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
