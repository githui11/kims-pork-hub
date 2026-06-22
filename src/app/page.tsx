"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue, AnimatePresence } from "framer-motion";
import PorkCanvas from "@/components/PorkCanvas";
import Link from "next/link";
import { Star, Quote, Sun, Flame, UtensilsCrossed, ChevronDown, ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";

// --- Data ---

type Review = { quote: string; author: string; rating: number };

const REVIEWS: Review[] = [
  { quote: "Best pork in Kenol, hands down.", author: "Sarah W.", rating: 5 },
  { quote: "The crackling alone is worth the drive from Thika.", author: "James M.", rating: 5 },
  { quote: "Ribs are always tender, never dry — even when we show up late.", author: "Wanjiru K.", rating: 5 },
  { quote: "Took the whole office here after a long week. Service was fast and the meat was still sizzling when it landed on the table.", author: "Brian O.", rating: 4 },
  { quote: "Kachumbari and ugali on the side make it a full meal. This is our Sunday spot now.", author: "Esther N.", rating: 5 },
  { quote: "Ordered 10kg for a family gathering — gone in under an hour. Quality you can taste.", author: "Peter K.", rating: 5 },
];

// --- Components ---

function Beat({
  children,
  progress,
  range
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;

  const fadeInStart = start;
  const fadeInEnd = start + 0.05;
  const fadeOutStart = end - 0.05;
  const fadeOutEnd = end;

  const opacity = useTransform(progress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [20, 0, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl text-center pointer-events-none z-20 px-6"
    >
      {children}
    </motion.div>
  );
}

function ReviewsCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const review = REVIEWS[active];

  return (
    <div className="max-w-2xl mx-auto px-6">
      <div className="flex items-center justify-center gap-2 md:gap-6">
        <button
          onClick={() => setActive((p) => (p - 1 + REVIEWS.length) % REVIEWS.length)}
          aria-label="Previous review"
          className="hidden sm:flex shrink-0 text-gold/40 hover:text-gold transition-colors"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="flex-1 min-w-0 max-w-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-10 bg-charcoal border border-gold/10 rounded-md text-center"
            >
              <Quote className="text-gold/30 mb-4 mx-auto" size={40} />
              <p className="text-lg md:text-xl text-light-gray/80 mb-6 font-display font-extralight leading-relaxed tracking-[0.05em]">
                "{review.quote}"
              </p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="text-gold" fill={s < review.rating ? "#D4AF37" : "none"} size={18} />
                ))}
              </div>
              <p className="text-gold/50 text-xs tracking-widest uppercase font-body font-light">{review.author}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => setActive((p) => (p + 1) % REVIEWS.length)}
          aria-label="Next review"
          className="hidden sm:flex shrink-0 text-gold/40 hover:text-gold transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-gold" : "w-1.5 bg-gold/30 hover:bg-gold/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourcingRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade canvas out as the sourcing section scrolls into view — eliminates dark canvas bleed
  const { scrollYProgress: sourcingProgress } = useScroll({
    target: sourcingRef,
    offset: ["start end", "start start"]
  });
  const canvasOpacity = useTransform(sourcingProgress, [0.1, 0.9], [1, 0]);

  // Hero content fades out as user scrolls
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);

  // Footer bar stays visible until hero section ends
  const footerOpacity = useTransform(scrollYProgress, [0, 0.74, 0.82], [1, 1, 0]);

  return (
    <main className="bg-black min-h-screen">
      {/* 1) Scrollytelling Hero */}
      <div ref={containerRef} className="relative h-[135vh] md:h-[150vh]">
        {/* The Canvas (Fixed) */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <motion.div style={{ opacity: canvasOpacity }} className="w-full h-full relative">
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none" />
            <PorkCanvas scrollYProgress={scrollYProgress} />
          </motion.div>

          {/* Static Hero Content - Visible on Load */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {/* Main Title - sits closer to the nav on mobile (tall, narrow viewports); 40% anchor kept for tablet/desktop where short viewports need the clearance */}
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[max(170px,34%)] sm:top-[max(150px,40%)] text-center w-full px-6">

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[clamp(4rem,min(10vw,14vh),8rem)] font-display font-light mb-3 drop-shadow-xl tracking-[-0.05em] leading-[0.95] lowercase text-gold"
              >
                Kim's<br />Pork Hub
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[clamp(0.7rem,1vw,0.9rem)] font-body font-extralight tracking-[0.3em] uppercase text-cream/70 mb-3"
              >
                Kenol Town's Finest Pork
              </motion.p>
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-[10px] font-body font-light tracking-[0.4em] text-gold/60 uppercase"
              >
                Est. 2025
              </motion.span>
            </div>

          </motion.div>

          {/* Persistent CTA Buttons - stays visible during scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ opacity: footerOpacity }}
            className="absolute bottom-44 sm:bottom-24 left-0 right-0 z-30 flex justify-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/menu" className="bg-gold hover:bg-gold-bright text-charcoal font-body font-medium text-xs tracking-widest px-8 py-4 rounded-sm transition-all uppercase shadow-lg">
                View Menu
              </Link>
              <Link href="/reservations" className="border border-gold/40 hover:border-gold text-cream font-body font-light text-xs tracking-widest px-8 py-4 rounded-sm transition-all uppercase hover:bg-gold/10 backdrop-blur-sm">
                Order Now
              </Link>
            </div>
          </motion.div>

          {/* Persistent Footer Bar - stays visible during scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ opacity: footerOpacity }}
            className="absolute bottom-0 left-0 right-0 p-6 z-30"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Location */}
              <div className="flex items-center gap-2 text-cream/60 md:flex-1">
                <MapPin size={14} />
                <span className="text-xs font-body font-extralight tracking-[0.15em]">Opposite Shell Petrol Station, Kenol</span>
              </div>

              {/* Scroll Indicator - centered on desktop */}
              <div className="flex flex-col items-center gap-2 md:flex-1">
                <span className="text-[10px] font-body font-extralight tracking-[0.3em] uppercase text-cream/40">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown size={20} className="text-gold/60" />
                </motion.div>
              </div>

              {/* Phone */}
              <a href="tel:0701087561" className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors md:flex-1 md:justify-end">
                <Phone size={14} />
                <span className="text-xs font-body font-extralight tracking-[0.15em]">0701 087 561</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Beats - appear on scroll - adjusted timing for smooth transitions */}

        {/* Beat A: starts after hero is fully gone at 18% */}
        <Beat progress={scrollYProgress} range={[0.20, 0.35]}>
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-display font-light mb-6 leading-[0.95] tracking-[-0.05em] lowercase text-gold">
            The Gold<br />Standard
          </h2>
          <p className="text-[clamp(0.85rem,1.1vw,1rem)] text-light-gray/80 font-body font-extralight max-w-2xl mx-auto leading-relaxed tracking-[0.2em] uppercase">
            Crispy skin. Tender meat. Flavors you won't forget.
          </p>
        </Beat>

        {/* Beat B: starts after Beat A ends */}
        <Beat progress={scrollYProgress} range={[0.38, 0.52]}>
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-display font-light mb-6 leading-[0.95] tracking-[-0.05em] lowercase text-cream">
            Worth<br />Coming Back
          </h2>
          <p className="text-[clamp(0.85rem,1.1vw,1rem)] text-light-gray/80 font-body font-extralight max-w-2xl mx-auto leading-relaxed tracking-[0.2em] uppercase">
            Once you taste it, you'll understand why our customers keep returning.
          </p>
        </Beat>

        {/* Beat C: starts after Beat B ends */}
        <Beat progress={scrollYProgress} range={[0.55, 0.68]}>
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-display font-light mb-6 leading-[0.95] tracking-[-0.05em] lowercase text-gold">
            Culinary<br />Excellence
          </h2>
          <p className="text-[clamp(0.85rem,1.1vw,1rem)] text-light-gray/80 font-body font-extralight max-w-2xl mx-auto leading-relaxed tracking-[0.2em] uppercase">
            Premium cuts, expertly prepared. Taste the difference quality makes.
          </p>
        </Beat>

        {/* Beat D: starts after Beat C ends */}
        <Beat progress={scrollYProgress} range={[0.68, 0.80]}>
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-display font-light mb-6 leading-[0.95] tracking-[-0.05em] lowercase text-cream">
            Free Delivery
          </h2>
          <p className="text-[clamp(0.85rem,1.1vw,1rem)] text-light-gray/80 font-body font-extralight max-w-2xl mx-auto leading-relaxed tracking-[0.2em] uppercase mb-4">
            Within Kenol Town
          </p>
          <a href="tel:0701087561" className="inline-block text-gold text-2xl md:text-3xl font-display font-light tracking-[-0.02em] hover:text-gold-bright transition-colors pointer-events-auto">
            0701 087 561
          </a>
        </Beat>
      </div>

      {/* Sourcing Story Section */}
      <section ref={sourcingRef} className="relative z-30 bg-charcoal py-24 px-6 border-t border-gold/10 -mt-[30vh] md:-mt-[40vh]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-gold/60 font-body text-xs tracking-widest block mb-6 uppercase font-light">Ethically Sourced</span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-cream mb-8 tracking-[-0.03em] lowercase">
            From Our Farm<br /><span className="text-gold">To Your Fork</span>
          </h2>
          <p className="text-light-gray/80 font-body font-extralight text-sm md:text-base leading-loose tracking-[0.05em] mb-10 max-w-2xl mx-auto">
            Every cut served at Kim's Pork Hub is sourced directly from our own <span className="text-gold">Kim's Pig Farm</span>. We believe in complete transparency and ethical farming. Raised with care and passion, our pigs are the heart of our story, ensuring that you get nothing but the freshest, highest quality pork on your plate.
          </p>

          <a
            href="https://www.tiktok.com/@kims.pig.farm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-gold hover:text-gold-bright transition-colors group"
          >
            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
              {/* Custom TikTok Icon SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
            <span className="font-body text-xs tracking-widest uppercase border-b border-transparent group-hover:border-gold pb-0.5">Follow our journey on TikTok</span>
          </a>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative z-30 h-screen overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center px-6"
          >
            <h2 className="text-5xl md:text-7xl font-display font-light text-gold mb-6 tracking-[-0.05em] lowercase">
              Fresh From<br />the Grill
            </h2>
            <p className="text-sm text-cream/70 font-body font-extralight tracking-[0.2em] uppercase max-w-xl mx-auto">
              Watch us work our magic
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-30 bg-black py-32 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Source", desc: "Fresh pork from local farms. We know exactly where our meat comes from.", icon: <Sun size={40} className="text-burnt-orange" strokeWidth={1.5} /> },
              { title: "Fire", desc: "Slow-roasted over open flame until the skin crackles and the meat melts in your mouth.", icon: <Flame size={40} className="text-burnt-orange" strokeWidth={1.5} /> },
              { title: "Skill", desc: "Expert butchers cut every piece just right for maximum tenderness and flavor.", icon: <UtensilsCrossed size={40} className="text-burnt-orange" strokeWidth={1.5} /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group p-10 bg-charcoal rounded-md border border-gold/20 hover:border-gold hover:-translate-y-1 transition-all duration-500 text-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <div className="mb-6 flex justify-center">{item.icon}</div>
                <h3 className="text-4xl font-display font-light text-gold mb-4 tracking-[-0.05em] lowercase">
                  {item.title}
                </h3>
                <div className="h-[1px] w-12 bg-gold/30 mx-auto mb-6" />
                <p className="text-light-gray/70 font-body font-extralight text-sm leading-relaxed tracking-[0.15em]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Social Proof */}
      <section className="relative z-30 bg-black py-24">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-gold/60 font-body text-xs tracking-widest block mb-5 uppercase font-light">Acclaim</span>
          <h2 className="text-5xl md:text-7xl font-display font-light text-gold tracking-[-0.05em] lowercase">Guest Impressions</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mt-8" />
        </div>

        {/* Reviews Carousel */}
        <ReviewsCarousel />
      </section>

      {/* 4) The Closer */}
      <section className="relative z-30 py-32 bg-charcoal text-center px-6 border-t border-gold/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-display font-light text-gold mb-8 tracking-[-0.05em] lowercase">
            Join the Feast
          </h2>
          <p className="text-sm text-light-gray/60 mb-12 font-body font-extralight max-w-2xl mx-auto leading-relaxed tracking-[0.2em] uppercase">
            Order now and taste what everyone's talking about.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/reservations" className="font-body font-medium text-xs text-charcoal bg-gold hover:bg-gold-bright rounded-sm px-10 py-4 transition-all duration-300 ease-in-out tracking-widest uppercase shadow-lg">
              Order Now
            </Link>
            <Link href="/menu" className="text-gold/70 hover:text-gold transition-all font-body text-xs border-b border-gold/30 hover:border-gold pb-1 tracking-widest uppercase font-light">
              View the Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="relative z-30 bg-black py-12 border-t border-gold/10 text-center text-medium-gray/50 text-xs tracking-widest font-body font-light uppercase">
        <p>&copy; {new Date().getFullYear()} Kim's Pork Hub. All rights reserved.</p>
      </footer>
    </main>
  );
}
