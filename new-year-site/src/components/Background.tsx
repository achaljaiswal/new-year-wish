import { useEffect, useRef } from "react";

export default function Background() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars = starsRef.current;
    if (!stars) return;

    for (let i = 0; i < 200; i++) {
    const star = document.createElement("span");


      star.style.left = Math.random() * window.innerWidth + "px";
      star.style.top = Math.random() * window.innerHeight + "px";

      const size = Math.random() * 3;
      star.style.width = 1 + size + "px";
      star.style.height = 1 + size + "px";

      star.style.animationDuration = 2 + Math.random() * 2 + "s";

      stars.appendChild(star);
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="moon_outer">
        <div className="moon">
          <div className="details one"></div>
          <div className="details two"></div>
          <div className="details three"></div>
          <div className="details four small"></div>
        </div>
      </div>

      <div id="stars" ref={starsRef}></div>
    </div>
  );
}
