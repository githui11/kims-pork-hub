"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useSpring, type MotionValue } from "framer-motion";

const FRAME_COUNT = 192;
const IMAGES_PATH = "/images/sequence";
const INITIAL_FRAMES = 10; // Load first 10 frames immediately for fast initial render
const BATCH_SIZE = 20; // Load remaining frames in batches

export default function PorkCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<(HTMLImageElement | null)[]>(() =>
        new Array(FRAME_COUNT).fill(null)
    );
    const [framesLoaded, setFramesLoaded] = useState(0);
    const [initialReady, setInitialReady] = useState(false);
    const loadedRef = useRef<Set<number>>(new Set());

    // Smooth out the scroll progress for buttery animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Load a single frame
    const loadFrame = useCallback((index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
            if (loadedRef.current.has(index)) {
                return;
            }
            loadedRef.current.add(index);

            const img = new Image();
            const paddedIndex = index.toString().padStart(3, "0");
            img.src = `${IMAGES_PATH}/frame_${paddedIndex}.jpg`;

            img.onload = () => {
                setImages(prev => {
                    const newImages = [...prev];
                    newImages[index] = img;
                    return newImages;
                });
                setFramesLoaded(prev => prev + 1);
                resolve(img);
            };
        });
    }, []);

    // Load initial frames immediately, then batch load the rest
    useEffect(() => {
        const loadInitialFrames = async () => {
            // Load first batch for immediate display
            const initialPromises = [];
            for (let i = 0; i < INITIAL_FRAMES; i++) {
                initialPromises.push(loadFrame(i));
            }
            await Promise.all(initialPromises);
            setInitialReady(true);

            // Load remaining frames in background batches (using requestIdleCallback for better perf)
            const loadRemainingFrames = () => {
                let currentBatch = INITIAL_FRAMES;

                const loadBatch = () => {
                    const batchEnd = Math.min(currentBatch + BATCH_SIZE, FRAME_COUNT);
                    for (let i = currentBatch; i < batchEnd; i++) {
                        loadFrame(i);
                    }
                    currentBatch = batchEnd;

                    if (currentBatch < FRAME_COUNT) {
                        // Use requestIdleCallback if available, otherwise setTimeout
                        if ('requestIdleCallback' in window) {
                            requestIdleCallback(loadBatch, { timeout: 100 });
                        } else {
                            setTimeout(loadBatch, 50);
                        }
                    }
                };

                loadBatch();
            };

            // Start loading remaining frames after a brief delay to let UI settle
            setTimeout(loadRemainingFrames, 100);
        };

        loadInitialFrames();
    }, [loadFrame]);

    // Draw to canvas
    useEffect(() => {
        const render = (val: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Calculate current frame index
            // Map 0-1 to 0-(totalFrames-1)
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(val * FRAME_COUNT)
            );

            // Find the nearest loaded frame if current isn't available
            let img = images[frameIndex];
            if (!img || !img.complete) {
                // Look for nearest loaded frame (prefer earlier frames)
                for (let offset = 1; offset < FRAME_COUNT; offset++) {
                    const earlier = frameIndex - offset;
                    const later = frameIndex + offset;
                    if (earlier >= 0 && images[earlier]?.complete) {
                        img = images[earlier];
                        break;
                    }
                    if (later < FRAME_COUNT && images[later]?.complete) {
                        img = images[later];
                        break;
                    }
                }
            }
            if (!img || !img.complete) return;

            // Responsiveness & High DPI Support
            const dpr = window.devicePixelRatio || 1;

            // Set the internal buffer size to match physical pixels
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            // Ensure the drawing context uses high quality smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Calculate scale based on the high-res buffer
            // We want to "contain" the image within the canvas
            const scale = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );

            const w = img.width * scale;
            const h = img.height * scale;
            const x = (canvas.width - w) / 2;
            const y = (canvas.height - h) / 2;

            // No need to scale ctx if we calculated w/h/x/y against the scaled canvas dimensions directly
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, w, h);
        };

        // Initial render
        render(smoothProgress.get());

        // Subscribe to spring changes
        const unsubscribe = smoothProgress.on("change", (v) => {
            render(v);
        });

        // Handle resize
        const handleResize = () => render(smoothProgress.get());
        window.addEventListener("resize", handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, smoothProgress, framesLoaded]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 h-screen w-full bg-black pointer-events-none"
            />
            {/* Loading indicator - fades out when initial frames are ready */}
            {!initialReady && (
                <div className="fixed inset-0 z-[1] flex items-center justify-center bg-black">
                    <div className="text-gold/60 text-xs font-body tracking-widest uppercase animate-pulse">
                        Loading...
                    </div>
                </div>
            )}
        </>
    );
}
