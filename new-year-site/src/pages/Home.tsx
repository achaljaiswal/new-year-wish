import { useState } from "react";
import Background from "../components/Background";
import SurpriseCard from "../components/SurpriseCard";
import NextScreen from "../components/NextScreen";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      <Background />
      {!unlocked && (
        <SurpriseCard onUnlock={() => setUnlocked(true)} />
      )}
      {unlocked && <NextScreen />}
    </>
  );
}
