import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-cream text-charcoal py-20 border-t border-gold/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-3xl font-display font-light text-forest-green mb-6 tracking-[-0.05em] lowercase">
                            Kim's Pork Hub
                        </h3>
                        <p className="text-warm-gray/60 max-w-sm leading-relaxed mb-6 font-body font-extralight tracking-[0.15em]">
                            The ritual of the roast. Carefully sourced, expertly butchered, and prepared with unwavering dedication.
                        </p>
                        <p className="text-burgundy font-display font-light tracking-[-0.03em] text-lg lowercase">
                            "Primal Satisfaction."
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-body font-extralight uppercase tracking-widest text-forest-green/60 mb-6">Explore</h4>
                        <ul className="space-y-3 font-body font-extralight text-sm text-warm-gray/60 tracking-[0.15em]">
                            <li><Link href="/" className="hover:text-burgundy transition-colors duration-300">Home</Link></li>
                            <li><Link href="/menu" className="hover:text-burgundy transition-colors duration-300">The Menu</Link></li>
                            <li><Link href="/reservations" className="hover:text-burgundy transition-colors duration-300">Reservations</Link></li>
                            <li><Link href="/meat-the-team" className="hover:text-burgundy transition-colors duration-300">Meat the Team</Link></li>
                            <li><Link href="/contact" className="hover:text-burgundy transition-colors duration-300">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-body font-extralight uppercase tracking-widest text-forest-green/60 mb-6">Socials</h4>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white border border-gold/10 hover:border-burgundy hover:text-burgundy p-3 rounded-sm transition-all duration-300 shadow-sm text-forest-green">
                                <Instagram size={16} />
                            </a>
                            <a href="#" className="bg-white border border-gold/10 hover:border-burgundy hover:text-burgundy p-3 rounded-sm transition-all duration-300 shadow-sm text-forest-green">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="bg-white border border-gold/10 hover:border-burgundy hover:text-burgundy p-3 rounded-sm transition-all duration-300 shadow-sm text-forest-green">
                                <Twitter size={16} />
                            </a>
                        </div>
                        <p className="mt-10 text-xs text-warm-gray/40 uppercase tracking-widest font-body font-light">
                            © {new Date().getFullYear()} Kim's Pork Hub.<br />
                            Crafted by Antigravity.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
