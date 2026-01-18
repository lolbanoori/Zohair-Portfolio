import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/**
 * HeroSection Component
 * 
 * Displays the project title, description, and handles the "scrollytelling" video reveal.
 * Transitions from a static Atlas image to a full-screen video based on scroll position.
 * 
 * @param {Object} project - The project data object.
 * @param {string} project.title - Project title.
 * @param {string} project.description - Project description.
 * @param {string} project.image - Background Atlas image URL.
 * @param {string} project.videoUrl - Cinematic trailer URL.
 */
const HeroSection = ({ project }) => {
    const heroRef = useRef(null);
    const videoRef = useRef(null);

    // Initial video setup: Pause and reset
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [project]);

    // --- PARALLAX & ANIMATION HOOKS ---
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // 1. Smooth Scroll Progress for Video scrubbing
    const smoothVideoProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        mass: 1
    });

    // --- ANIMATION SEQUENCE DEFINITIONS ---
    // Text fades out and moves up
    const headerY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-50%"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

    // Image fades out as Video fades in
    const atlasOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
    const videoOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

    // Sync Video CurrentTime with Scroll
    useMotionValueEvent(smoothVideoProgress, "change", (latest) => {
        if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
            // Animation happens between 15% and 100% of the section scroll
            const startScroll = 0.15;
            const endScroll = 1.0;
            let progress = (latest - startScroll) / (endScroll - startScroll);
            progress = Math.max(0, Math.min(1, progress));

            const videoTime = progress * videoRef.current.duration;
            if (isFinite(videoTime)) {
                videoRef.current.currentTime = videoTime;
            }
        }
    });

    return (
        <div ref={heroRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

                {/* 1. Background Atlas Image (Static Fallback) */}
                <motion.div
                    style={{ opacity: atlasOpacity }}
                    className="absolute inset-0 z-0 bg-black"
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* 2. Header Text */}
                <motion.div
                    style={{ y: headerY, scale: headerScale, opacity: headerOpacity }}
                    className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-[-10vh]"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tight drop-shadow-2xl"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed shadow-black drop-shadow-md"
                    >
                        {project.description}
                    </motion.p>
                </motion.div>

                {/* 3. Trailer Video (Fullscreen, Scrubbable) */}
                <motion.div
                    style={{ opacity: videoOpacity }}
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black"
                >
                    <div className="w-full h-full relative">
                        {project.videoUrl ? (
                            <>
                                {project.videoUrl.endsWith('.mp4') ? (
                                    <video
                                        ref={videoRef}
                                        src={project.videoUrl}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        muted
                                        playsInline
                                        preload="auto"
                                    />
                                ) : (
                                    <iframe
                                        src={project.videoUrl}
                                        title="Project Trailer"
                                        className="w-full h-full object-cover"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-white/50">
                                No Trailer Available
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: headerOpacity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce"
                >
                    <div className="flex flex-col items-center gap-2 text-white/70">
                        <span className="text-xs uppercase tracking-widest">Scroll to Play</span>
                        <ArrowDown size={24} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
