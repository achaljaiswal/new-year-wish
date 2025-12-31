import { useRef, useState } from "react";

const HOLD_DURATION = 1200;

export default function SurpriseCard({
  onUnlock,
}: {
  onUnlock: () => void;
}) {
  const timerRef = useRef<number | null>(null);
  const startTime = useRef<number>(0);

  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [exiting, setExiting] = useState(false);

  const startHold = () => {
    if (holding) return;

    startTime.current = Date.now();
    setHolding(true);

    // haptic-like vibration (mobile)
    if (navigator.vibrate) navigator.vibrate(15);

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(pct);

      if (pct === 1) {
        clearInterval(timerRef.current!);
        setHolding(false);
        setExiting(true);

        setTimeout(() => {
          onUnlock();
        }, 500);
      }
    }, 16);
  };

  const endHold = () => {
    setHolding(false);
    setProgress(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: '"Comic Neue", cursive',
        transition: "all 0.5s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(0.9)" : "scale(1)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          padding: "24px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ color: "#f9a8d4", fontSize: "22px" }}>
          A little surprise for you
        </h1>

        <p style={{ opacity: 0.7 }}>Before this year begins</p>

        {/* HEART + PROGRESS */}
        <div
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          style={{
            margin: "32px auto",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
            background: "rgba(236,72,153,0.18)",
            transform: holding ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.15s ease",
          }}
        >
          {/* Progress ring */}
          <svg
            width="130"
            height="130"
            style={{
              position: "absolute",
              transform: "rotate(-90deg)",
              pointerEvents: "none",
            }}
          >
            <circle
              cx="65"
              cy="65"
              r="56"
              stroke="rgba(236,72,153,0.6)"
              strokeWidth="6"
              fill="none"
              strokeDasharray={352}
              strokeDashoffset={352 - progress * 352}
              style={{ transition: "stroke-dashoffset 0.08s linear" }}
            />
          </svg>

          {/* SVG HEART */}
          <svg
            width="55"
            height="55"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: "transform 0.15s ease",
              transform: holding ? "scale(1.15)" : "scale(1)",
            }}
          >
            <path
              d="M12 21s-6.716-4.35-9.33-7.26C-1.19 9.83 1.453 4.5 6.3 4.5c2.37 0 3.86 1.5 4.7 2.7.84-1.2 2.33-2.7 4.7-2.7 4.847 0 7.49 5.33 3.63 9.24C18.716 16.65 12 21 12 21z"
              fill="rgb(236,72,153)"
            />
          </svg>
        </div>

        <p style={{ opacity: 0.5, fontSize: "14px" }}>
          {holding ? "Keep holding..." : "Tap and hold"}
        </p>
      </div>
    </div>
  );
}
