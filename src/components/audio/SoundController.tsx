"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SoundControllerProps {
    allowAutoPlay?: boolean;
}

export default function SoundController({ allowAutoPlay = false }: SoundControllerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Create audio element
        const audio = new Audio("/audio/background-music.mp3");
        audio.loop = true;
        audio.volume = 0.4;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (allowAutoPlay && !isPlaying && !hasInteracted) {
            handleToggle();
        }
    }, [allowAutoPlay]);

    const handleToggle = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => {
                console.log("Audio play failed (waiting for interaction):", e);
            });
            setHasInteracted(true);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <motion.button
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 border border-white/20"
                onClick={handleToggle}
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? "Mute music" : "Play music"}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                        >
                            <Volume2 className="h-5 w-5 text-white/90" />
                            {/* Ripple effect */}
                            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-rose-500/30 opacity-75 duration-1000" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="muted"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                        >
                            <VolumeX className="h-5 w-5 text-white/70" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
