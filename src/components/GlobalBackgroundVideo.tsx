"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, memo } from "react";

const VideoPlayer = memo(() => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain md:object-cover bg-black"
        >
            <source src="/videos/menu-background.mp4" type="video/mp4" />
        </video>
    );
});

VideoPlayer.displayName = "VideoPlayer";

export default function GlobalBackgroundVideo() {
    const pathname = usePathname();
    const isMenuPage = pathname === "/menu";

    return (
        <div
            className={`fixed inset-0 z-0 bg-black transition-opacity duration-700 ease-in-out ${isMenuPage ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <VideoPlayer />
            <div className="absolute inset-0 bg-black/80" />
        </div>
    );
}
