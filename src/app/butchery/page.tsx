"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const butcherItems = [
    { size: "1kg", price: "KSH 600" },
    { size: "1/2 kg", price: "KSH 300" },
    { size: "1/4 kg", price: "KSH 150" },
];

export default function ButcherPage() {
    return (
        <div className="relative min-h-screen bg-black">
            {/* Black side margins */}
            <div className="fixed top-0 left-0 w-16 md:w-24 lg:w-32 h-full bg-black z-10" />
            <div className="fixed top-0 right-0 w-16 md:w-24 lg:w-32 h-full bg-black z-10" />

            {/* Main content area with padding for margins */}
            <div className="relative pt-32 px-20 md:px-28 lg:px-36 pb-20">
                {/* Full Screen Background Image */}
                <div className="fixed inset-0 -z-10">
                    <Image
                        src="/images/butcher-bg.webp"
                        alt="Butcher Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-display font-medium text-black mb-4 tracking-[-0.05em] lowercase drop-shadow-md">The Butchery</h1>
                    <p className="text-sm text-black font-body font-bold tracking-widest uppercase drop-shadow-sm">Premium Raw Cuts</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >

                    <div className="relative z-10 text-center mb-12">
                        <span className="text-black font-body text-sm tracking-widest block mb-4 uppercase font-bold drop-shadow-sm">Fresh From Farm</span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-black tracking-[-0.05em] lowercase drop-shadow-md">Quality You Can Cook</h2>
                        <p className="text-base text-black font-body font-bold tracking-[0.15em] mt-4 drop-shadow-sm">Take the Kim's Pork Hub experience home.</p>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="grid grid-cols-3 gap-6">
                            {butcherItems.map((item) => (
                                <div key={item.size} className="flex flex-col items-center text-center p-6 border-2 border-black/80 rounded-sm hover:bg-black/5 hover:border-black transition-colors group">
                                    <span className="text-base text-black font-body font-bold tracking-[0.1em] mb-2">
                                        {item.size}
                                    </span>
                                    <span className="text-2xl md:text-4xl font-display font-semibold text-black tracking-[-0.02em]">
                                        {item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
                </div>
            </div>
        </div>
    );
}
