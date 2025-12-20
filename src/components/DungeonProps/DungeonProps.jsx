import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, Layers, Box, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import dummyVideo from '../../assets/dungeon-props/Cinematic Trailer/dummy_video.mp4';

// Determine the project data
const projectData = projects.find(p => p.id === 'dungeon-props');

const TopologySlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-20">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <Layers className="w-6 h-6 text-primary" />
                Topology Inspector
            </h3>
            <div
                ref={containerRef}
                className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                {/* Image 1: Render (Background) */}
                <img
                    src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&q=80&w=1200"
                    alt="Render"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Image 2: Wireframe (Foreground - Clipped) */}
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale"
                        alt="Wireframe"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay to simulate wireframe look if using placeholder */}
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10">Render</div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10">Wireframe</div>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
                Drag the slider to inspect mesh topology
            </p>
        </div>
    );
};

const ScrollVideo = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Phase 1: Scale & Fade In (0% - 20% of scroll)
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);

    // Phase 2: Play Video (20% - 90% of scroll)
    // We map scroll range 0.2-0.9 to video duration 0-1 (normalized)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!videoRef.current || isNaN(videoRef.current.duration)) return;

        const videoStart = 0.2;
        const videoEnd = 0.9;

        if (latest >= videoStart && latest <= videoEnd) {
            const progress = (latest - videoStart) / (videoEnd - videoStart);
            videoRef.current.currentTime = progress * videoRef.current.duration;
        } else if (latest < videoStart) {
            videoRef.current.currentTime = 0;
        } else if (latest > videoEnd) {
            videoRef.current.currentTime = videoRef.current.duration;
        }
    });

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
                <motion.div
                    style={{ scale, opacity }}
                    className="w-full h-full relative"
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        preload="auto"
                        muted
                        playsInline
                        // Use a placeholder video for now that's long enough to scrub
                        src={dummyVideo}
                    />
                    <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-10">
                        <motion.p
                            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [1, 0, 0, 1]) }}
                            className="text-white/50 text-sm font-light tracking-widest uppercase"
                        >
                            Scroll to Explore
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const DungeonProps = () => {
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    if (!projectData) return <div>Project Not Found</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            {/* Navigation */}
            <div className="fixed top-24 left-4 z-50">
                <Link to="/" className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all block text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 group">
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&q=80&w=1920"
                        alt="Dungeon Props Atlas"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="relative z-20 text-center px-4 max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow-lg shadow-black/50 drop-shadow-2xl">
                        {projectData.title}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
                        {projectData.description}
                    </p>
                </motion.div>
            </div>

            {/* Cinema Video Section */}
            {/* Scroll-Driven Cinema Section */}
            <ScrollVideo />

            {/* Asset Taxonomy Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                        <Box className="w-8 h-8 text-primary" />
                        Asset Collection
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A comprehensive library of modular assets designed for ease of use and maximum flexibility.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectData.features?.map((feature, idx) => (
                        <motion.div
                            key={feature.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-bold text-primary mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                                {feature.category}
                            </h3>
                            <ul className="space-y-2">
                                {feature.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Topology Section */}
            <TopologySlider />

            {/* Technical Specs / Footer */}
            <div className="bg-white dark:bg-gray-800 py-16 mt-12 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-12 flex items-center justify-center gap-2 text-gray-900 dark:text-white">
                        <Cpu className="w-6 h-6 text-primary" />
                        Technical Specifications
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="p-4">
                            <div className="text-primary font-bold text-2xl mb-2">4K</div>
                            <div className="text-gray-500 text-sm">PBR Textures</div>
                        </div>
                        <div className="p-4">
                            <div className="text-primary font-bold text-2xl mb-2">FBX/OBJ</div>
                            <div className="text-gray-500 text-sm">Universal Formats</div>
                        </div>
                        <div className="p-4">
                            <div className="text-primary font-bold text-2xl mb-2">LODs</div>
                            <div className="text-gray-500 text-sm">Optimized Levels</div>
                        </div>
                        <div className="p-4">
                            <div className="text-primary font-bold text-2xl mb-2">Game Ready</div>
                            <div className="text-gray-500 text-sm">Unity & Unreal</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DungeonProps;
