//! File: src/app/not-found.tsx
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col space-y-14 items-center justify-center bg-theme-bg">
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} fontSize={"clamp(3rem, 8vw, 8rem)"}>
        404
      </FuzzyText>
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} fontSize={"clamp(2rem, 8vw, 8rem)"}>
        NOT FOUND
      </FuzzyText>
    </main>
  );
}
