import { useRef, useState } from "react";
import MomentsScreen from "../components/MomentsScreen";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

/* ---------------- ICONS ---------------- */

const GiftIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
    <rect x="3" y="8" width="18" height="13" rx="2" />
    <path d="M12 8v13" />
    <path d="M3 12h18" />
    <path d="M12 8c-2.5 0-4-1.5-4-3a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 1.5-1.5 3-4 3z" />
  </svg>
);

const TicketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2">
    <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
    <path d="M3 15v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    <path d="M12 5v14" />
  </svg>
);

/* ---------------- DATA ---------------- */

const cards = [
  { id: 1, label: "Distance", bg: "#c7ddff", icon: "📍" },
  { id: 2, label: "Stress", bg: "#fff18f", icon: "🧠" },
  { id: 3, label: "Work", bg: "#ffd6a5", icon: "💼" },
  { id: 4, label: "Bad Days", bg: "#ffc9de", icon: "🌧️" },
];

/* ---------------- COMPONENT ---------------- */

export default function NextScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [removed, setRemoved] = useState<number[]>([]);
  const [showTicket, setShowTicket] = useState(false);
  const [showMoments, setShowMoments] = useState(false);

  const handleGiftClick = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
    });
    setShowTicket(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        color: "white",
        fontFamily: '"Comic Neue", cursive',
      }}
    >
      {/* ---------------- FIRST SCREEN ---------------- */}
      {!showTicket && (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "clamp(24px,5vw,36px)" }}>
            Something is waiting for you
          </h1>

          <p style={{ opacity: 0.6, marginBottom: 32 }}>
            Move the little distractions aside
          </p>

          {/* Glass Container */}
          <div
            ref={containerRef}
            style={{
              width: "100%",
              maxWidth: 420,
              aspectRatio: "1 / 1",
              borderRadius: 28,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 🎁 Gift Box */}
            <motion.div
              onClick={removed.length >= cards.length - 1 ? handleGiftClick : undefined}
              animate={{
                opacity: removed.length >= cards.length - 1 ? 1 : 0.4,
                scale: removed.length >= cards.length - 1 ? 1 : 0.9,
              }}
              whileHover={{ scale: 1.1 }}
              style={{
                position: "absolute",
                width: 86,
                height: 86,
                borderRadius: 20,
                background: "#ec4899",
                boxShadow: "0 0 30px rgba(236,72,153,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:
                  removed.length >= cards.length - 1 ? "pointer" : "default",
                zIndex: 1,
              }}
            >
              <GiftIcon />
            </motion.div>

            {/* 🃏 CARDS — MATCH REFERENCE */}
            {cards.map((card, index) =>
              removed.includes(card.id) ? null : (
                <motion.div
                  key={card.id}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.25}
                  whileTap={{ scale: 1.05 }}
                  initial={{ rotate: -10 + index * 6, y: index * 6 }}
                  animate={{ rotate: -10 + index * 6, y: index * 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  onDragEnd={(e, info) => {
                    const distance = Math.hypot(info.offset.x, info.offset.y);
                    const velocity = Math.hypot(info.velocity.x, info.velocity.y);
                    if (distance > 140 && velocity > 800) {
                      setRemoved((prev) => [...prev, card.id]);
                    }
                  }}
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    width: 96,
                    height: 132,
                    borderRadius: 16,
                    background: card.bg,
                    border: "4px solid #ffffff",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#475569",
                    cursor: "grab",
                  }}
                >
                  <div style={{ fontSize: 28, opacity: 0.75 }}>
                    {card.icon}
                  </div>
                  <div>{card.label}</div>
                </motion.div>
              )
            )}
          </div>
        </div>
      )}

      {/* ---------------- TICKET → MOMENTS ---------------- */}
      <AnimatePresence mode="wait">
        {!showMoments && showTicket && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              textAlign: "center",
            }}
          >
            {/* Golden Ticket */}
            <motion.div
              initial={{ opacity: 0, scale: 0.65, rotate: -14, y: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: [-14, 4, 0], y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%",
                maxWidth: 420,
                padding: 26,
                borderRadius: 22,
                background: "#0b1a33",
                border: "3px solid #e7d28b",
                boxShadow: "0 0 40px rgba(231,210,139,0.35)",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "#1f2f4f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                }}
              >
                <TicketIcon />
              </div>

              <h2 style={{ color: "#f6d77a", letterSpacing: 3 }}>
                GOLDEN TICKET
              </h2>

              <div
                style={{
                  margin: "14px 0",
                  borderTop: "2px dashed rgba(255,255,255,0.25)",
                }}
              />

              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
                VALID FOR EVERY DAY AHEAD
              </p>

              <p
                style={{
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                  marginTop: 12,
                }}
              >
                “Unlimited Love & Smiles”
              </p>

              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                No expiration date
              </p>
            </motion.div>

            {/* CLAIM TICKET */}
            <motion.div
              onClick={() => setShowMoments(true)}
              initial="rest"
              whileHover="hover"
              whileTap="hover"
              style={{
                position: "relative",
                fontSize: 13,
                letterSpacing: 1.5,
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              CLAIM TICKET →
              <motion.span
                variants={{
                  rest: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -4,
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.7)",
                  transformOrigin: "left",
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {showMoments && (
          <motion.div
            key="moments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MomentsScreen onContinue={() => console.log("Next moment")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
