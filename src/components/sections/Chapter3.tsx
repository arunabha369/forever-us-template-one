"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Chapter3Props {
    title: string;
    description: string;
}

export default function Chapter3({ title, description }: Chapter3Props) {
    // reusing the generated images for the gallery demo
    const memories = [
        { src: "/images/coffee.png", aspect: "aspect-[3/4]" },
        { src: "/images/travel.png", aspect: "aspect-video" },
        { src: "/images/hero.png", aspect: "aspect-square" },
        { src: "/images/travel.png", aspect: "aspect-[3/4]" },
        { src: "/images/hero.png", aspect: "aspect-video" },
        { src: "/images/coffee.png", aspect: "aspect-square" },
    ];

    return (
        <section className="py-32 px-6 bg-rose-50/30 dark:bg-black/20">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.h2
                    className="text-4xl md:text-6xl font-serif mb-6 text-rose-950 dark:text-rose-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {title}
                </motion.h2>
                <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">{description}</p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
                {memories.map((memo, i) => (
                    <motion.div
                        key={i}
                        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className={`relative w-full ${memo.aspect} bg-zinc-200 dark:bg-zinc-800`}>
                            <Image
                                src={memo.src}
                                alt={`Memory ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />

                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                                    <span className="text-xl">+</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
