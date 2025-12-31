import { motion } from "framer-motion";
import { useState } from "react";

/* -------- TEXT ANIMATION VARIANT -------- */
const lineVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.35 + i * 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function FinalCardScreen() {
  const [open, setOpen] = useState(false);

  const CLOSED_WIDTH = 360;
  const OPEN_WIDTH = 780;
  const HEIGHT = 460;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: '"Comic Neue", cursive',
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "clamp(24px,5vw,36px)", marginBottom: 6 }}>
        For my Cutiepie :)
      </h1>

      <p style={{ opacity: 0.6, marginBottom: 24 }}>
        Tap the card to {open ? "close" : "read"}
      </p>

      {/* CARD */}
      <motion.div
        animate={{ width: open ? OPEN_WIDTH : CLOSED_WIDTH }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
        style={{
          height: HEIGHT,
          position: "relative",
          perspective: 1600,
          cursor: "pointer",
        }}
        onClick={() => setOpen((p) => !p)}
      >
        {/* INSIDE PAGES */}
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#fdf6ec",
              borderRadius: 18,
              border: "6px solid #a855f7",
              boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
              display: "flex",
              overflow: "hidden",
            }}
          >
            {/* LEFT PAGE */}
            <motion.div
              variants={{ hidden: {}, visible: {} }}
              initial="hidden"
              animate="visible"
              style={{
                width: "50%",
                padding: 34,
                textAlign: "left",
                color: "#374151",
                fontSize: 16,
                lineHeight: 1.7,
                borderRight: "2px solid rgba(168,85,247,0.4)",
              }}
            >
              {[
                     "I hope this year brings U calm mornings ☀️ peaceful nights 🌙 & little moments that make U smile :)",
                "without any reason 😊",
                "",
                "No matter what this year holds for U,",
                "I hope U always feel supported,",
                "valued & understood 💞",
                "",
                "May every challenge turn into strength 💪 and every quiet day remind U",
                "of how special U truly are!! 🌷",
              ].map((line, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  style={{ margin: line === "" ? "12px 0" : "0 0 6px 0" }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* RIGHT PAGE */}
            <motion.div
              variants={{ hidden: {}, visible: {} }}
              initial="hidden"
              animate="visible"
              style={{
                width: "50%",
                padding: 34,
                textAlign: "left",
                color: "#374151",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              {[
          

                 "U deserve a year filled with happiness 💖",
                "with moments that feel light, warm & meaningful 🌸",
                "",
                "May this year be gentle with U ✨",
                "& give you everything Ur heart",
                "has been hoping for 💫",
                "","",
                "Wishing U", "a beautiful New Year my LOVE⭐",
              ].map((line, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  style={{ margin: line === "" ? "12px 0" : "0 0 6px 0" }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* FRONT COVER */}
        <motion.div
          animate={{ rotateY: open ? -105 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#fdf6ec",
            borderRadius: 18,
            border: "6px solid #a855f7",
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
            boxShadow: open
              ? "0 12px 24px rgba(0,0,0,0.22)"
              : "0 25px 50px rgba(0,0,0,0.45)",
            overflow: "hidden",
          }}
        >
          <img
            src="/happy-new-year-2026.png"
            alt="Happy New Year 2026"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </motion.div>

        {/* SPINE SHADOW */}
        <motion.div
          animate={{ opacity: open ? 0.35 : 0.6 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0))",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  );
}
