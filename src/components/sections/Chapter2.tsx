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

    // Enhanced event data with specific images for both desktop and mobile
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
        <section ref={containerRef} className="relative bg-zinc-50 dark:bg-black/80 min-h-screen">

            {/* 
        VISUAL LAYER 
        Mobile: Full screen sticky background
        Desktop: Split screen sticky left panel
      */}
            <div className="lg:static lg:w-1/2 h-full">
                <div className="sticky top-0 h-screen w-full overflow-hidden z-0">

                    <div className="relative w-full h-full">
                        {/* Image Switcher Desktop */}
                        <div className="hidden lg:block w-full h-full relative">
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
                        </div>

                        {/* Image Switcher Mobile */}
                        <div className="block lg:hidden w-full h-full relative">
                            {enhancedEvents.map((event, i) => (
                                <Image
                                    key={`mobile-${i}`}
                                    src={event.mobileImage || "/images/trip-mobile.png"}
                                    alt={event.title}
                                    fill
                                    className={`object-cover transition-opacity duration-1000 ${activeMobileImage === event.mobileImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                        }`}
                                    priority={i === 0}
                                    sizes="100vw"
                                />
                            ))}
                            {/* Mobile Gradient Overlay for Readability */}
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                        </div>

                        {/* Rain/Cinematic Overlay Effect */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Rain_drops_on_window_02.jpg')] bg-cover mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                    </div>

                </div>
            </div>

            {/* 
        CONTENT LAYER
        Mobile: Overlays the background, full width
        Desktop: Right side scroll
      */}
            {/* Note: On mobile, we need negative margin to pull this content UP over the sticky background placeholder if we used static flow, 
          BUT since we want the 'sticky' behavior to work, we actually structure it as:
          The container is a flex row on desktop.
          On mobile, we can use a different approach: Absolute positioning the background.
          Wait, the previous structure had flex-col.
      */}

        </section>
    );
}

// 
// RE-WRITING THE RETURN STATEMENT COMPLETELY FOR PROPER STRUCTURE
//
function Chapter2Full({ title, events }: Chapter2Props) {
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
        <section ref={containerRef} className="relative min-h-screen">

            {/* VISUAL BACKGROUND (Mobile: Fixed/Sticky Full, Desktop: Sticky Left Half) */}
            <div className="block lg:flex lg:flex-row">

                {/* Visual Container */}
                <div className="h-screen w-full lg:w-1/2 sticky top-0 left-0 z-0 overflow-hidden">

                    {/* Desktop Images */}
                    <div className="hidden lg:block w-full h-full relative">
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
                    </div>

                    {/* Mobile Images */}
                    <div className="block lg:hidden w-full h-full relative">
                        {enhancedEvents.map((event, i) => (
                            <Image
                                key={`mobile-${i}`}
                                src={event.mobileImage || "/images/trip-mobile.png"}
                                alt={event.title}
                                fill
                                className={`object-cover transition-opacity duration-1000 ${activeMobileImage === event.mobileImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                    }`}
                                priority={i === 0}
                                sizes="100vw"
                            />
                        ))}
                        {/* Heavy dimming on mobile for text readability */}
                        <div className="absolute inset-0 bg-black/60" />
                    </div>

                    {/* Overlays */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Rain_drops_on_window_02.jpg')] bg-cover mix-blend-overlay pointer-events-none" />
                </div>

                {/* SCROLLING CONTENT (Mobile: Overlays the sticky bg, Desktop: Right Side) */}
                {/* On mobile, this div needs to scroll OVER the sticky background. 
              The default behavior of 'sticky' requires the content to be siblings or parent.
              Here, 'h-screen sticky' defines the visual.
              The content needs to come AFTER it in the DOM but typically needs to overlap for the 'fixed background' feel on mobile.
          */}

                {/* MOBILE TRICK: Negative margin to pull content over the sticky visual? 
               No, a cleaner way: The visual is sticky. The content is just a normal block that scrolls.
               Since visual is 'h-screen', the content naturally appears below it?
               No, we want the content ON TOP of the visual on mobile.
           */}

                {/* Refined Strategy for Mobile: 
               Use 'fixed' for the mobile background specifically, or absolute.
               Let's try: Mobile uses fixed position for the image.
           */}
            </div>

            {/* RE-IMPLEMENTATION WITH FIXED MOBILE BG */}

            {/* Mobile Absolute/Fixed Background Layer */}
            <div className="lg:hidden fixed inset-0 z-0 w-full h-full">
                {enhancedEvents.map((event, i) => (
                    <Image
                        key={`mobile-fixed-${i}`}
                        src={event.mobileImage || "/images/trip-mobile.png"}
                        alt={event.title}
                        fill
                        className={`object-cover transition-opacity duration-1000 ${activeMobileImage === event.mobileImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
                            }`}
                        priority={i === 0}
                        sizes="100vw"
                    />
                ))}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="flex flex-col lg:flex-row relative z-10">

                {/* Desktop Sticky Side (Hidden on Mobile) */}
                <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 overflow-hidden">
                    <div className="relative w-full h-full">
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
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Rain_drops_on_window_02.jpg')] bg-cover mix-blend-overlay pointer-events-none" />
                    </div>
                </div>

                {/* Content Side (Full width mobile, Half desktop) */}
                <div className="w-full lg:w-1/2 px-6 py-24 lg:py-40 min-h-[150vh]">
                    <div className="max-w-md mx-auto space-y-40 lg:space-y-32 mt-[20vh] lg:mt-0">

                        {/* Chapter Title */}
                        <div className="mb-24 pt-12 text-center lg:text-left">
                            <motion.h2
                                className="text-5xl md:text-6xl font-serif text-white lg:text-rose-950 lg:dark:text-rose-100 leading-tight drop-shadow-lg lg:drop-shadow-none"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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
            className="relative pl-8 border-l-2 border-rose-200/50 dark:border-rose-900/50"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
        >
            {/* Timeline active dot */}
            <motion.span
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 ring-4 ring-rose-100 lg:ring-rose-100 dark:ring-rose-900/40"
                animate={{ scale: isInView ? 1.2 : 1 }}
            />

            <span className="text-sm font-bold tracking-widest text-rose-300 lg:text-rose-500 uppercase mb-2 block font-mono shadow-black drop-shadow-md lg:drop-shadow-none">
                {event.date}
            </span>

            <div className={`
             p-6 rounded-xl border backdrop-blur-md transition-all duration-500
             bg-black/40 border-white/10 text-white
             lg:bg-white lg:dark:bg-zinc-900/80 lg:border-zinc-100 lg:dark:border-zinc-800 lg:text-zinc-900 lg:dark:text-zinc-100 lg:shadow-lg
             ${isInView ? "ring-1 ring-rose-400/50 lg:ring-2 lg:ring-rose-200 lg:dark:ring-rose-900 shadow-xl" : ""}
           `}>
                <h3 className="text-2xl font-serif mb-3">
                    {event.title}
                </h3>
                <p className="leading-relaxed font-light opacity-90 lg:opacity-100 text-rose-50/80 lg:text-zinc-600 lg:dark:text-zinc-400">
                    {event.description}
                </p>
            </div>
        </motion.div>
    );
}

// Exporting the corrected component
const Chapter2 = Chapter2Full;
export default Chapter2;
