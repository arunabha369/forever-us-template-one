"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    image?: string;
}

interface Chapter2Props {
    title: string;
    events: TimelineEvent[];
}

export default function Chapter2({ title, events }: Chapter2Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState("/images/travel.png");

    // Enhanced event data with specific images
    const enhancedEvents = events.map((event, i) => ({
        ...event,
        image: i === 0 ? "/images/first-date.png" :
            i === 1 ? "/images/trip.png" :
                i === 2 ? "/images/stars.png" :
                    "/images/travel.png"
    }));

    return (
        <section ref={containerRef} className="relative bg-zinc-50 dark:bg-black/80">

            <div className="flex flex-col lg:flex-row">
                {/* Sticky Visual Side */}
                <div className="lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 overflow-hidden z-0">
                    <div className="relative w-full h-full">
                        {/* Image Switcher */}
                        {enhancedEvents.map((event, i) => (
                            <Image
                                key={i}
                                src={event.image || "/images/travel.png"}
                                alt={event.title}
                                fill
                                className={`object-cover transition-opacity duration-1000 ${activeImage === event.image ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                    }`}
                                priority={i === 0}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        ))}

                        {/* Rain/Cinematic Overlay Effect */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Rain_drops_on_window_02.jpg')] bg-cover mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Scrolling Content Side */}
                <div className="lg:w-1/2 relative z-10 px-6 py-24 lg:py-40 bg-white/5 backdrop-blur-sm lg:bg-transparent min-h-screen">
                    <div className="max-w-md mx-auto space-y-32">

                        <div className="mb-24 pt-12">
                            <motion.h2
                                className="text-4xl md:text-6xl font-serif text-rose-950 dark:text-rose-100 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {title}
                            </motion.h2>
                            <div className="h-1 w-20 bg-rose-400 mt-6 rounded-full" />
                        </div>

                        {enhancedEvents.map((event, index) => (
                            <TimelineItem
                                key={index}
                                event={event}
                                index={index}
                                onActive={() => setActiveImage(event.image || "/images/travel.png")}
                            />
                        ))}

                        {/* Spacer at bottom */}
                        <div className="h-[20vh]" />
                    </div>
                </div>
            </div>

        </section>
    );
}

// Sub-component to handle intersection detection
function TimelineItem({ event, index, onActive }: { event: TimelineEvent, index: number, onActive: () => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            onActive();
        }
    }, [isInView, onActive]);

    return (
        <motion.div
            ref={ref}
            className="relative pl-8 border-l-2 border-rose-200 dark:border-rose-900/50"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
        >
            {/* Timeline active dot */}
            <motion.span
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 ring-4 ring-rose-100 dark:ring-rose-900/40"
                animate={{ scale: isInView ? 1.2 : 1 }}
            />

            <span className="text-sm font-bold tracking-widest text-rose-500 uppercase mb-2 block font-mono">
                {event.date}
            </span>

            <div className={`bg-white dark:bg-zinc-900/80 p-6 rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800 backdrop-blur-md transition-all duration-500 ${isInView ? "ring-2 ring-rose-200 dark:ring-rose-900 shadow-xl" : ""}`}>
                <h3 className="text-2xl font-serif mb-3 text-zinc-900 dark:text-zinc-100">
                    {event.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                    {event.description}
                </p>
            </div>
        </motion.div>
    );
}
