"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function Reservations() {
    return (
        <div className="min-h-screen bg-black p-6 pt-40 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold rounded-full filter blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-burnt-orange rounded-full filter blur-[150px] animate-pulse delay-1000" />
            </div>

            <div className="max-w-5xl mx-auto z-10 relative">
                {/* Reservations Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-display font-light text-cream mb-6 leading-[0.95] tracking-[-0.05em] lowercase">
                        Secure Your <span className="text-gold">Table</span>
                    </h1>
                    <p className="text-sm text-medium-gray/60 leading-relaxed mb-8 font-body font-extralight tracking-[0.2em] uppercase">
                        Call us to book your table
                    </p>

                    <div className="inline-flex items-center gap-4 bg-charcoal border border-gold/20 rounded-sm px-8 py-6 mb-8">
                        <Phone className="text-gold" size={28} />
                        <a href="tel:0701087561" className="text-3xl md:text-4xl font-display font-light text-gold tracking-[-0.03em] hover:text-gold-bright transition-colors">
                            0701 087 561
                        </a>
                    </div>

                    <div className="border-t border-gold/20 pt-8 mt-8 max-w-md mx-auto">
                        <p className="text-xs text-gold/60 uppercase tracking-widest mb-2 font-body font-light">Opening Hours</p>
                        <p className="text-cream font-display font-light text-xl tracking-[-0.03em] lowercase">Mon - Sun: 8:00 AM - 11:00 PM</p>
                    </div>
                </motion.div>

                {/* Order Now Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-display font-light text-cream mb-6 tracking-[-0.05em] lowercase">
                        Order <span className="text-gold">Now</span>
                    </h2>
                    <p className="text-sm text-medium-gray/60 leading-relaxed mb-10 font-body font-extralight tracking-[0.2em] uppercase">
                        Pay via M-Pesa using our till number
                    </p>

                    <div className="bg-charcoal border border-gold/20 rounded-sm p-6 md:p-10 inline-block">
                        <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] mx-auto">
                            <Image
                                src="/images/till-number.webp"
                                alt="M-Pesa Till Number"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
