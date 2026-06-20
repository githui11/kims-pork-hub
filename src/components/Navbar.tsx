"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // Ensure lucide-react is installed, checking package.json or page.tsx usage

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isButcheryPage = pathname === '/butchery';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    // Dynamic styles based on page and scroll state
    // On butchery page, always use dark header style
    const shouldUseBlackText = false; // Disabled - always use light text on butchery page now

    const textColorClass = "text-cream/70 hover:text-gold";

    const buttonClass = "text-cream/80 border-gold/20 hover:border-gold hover:bg-gold/5 hover:text-cream";

    // On butchery page, always show the dark header regardless of scroll
    const alwaysDark = isButcheryPage;

    return (
        <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${(scrolled || alwaysDark) ? 'py-4 bg-black/95 backdrop-blur-md border-b border-gold/20 shadow-md' : 'py-8 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="transition-opacity hover:opacity-80 z-50 flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Kim's Pork Hub"
                        width={192}
                        height={64}
                        className="object-contain object-left"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className={`hidden md:flex gap-12 font-body font-extralight text-xs tracking-widest uppercase transition-colors duration-300 ${textColorClass}`}>
                    <Link href="/menu" className="transition-colors duration-300">Menu</Link>
                    <Link href="/butchery" className="transition-colors duration-300">Butchery</Link>
                    <Link href="/reservations" className="transition-colors duration-300">Reservations</Link>
                    <Link href="/contact" className="transition-colors duration-300">Contact</Link>
                </div>

                <div className="hidden md:block">
                    <Link href="/reservations">
                        <button className={`font-body font-light text-xs bg-transparent border rounded-sm px-6 py-2.5 transition-all duration-300 ease-in-out tracking-widest uppercase hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] ${buttonClass}`}>
                            Book a Table
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden z-50 transition-colors duration-300 ${shouldUseBlackText ? 'text-black' : 'text-gold'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[100] h-screen w-screen bg-black flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                {/* Close Button position absolute top right */}
                <button
                    className="absolute top-8 right-6 text-gold"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center gap-10 font-display text-3xl tracking-widest text-cream uppercase">
                    <Link href="/menu" onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">Menu</Link>
                    <Link href="/butchery" onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">Butchery</Link>
                    <Link href="/reservations" onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">Reservations</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">Contact</Link>

                    <div className="mt-8">
                        <Link href="/reservations" onClick={() => setIsOpen(false)}>
                            <button className="font-body font-light text-base text-gold border border-gold/40 rounded-sm px-10 py-4 tracking-widest uppercase bg-gold/5">
                                Book a Table
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
