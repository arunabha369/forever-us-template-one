"use client";

import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

interface FinalSceneProps {
    text: string;
}

export default function FinalScene({ text }: FinalSceneProps) {
    const handleReplay = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-rose-50 px-6 text-center space-y-12">
            <motion.p
                className="text-3xl md:text-6xl font-serif max-w-4xl leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
            >
                "{text}"
            </motion.p>

            <motion.button
                onClick={handleReplay}
                className="flex items-center space-x-3 text-rose-300/60 hover:text-rose-200 transition-colors uppercase tracking-widest text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                whileHover={{ scale: 1.05 }}
            >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Our Story</span>
            </motion.button>
        </section>
    );
}
