"use client";

import { motion } from "framer-motion";

interface Chapter5Props {
    greeting: string;
    body: string;
    signature: string;
}

export default function Chapter5({ greeting, body, signature }: Chapter5Props) {
    return (
        <section className="py-40 px-6 min-h-screen flex items-center justify-center bg-[#fafaf9] dark:bg-[#0c0a09]">
            <div className="max-w-2xl mx-auto w-full relative">
                {/* Paper texture effect */}
                <div className="absolute inset-0 bg-orange-50/50 dark:bg-orange-900/5 mix-blend-multiply blur-3xl rounded-full opacity-50" />

                <motion.div
                    className="relative z-10 space-y-8 font-hand text-2xl md:text-4xl leading-relaxed text-zinc-700 dark:text-zinc-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                >
                    <h3 className="text-3xl md:text-5xl font-bold text-rose-800 dark:text-rose-200">{greeting}</h3>

                    <div className="space-y-6">
                        {body.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="pt-12 text-right">
                        <p className="text-3xl md:text-5xl opacity-80">{signature}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
