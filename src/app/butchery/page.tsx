"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const butcherItems = [
    { size: "1kg", price: "KSH 600", description: "Family Size" },
    { size: "1/2 kg", price: "KSH 300", description: "Standard" },
    { size: "1/4 kg", price: "KSH 150", description: "Sample" },
];

export default function ButcherPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            {/* Full Screen Background Image - using absolute for better mobile support */}
            <div
                className="absolute inset-0 h-full w-full"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    WebkitTransform: 'translateZ(0)',
                    transform: 'translateZ(0)',
                }}
            >
                <Image
                    src="/images/butcher-bg.webp"
                    alt="Premium pork cuts"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                    sizes="100vw"
                    style={{
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                    }}
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            </div>

            {/* Main content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Tagline */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-gold font-body text-xs tracking-[0.3em] uppercase block mb-6"
                    >
                        Premium Raw Cuts
                    </motion.span>

                    {/* Main Heading */}
                    <h1 className="text-7xl md:text-9xl font-display font-medium text-white mb-8 tracking-[-0.04em] lowercase">
                        the butchery
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-white/80 font-body font-light tracking-wide max-w-xl mx-auto mb-16">
                        Take the Kim's Pork Hub experience home. Fresh from farm, quality you can cook.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-full max-w-3xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {butcherItems.map((item, index) => (
                            <motion.div
                                key={item.size}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                className="group relative"
                            >
                                <div className="relative bg-charcoal/95 border border-gold/20 rounded-md p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-gold hover:-translate-y-1 transition-all duration-500">
                                    {/* Size label */}
                                    <span className="text-light-gray/60 font-body text-xs tracking-[0.2em] uppercase block mb-2">
                                        {item.description}
                                    </span>

                                    {/* Weight */}
                                    <span className="text-white font-display text-2xl md:text-3xl font-medium tracking-tight block mb-4">
                                        {item.size}
                                    </span>

                                    {/* Divider */}
                                    <div className="w-12 h-px bg-gold/40 mx-auto mb-4" />

                                    {/* Price */}
                                    <span className="text-gold font-display text-3xl md:text-4xl font-semibold tracking-tight">
                                        {item.price}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="mt-16 text-white/50 font-body text-sm tracking-widest uppercase"
                >
                    Available Daily • Fresh Cuts Only
                </motion.p>
            </div>
        </div>
    );
}
