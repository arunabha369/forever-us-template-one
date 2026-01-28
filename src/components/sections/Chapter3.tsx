"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

interface Chapter3Props {
    title: string;
    description: string;
}

export default function Chapter3({ title, description }: Chapter3Props) {
    const containerRef = useRef(null);

    // Gallery Items - Mixture of all our generated assets
    const memories = [
        { src: "/images/hero.png", alt: "The Beginning", span: "col-span-2 row-span-2" },
        { src: "/images/memory-cooking.png", alt: "Cooking Together", span: "col-span-1 row-span-1" },
        { src: "/images/first-date-mobile.png", alt: "Sushi Date", span: "col-span-1 row-span-2" },
        { src: "/images/trip.png", alt: "Mountain Trip", span: "col-span-1 row-span-1" },
        { src: "/images/milestone-home.png", alt: "Our First Home", span: "col-span-2 row-span-1" },
        { src: "/images/stars.png", alt: "Stargazing", span: "col-span-1 row-span-1" },
        { src: "/images/memory-picnic.png", alt: "Picnic Day", span: "col-span-1 row-span-2" },
        { src: "/images/coffee.png", alt: "Coffee Shop", span: "col-span-1 row-span-1" },
        { src: "/images/milestone-engaged.png", alt: "The Proposal", span: "col-span-2 row-span-2" },
        { src: "/images/memory-beach.png", alt: "Beach Sunset", span: "col-span-1 row-span-1" },
        { src: "/images/trip-mobile.png", alt: "Hiking Adventure", span: "col-span-1 row-span-2" },
        { src: "/images/stars-mobile.png", alt: "Falling Star", span: "col-span-1 row-span-1" }
    ];

    return (
        <section className="py-24 px-4 bg-white dark:bg-zinc-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-serif text-rose-950 dark:text-rose-100 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {title}
                    </motion.h2>
                    <p className="text-zinc-500 font-light text-lg tracking-wide">{description}</p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {memories.map((memory, index) => (
                        <motion.div
                            key={index}
                            className={`relative group overflow-hidden rounded-2xl ${memory.span}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Image
                                src={memory.src}
                                alt={memory.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <Plus className="w-8 h-8 text-white mx-auto mb-2 opacity-80" />
                                    <p className="text-white font-medium tracking-wider text-sm uppercase">{memory.alt}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-zinc-400 italic text-sm">Tap any photo to relive the moment</p>
                </div>

            </div>
        </section>
    );
}
