"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import Image from "next/image";

interface OpeningSceneProps {
    onStart: () => void;
    title: string;
    subtitle: string;
}

export default function OpeningScene({ onStart, title, subtitle }: OpeningSceneProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleStart = () => {
        setIsRevealed(true);
        // Delay actual scroll/transition to let the reveal animation play
        setTimeout(() => {
            onStart();
        }, 800);
    };

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background Layer with Reveal Effect */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Image */}
                <div className="hidden md:block w-full h-full relative">
                    <Image
                        src="/images/hero.png"
                        alt="Our Story"
                        fill
                        className="object-cover transition-all duration-[2000ms] ease-in-out scale-105"
                        style={{
                            filter: isRevealed ? "blur(0px) brightness(1)" : "blur(12px) brightness(0.6)"
                        }}
                        priority
                        sizes="100vw"
                    />
                </div>

                {/* Mobile Image */}
                <div className="block md:hidden w-full h-full relative">
                    <Image
                        src="/images/hero-mobile.png"
                        alt="Our Story"
                        fill
                        className="object-cover transition-all duration-[2000ms] ease-in-out scale-105"
                        style={{
                            filter: isRevealed ? "blur(0px) brightness(1)" : "blur(12px) brightness(0.6)"
                        }}
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
            </div>

            {/* Content */}
            <AnimatePresence>
                {!isRevealed && (
                    <motion.div
                        className="z-10 flex flex-col items-center text-center p-6 space-y-8 text-white max-w-2xl"
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-16 h-16 fill-rose-500 text-rose-500 drop-shadow-glow" strokeWidth={0} />
                        </motion.div>

                        <motion.h1
                            className="font-serif text-6xl md:text-8xl tracking-tight leading-tight drop-shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl font-light tracking-wide opacity-90 drop-shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            {subtitle}
                        </motion.p>

                        <motion.button
                            onClick={handleStart}
                            className="mt-16 group flex flex-col items-center space-y-3 cursor-pointer outline-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-sm uppercase tracking-[0.3em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                Tap to open our story
                            </span>
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-colors">
                                <ChevronDown className="w-5 h-5 animate-bounce" />
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
