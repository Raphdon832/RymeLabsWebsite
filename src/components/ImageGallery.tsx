"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll implementation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPos = scrollContainer.scrollLeft;
    const speed = 1; // Pixels per frame

    const scroll = () => {
      if (!isPaused) {
        scrollPos += speed;
        // Reset scroll when we reach the end of the first set of images
        // We assume the content is duplicated, so scrollWidth / 2 is the reset point
        if (scrollPos >= scrollContainer.scrollWidth / 2) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      } else {
        // Sync our tracker with actual scroll position if user is dragging
        scrollPos = scrollContainer.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <>
      <div className="w-full overflow-hidden py-10 md:py-20 bg-zinc-900/20 border-y border-white/5">
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing -mx-4 md:mx-0"
            style={{ scrollBehavior: "auto" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className="flex gap-8 px-4">
                {/* Triple the images to ensure smooth infinite scrolling even on wide screens */}
                {[...images, ...images, ...images].map((src, index) => (
                    <div
                        key={index}
                        className="relative w-[300px] md:w-[400px] aspect-[16/10] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group/image"
                        onClick={() => setSelectedImage(src)}
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${index}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                            sizes="(max-width: 768px) 300px, 400px"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                            <span className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                                View
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.7}
                onDragEnd={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                  if (info.offset.y > 100) {
                    setSelectedImage(null);
                  }
                }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] pointer-events-none">
                    <Image
                        src={selectedImage}
                        alt="Gallery preview"
                        fill
                        className="object-contain"
                        quality={100}
                        priority
                    />
                </div>
                
                <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-md border border-white/10 z-50 pointer-events-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
