"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface Chapter1Props {
    title: string;
    subtitle: string;
    text: string;
    location: string;
}

export default function Chapter1({ title, subtitle, text, location }: Chapter1Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(textRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    // Typewriter effect variants
    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.03
            }
        }
    };

    const letter = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl mix-blend-multiply animate-float" />

            <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Text Content */}
                <div
                    className="order-2 lg:order-1 space-y-10"
                >
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <span className="text-rose-500 font-hand text-3xl opacity-80 block mb-2">{subtitle}</span>
                            <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 dark:text-zinc-100 leading-[0.9] tracking-tight">
                                {title}
                            </h2>
                        </motion.div>
                    </div>

                    <motion.div
                        ref={textRef}
                        className="prose prose-lg dark:prose-invert text-xl md:text-2xl leading-relaxed font-light text-zinc-700 dark:text-zinc-300"
                        variants={sentence}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {text.split("").map((char, index) => (
                            <motion.span key={index} variants={letter}>
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        className="pt-6 flex items-center space-x-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <div className="h-px w-16 bg-zinc-300 dark:bg-zinc-700" />
                        <span className="text-sm uppercase tracking-[0.2em] text-zinc-500">{location}</span>
                    </motion.div>
                </div>

                {/* Visual Content - Polaroid */}
                <motion.div
                    className="order-1 lg:order-2 relative perspective-1000"
                    style={{ y, rotate }}
                >
                    <motion.div
                        className="relative p-4 bg-white shadow-2xl skew-y-1 transform-gpu"
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                    >
                        <div className="aspect-[4/5] w-full relative overflow-hidden bg-zinc-100">
                            <Image
                                src="/images/coffee.png"
                                alt="How we met"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="pt-6 pb-2 text-center font-hand text-2xl text-zinc-600">
                            Rainy Tuesday, 2023
                        </div>
                    </motion.div>

                    {/* Floating Element behind */}
                    <div className="absolute -z-10 -top-8 -right-8 w-full h-full border-2 border-rose-900/10 rounded-sm transform rotate-6" />
                </motion.div>

            </div>
        </section>
    );
}
