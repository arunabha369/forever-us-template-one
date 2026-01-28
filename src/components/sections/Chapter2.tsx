"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
}

interface Chapter2Props {
    title: string;
    events: TimelineEvent[];
}

export default function Chapter2({ title, events }: Chapter2Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-24 md:py-40 min-h-screen flex flex-col items-center bg-zinc-50/50 dark:bg-zinc-900/20">
            <motion.h2
                className="text-4xl md:text-6xl font-serif text-center mb-32 sticky top-24 z-10 mix-blend-difference text-zinc-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {title}
            </motion.h2>

            <div className="relative w-full max-w-5xl mx-auto px-6">
                {/* Center Line with gradient fade */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-300/50 to-transparent transform md:-translate-x-1/2" />

                <div className="space-y-32">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex flex-col md:flex-row gap-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                            initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        >
                            {/* Content Side */}
                            <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                                <motion.div
                                    className="glass-panel p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500 bg-white/60 dark:bg-black/40"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="aspect-video w-full mb-6 relative rounded-lg overflow-hidden bg-zinc-200">
                                        {/* Placeholder for varying visuals - reusing travel image for vibe */}
                                        <Image
                                            src="/images/travel.png"
                                            alt={event.title}
                                            fill
                                            className="object-cover opacity-90 hover:opacity-100 transition-opacity hover:scale-105 duration-700"
                                        />
                                    </div>
                                    <span className="text-rose-500 font-mono text-sm tracking-widest uppercase">{event.date}</span>
                                    <h3 className="text-3xl font-serif mt-3 mb-4">{event.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {event.description}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Center Marker with Heart */}
                            <div className="absolute left-6 md:left-1/2 w-12 h-12 -ml-6 flex items-center justify-center transform md:-translate-x-1/2 z-20 bg-background rounded-full border border-rose-100">
                                <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                            </div>

                            {/* Empty Side for Balance */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
