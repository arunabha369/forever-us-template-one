"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    image?: string;
    mobileImage?: string;
}

interface Chapter2Props {
    title: string;
    events: TimelineEvent[];
}

export default function Chapter2({ title, events }: Chapter2Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState("/images/travel.png");
    const [activeMobileImage, setActiveMobileImage] = useState("/images/trip-mobile.png");

    const enhancedEvents = events.map((event, i) => ({
        ...event,
        image: i === 0 ? "/images/first-date.png" :
            i === 1 ? "/images/trip.png" :
                i === 2 ? "/images/stars.png" :
                    "/images/travel.png",
        mobileImage: i === 0 ? "/images/first-date-mobile.png" :
            i === 1 ? "/images/trip-mobile.png" :
                i === 2 ? "/images/stars-mobile.png" :
                    "/images/trip-mobile.png"
    }));

    const handleActive = (event: TimelineEvent) => {
        if (event.image) setActiveImage(event.image);
        if (event.mobileImage) setActiveMobileImage(event.mobileImage);
    }

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-zinc-900">

            {/* 
        MOBILE BACKGROUND LAYER (Sticky)
        This div fills the entire section height absolutely,
        but contains a sticky child that stays in the viewport.
      */}
            <div className="lg:hidden absolute inset-0 z-0">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {enhancedEvents.map((event, i) => (
                        <Image
                            key={`mobile-sticky-${i}`}
                            src={event.mobileImage || "/images/trip-mobile.png"}
                            alt={event.title}
                            fill
                            className={`object-cover transition-opacity duration-1000 ${activeMobileImage === event.mobileImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                }`}
                            priority={i === 0}
                            sizes="100vw"
                        />
                    ))}
                    {/* Dark Overlay for Text Readability - slightly darker for better contrast */}
                    <div className="absolute inset-0 bg-black/65" />
                </div>
            </div>

            {/* DESKTOP BACKGROUND LAYER (Sticky Left Panel) */}
            <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-0">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {enhancedEvents.map((event, i) => (
                        <Image
                            key={`desktop-${i}`}
                            src={event.image || "/images/travel.png"}
                            alt={event.title}
                            fill
                            className={`object-cover transition-opacity duration-1000 ${activeImage === event.image ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                }`}
                            priority={i === 0}
                            sizes="50vw"
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Rain_drops_on_window_02.jpg')] bg-cover mix-blend-overlay pointer-events-none" />
                </div>
            </div>


            {/* SCROLLING CONTENT LAYER */}
            <div className="relative z-10 flex flex-col lg:flex-row">

                {/* Desktop Left Spacer (transparent, to overlay the sticky images) */}
                <div className="hidden lg:block lg:w-1/2" />

                {/* Content Column */}
                <div className="w-full lg:w-1/2 px-6 py-24 lg:py-40">
                    <div className="max-w-md mx-auto space-y-40 lg:space-y-32 mt-[15vh] lg:mt-0">

                        {/* Chapter Title */}
                        <div className="mb-24 pt-12 text-center lg:text-left relative z-20">
                            <motion.h2
                                className="text-5xl md:text-6xl font-serif text-white lg:text-rose-950 lg:dark:text-rose-100 leading-tight drop-shadow-xl lg:drop-shadow-none"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                {title}
                            </motion.h2>
                            <div className="h-1 w-20 bg-rose-400 mt-6 rounded-full mx-auto lg:mx-0 shadow-lg lg:shadow-none" />
                        </div>

                        {enhancedEvents.map((event, index) => (
                            <TimelineItem
                                key={index}
                                event={event}
                                index={index}
                                onActive={() => handleActive(event)}
                            />
                        ))}

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
            className="relative pl-8 border-l-2 border-rose-300/60 lg:border-rose-200/50 dark:border-rose-900/50"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
        >
            {/* Timeline active dot */}
            <motion.span
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 ring-4 ring-rose-200 lg:ring-rose-100 dark:ring-rose-900/40"
                animate={{ scale: isInView ? 1.2 : 1 }}
            />

            <span className="text-sm font-bold tracking-widest text-rose-300 lg:text-rose-500 uppercase mb-2 block font-mono drop-shadow-md lg:drop-shadow-none">
                {event.date}
            </span>

            <div className={`
             p-6 rounded-xl border backdrop-blur-md transition-all duration-500
             bg-zinc-900/60 border-white/10 text-white
             lg:bg-white lg:dark:bg-zinc-900/80 lg:border-zinc-100 lg:dark:border-zinc-800 lg:text-zinc-900 lg:dark:text-zinc-100 lg:shadow-lg
             ${isInView ? "ring-1 ring-rose-400/50 lg:ring-2 lg:ring-rose-200 lg:dark:ring-rose-900 shadow-xl scale-[1.02]" : "opacity-80 scale-100"}
           `}>
                <h3 className="text-2xl font-serif mb-3 drop-shadow-md lg:drop-shadow-none">
                    {event.title}
                </h3>
                <p className="leading-relaxed font-light opacity-90 lg:opacity-100 text-zinc-100 lg:text-zinc-600 lg:dark:text-zinc-400">
                    {event.description}
                </p>
            </div>
        </motion.div>
    );
}
