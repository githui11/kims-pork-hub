"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Truck } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen bg-black pt-40 pb-12 flex items-center">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-display font-light text-cream mb-6 tracking-[-0.05em] lowercase">Get in Touch</h1>
                    <p className="text-sm text-medium-gray/60 font-body font-extralight tracking-[0.2em] uppercase">We'd love to hear from you</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Location */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-charcoal border border-gold/20 rounded-sm p-8 text-center hover:border-gold/40 transition-colors"
                    >
                        <div className="bg-black/50 border border-gold/20 p-4 rounded-md text-gold inline-block mb-6">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-2xl font-display font-light text-gold mb-3 tracking-[-0.03em] lowercase">Visit Us</h3>
                        <p className="text-light-gray/60 font-body font-extralight tracking-[0.15em]">
                            Opposite Shell Petrol Station,<br />Kenol Town
                        </p>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-charcoal border border-gold/20 rounded-sm p-8 text-center hover:border-gold/40 transition-colors"
                    >
                        <div className="bg-black/50 border border-gold/20 p-4 rounded-md text-gold inline-block mb-6">
                            <Phone size={28} />
                        </div>
                        <h3 className="text-2xl font-display font-light text-gold mb-3 tracking-[-0.03em] lowercase">Call Us</h3>
                        <a href="tel:0701087561" className="text-light-gray/60 font-body font-extralight tracking-[0.15em] hover:text-gold transition-colors">
                            0701 087 561
                        </a>
                    </motion.div>

                    {/* Delivery */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-charcoal border border-gold/20 rounded-sm p-8 text-center hover:border-gold/40 transition-colors"
                    >
                        <div className="bg-black/50 border border-gold/20 p-4 rounded-md text-gold inline-block mb-6">
                            <Truck size={28} />
                        </div>
                        <h3 className="text-2xl font-display font-light text-gold mb-3 tracking-[-0.03em] lowercase">Delivery</h3>
                        <p className="text-light-gray/60 font-body font-extralight tracking-[0.15em]">
                            Free delivery<br />within Kenol Town
                        </p>
                    </motion.div>
                </div>

                {/* Opening Hours */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center border-t border-gold/20 pt-12"
                >
                    <p className="text-xs text-gold/60 uppercase tracking-widest mb-3 font-body font-light">Opening Hours</p>
                    <p className="text-2xl font-display font-light text-cream tracking-[-0.03em] lowercase">Mon - Sun: 8:00 AM - 11:00 PM</p>
                </motion.div>
            </div>
        </div>
    );
}
