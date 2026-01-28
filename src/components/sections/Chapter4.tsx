"use client";

import { motion } from "framer-motion";
import { Gem, Home, Coffee } from "lucide-react";
import Image from "next/image";

interface MilestoneEvent {
    year: string;
    title: string;
    icon: string;
    image?: string; // New optional image prop
}

interface Chapter4Props {
    title: string;
    events: MilestoneEvent[];
}

export default function Chapter4({ title, events }: Chapter4Props) {
    // Enhanced events with images if not provided in props
    const enhancedEvents = events.map(event => ({
        ...event,
        image: event.icon === "Home" ? "/images/milestone-home.png" :
            event.icon === "Ring" ? "/images/milestone-engaged.png" :
                "/images/coffee.png"
    }));

    const iconMap: Record<string, React.ReactNode> = {
        "Coffee": <Coffee className="w-6 h-6 text-white" />,
        "Home": <Home className="w-6 h-6 text-white" />,
        "Ring": <Gem className="w-6 h-6 text-white" />, // Gem is closest to a ring/diamond
    };

    return (
        <section className="py-24 px-6 bg-rose-50/50 dark:bg-zinc-900/50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl font-serif text-center mb-20 text-rose-950 dark:text-rose-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {title}
                </motion.h2>

                <div className="space-y-16">
                    {enhancedEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-12"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Mobile-First Image Card */}
                            <div className={`w-full md:w-1/2 aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <Image
                                    src={event.image || "/images/hero.png"}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                                {/* Floating Date Badge */}
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                    <span className="font-mono text-sm font-bold text-rose-600 tracking-wider">{event.year}</span>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left ${index % 2 === 1 ? 'md:order-1 md:items-end md:text-right' : ''}`}>
                                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {iconMap[event.icon] || <Gem className="w-6 h-6 text-white" />}
                                </div>

                                <h3 className="text-3xl font-serif text-zinc-900 dark:text-zinc-100 mb-2">{event.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                                    A beautiful moment in our journey that we will cherish forever.
                                </p>
                            </div>

                            {/* Connecting Line (Desktop Only) */}
                            {index !== enhancedEvents.length - 1 && (
                                <div className="hidden md:block absolute left-1/2 top-full h-16 w-px bg-rose-200 -ml-px transform translate-y-[-2rem]" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
