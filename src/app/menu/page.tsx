"use client";

import { motion } from "framer-motion";

const menuCategories = [
    {
        name: "Pork Fry",
        desc: "Kitchen fried pork, crispy and delicious",
        items: [
            { size: "1kg", price: "KSH 720" },
            { size: "3/4 kg", price: "KSH 540" },
            { size: "1/2 kg", price: "KSH 360" },
            { size: "1/4 kg", price: "KSH 180" },
        ]
    },
    {
        name: "Pork Choma",
        desc: "Fire-roasted pork, smoky and tender",
        items: [
            { size: "1kg", price: "KSH 720" },
            { size: "3/4 kg", price: "KSH 540" },
            { size: "1/2 kg", price: "KSH 360" },
            { size: "1/4 kg", price: "KSH 180" },
        ]
    },
    {
        name: "Pork Fry + Ugali + Greens",
        desc: "Complete meal with fried pork",
        items: [
            { size: "1kg", price: "KSH 760" },
            { size: "3/4 kg", price: "KSH 580" },
            { size: "1/2 kg", price: "KSH 400" },
            { size: "1/4 kg", price: "KSH 220" },
        ]
    },
    {
        name: "Pork Choma + Ugali + Greens",
        desc: "Complete meal with roasted pork",
        items: [
            { size: "1kg", price: "KSH 760" },
            { size: "3/4 kg", price: "KSH 580" },
            { size: "1/2 kg", price: "KSH 400" },
            { size: "1/4 kg", price: "KSH 220" },
        ]
    },
    {
        name: "Pork + Chips",
        desc: "Pork served with golden fries",
        items: [
            { size: "1kg", price: "KSH 820" },
            { size: "3/4 kg", price: "KSH 630" },
            { size: "1/2 kg", price: "KSH 430" },
            { size: "1/4 kg", price: "KSH 250" },
        ]
    },
    {
        name: "Chips",
        desc: "Golden fried chips",
        items: [
            { size: "Small", price: "KSH 70" },
            { size: "Medium", price: "KSH 100" },
            { size: "Large", price: "KSH 150" },
        ]
    },
];



export default function MenuPage() {
    return (
        <div className="relative min-h-screen bg-transparent pt-32 px-4 pb-20">
            {/* Background Video is now handled globally in layout.tsx */}

            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-display font-light text-gold mb-4 tracking-[-0.05em] lowercase">The Menu</h1>
                    <p className="text-xs text-gold-soft/60 font-body font-extralight tracking-widest uppercase">Something for everyone</p>
                </motion.div>

                <div className="space-y-12">
                    {menuCategories.map((category, i) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-charcoal border border-gold/10 rounded-sm p-8 md:p-10 hover:border-gold/30 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
                                <h2 className="text-3xl md:text-4xl font-display font-light text-cream tracking-[-0.03em] lowercase mb-2 md:mb-0">
                                    {category.name}
                                </h2>
                                <p className="text-sm text-medium-gray/60 font-body font-extralight tracking-[0.15em]">
                                    {category.desc}
                                </p>
                            </div>

                            <div className="h-px w-full bg-gold/20 mb-6" />

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {category.items.map((item) => (
                                    <div key={item.size} className="flex flex-col items-center text-center p-4 bg-black/30 rounded-sm">
                                        <span className="text-sm text-light-gray/70 font-body font-extralight tracking-[0.1em] mb-2">
                                            {item.size}
                                        </span>
                                        <span className="text-xl font-display font-light text-gold tracking-[-0.02em]">
                                            {item.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
