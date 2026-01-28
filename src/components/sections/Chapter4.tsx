"use client";

import { motion } from "framer-motion";
import { Coffee, Home, Heart, Star, Gem, Plane } from "lucide-react";

interface Milestone {
    year: string;
    title: string;
    icon?: string;
}

interface Chapter4Props {
    title: string;
    events: Milestone[];
}

const iconMap: Record<string, any> = {
    Coffee,
    Home,
    Ring: Gem, // Using Gem as a visual proxy for Ring
    Plane,
    Star,
    Default: Star
};

export default function Chapter4({ title, events }: Chapter4Props) {
    return (
        <section className="py-32 px-6 bg-white dark:bg-black text-center">
            <motion.h2
                className="text-4xl md:text-5xl font-serif mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                {title}
            </motion.h2>

            <div className="max-w-xl mx-auto space-y-0 relative">
                <div className="absolute left-1/2 top-4 bottom-4 w-px bg-zinc-200 dark:bg-zinc-800 transform -translate-x-1/2 -z-10" />

                {events.map((event, i) => {
                    // Basic icon mapping logic
                    const IconComponent = iconMap[event.icon || "Default"] || iconMap.Default;

                    return (
                        <motion.div
                            key={i}
                            className="relative py-12 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl w-full max-w-xs shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col items-center space-y-3">
                                    <span className="text-4xl text-rose-400 font-bold opacity-20 absolute -top-4">{event.year}</span>
                                    <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/10 rounded-full flex items-center justify-center text-rose-500">
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-medium">{event.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    );
}
