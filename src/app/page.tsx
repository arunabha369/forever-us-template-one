"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningScene from "@/components/sections/OpeningScene";
import Chapter1 from "@/components/sections/Chapter1";
import Chapter2 from "@/components/sections/Chapter2";
import Chapter3 from "@/components/sections/Chapter3";
import Chapter4 from "@/components/sections/Chapter4";
import Chapter5 from "@/components/sections/Chapter5";
import FinalScene from "@/components/sections/FinalScene";
import SoundController from "@/components/audio/SoundController";
import ScrollProgress from "@/components/core/ScrollProgress";
import { STORY_DATA } from "@/lib/data";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const startJourney = () => {
    setHasStarted(true);
    // Slight delay to allow animation to play before scrolling
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <SoundController allowAutoPlay={hasStarted} />

      {/* Opening - Always visible initially */}
      <OpeningScene
        onStart={startJourney}
        title={STORY_DATA.opening.title}
        subtitle={STORY_DATA.opening.subtitle}
      />

      {/* Rest of the story - Revealed after start */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="bg-background"
          >
            <Chapter1
              title={STORY_DATA.chapter1.title}
              subtitle={STORY_DATA.chapter1.subtitle}
              text={STORY_DATA.chapter1.text}
              location={STORY_DATA.chapter1.location}
            />

            <Chapter2
              title={STORY_DATA.chapter2.title}
              events={STORY_DATA.chapter2.timeline}
            />

            <Chapter3
              title={STORY_DATA.chapter3.title}
              description={STORY_DATA.chapter3.description}
            />

            <Chapter4
              title={STORY_DATA.chapter4.title}
              events={STORY_DATA.chapter4.events}
            />

            <Chapter5
              greeting={STORY_DATA.letter.greeting}
              body={STORY_DATA.letter.body}
              signature={STORY_DATA.letter.signature}
            />

            <FinalScene
              text={STORY_DATA.final.text}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
