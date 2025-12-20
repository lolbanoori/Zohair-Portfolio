import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, Layers, Box, Cpu, CornerRightDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import dummyVideo from '../../assets/dungeon-props/Cinematic Trailer/dummy_video.mp4';
import atlasImage from '../../assets/dungeon-props/Atlas_Image.png';
import chestRender from '../../assets/dungeon-props/Chests/Thumbnail_Chests.png';

// --- NEW ASSET IMPORTS ---
import thumbTable from '../../assets/dungeon-props/Table & Chairs/Thumbnail_Table & Chairs.png';
import thumbBarrels from '../../assets/dungeon-props/Barrels & Crates/Thumbnail_Barrels & Crates.png';
import thumbChests from '../../assets/dungeon-props/Chests/Thumbnail_Chests.png';
import thumbScrolls from '../../assets/dungeon-props/Scrolls/Thumbnail_Scrolls.png';
import thumbBooks from '../../assets/dungeon-props/Books/Thumbnail_Books.png';
import thumbTreasure from '../../assets/dungeon-props/Treasure/Thumbnail_Treasure.png';
import thumbUtensils from '../../assets/dungeon-props/Utensils/Thumbnail_Utensils.png';
import itemPlaceholder from '../../assets/dungeon-props/Thumbnail_Image_.png';

// Category Image Mapping
const categoryImages = {
    "Tables & Chairs": thumbTable,
    "Barrels & Crates": thumbBarrels,
    "Chests": thumbChests,
    "Scrolls": thumbScrolls,
    "Books": thumbBooks,
    "Treasure": thumbTreasure,
    "Utensils": thumbUtensils
};

// Determine the project data
const projectData = projects.find(p => p.id === 'dungeon-props');

// Topology Slider now accepts props for images, and forwards a ref for scrolling
const TopologySlider = React.forwardRef(({ renderImage, wireframeImage }, ref) => {
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
        <div ref={ref} className="w-full max-w-4xl mx-auto my-20 scroll-mt-24">
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
                {/* Image 1: Wireframe (Background - Left Side Reveal) */}
                <img
                    src={wireframeImage}
                    alt="Wireframe"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Image 2: Render (Foreground - Clipped - Right Side Reveal) */}
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={renderImage}
                        alt="Render"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
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
});

const ImmersiveShowcase = ({ title, description }) => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    // Create a taller scroll track to accommodate the sequence
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- SCROLL ANIMATION CHOREOGRAPHY ---

    // Phases:
    // 0.0 - 0.2:  Text moves to park position (Middle-Top). Atlas stays 100%. Video hidden.
    // 0.2 - 0.35: Text waits. Video rises and fades in. Atlas begins fade out.
    // 0.35- 0.45: "THE PUSH": Video rises to final spot, pushing Text out/up.
    // 0.45- 0.9:  Video Scrubbing.

    // 1. TEXT TRANSFORMS
    // Moves up to -25vh by 0.2, STAYS there until 0.35, then moves gently to -60vh by 0.45 (Smooth Push)
    // Adjusted to -25vh to prevent overlap with top nav bar
    const textY = useTransform(scrollYProgress,
        [0, 0.2, 0.35, 0.45],
        ['0vh', '-25vh', '-25vh', '-60vh']
    );
    // Scales down a bit then holds
    const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    // Stays visible until the push starts, then fades out as it's being pushed
    const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);

    // 2. ATLAS TRANSFORMS
    // Stays 100% until 0.2 (when video starts arriving), then dims
    const atlasOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0.15]);

    // 3. VIDEO TRANSFORMS
    // Comes alive at 0.2. Rises from bottom.
    // At 0.35 it's just below text. By 0.45 it's at center (0).
    const videoY = useTransform(scrollYProgress,
        [0, 0.2, 0.35, 0.45],
        ['30vh', '30vh', '10vh', '0vh']
    );
    const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [0, 0, 1]); // Fade in 20-35%
    const videoScale = useTransform(scrollYProgress, [0, 0.45], [0.85, 1]); // Subtle growth

    // 4. SCRUBBING LOGIC
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!videoRef.current || isNaN(videoRef.current.duration)) return;

        const scrubStart = 0.45;
        const scrubEnd = 0.9;

        if (latest >= scrubStart && latest <= scrubEnd) {
            const progress = (latest - scrubStart) / (scrubEnd - scrubStart);
            videoRef.current.currentTime = progress * videoRef.current.duration;
        } else if (latest < scrubStart) {
            videoRef.current.currentTime = 0;
        } else if (latest > scrubEnd) {
            videoRef.current.currentTime = videoRef.current.duration;
        }
    });

    return (
        <div ref={containerRef} className="h-[400vh] relative mb-24">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {/* LAYER 1: ATLAS BACKGROUND */}
                <motion.div
                    style={{ opacity: atlasOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={atlasImage}
                        alt="Dungeon Props Atlas"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* LAYER 2: HERO TEXT - PARK & PUSH */}
                <motion.div
                    style={{ y: textY, scale: textScale, opacity: textOpacity }}
                    className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                >
                    <div className="text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow-lg shadow-black/50 drop-shadow-2xl">
                            {title}
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
                            {description}
                        </p>
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                            className="mt-12 animate-bounce text-white/50 text-sm font-light tracking-widest uppercase"
                        >
                            Scroll to Explore
                        </motion.div>
                    </div>
                </motion.div>

                {/* LAYER 3: VIDEO OVERLAY */}
                <motion.div
                    style={{ opacity: videoOpacity, scale: videoScale, y: videoY }}
                    className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center" // Centered video
                >
                    <div className="w-[90%] h-[80%] relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            preload="auto"
                            muted
                            playsInline
                            src={dummyVideo}
                        />
                        {/* Label */}
                        <div className="absolute bottom-10 left-0 right-0 text-center z-40">
                            <motion.p
                                style={{ opacity: useTransform(scrollYProgress, [0.45, 0.5, 0.85, 0.9], [0, 1, 1, 0]) }}
                                className="text-white/70 text-sm font-light tracking-widest uppercase bg-black/30 backdrop-blur-sm inline-block px-4 py-2 rounded-full"
                            >
                                Flythrough Trailer
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const DungeonProps = () => {
    // Interactive State for Topology Slider
    const [activeTopology, setActiveTopology] = useState({
        render: thumbChests,
        wireframe: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale"
    });

    // Auto-scroll ref
    const topologyRef = useRef(null);

    if (!projectData) return <div>Project Not Found</div>;

    const dummyWireframe = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&grayscale";

    const handleAssetClick = (category) => {
        setActiveTopology({
            render: categoryImages[category] || itemPlaceholder,
            wireframe: dummyWireframe
        });

        // Auto-scroll to topology section
        if (topologyRef.current) {
            topologyRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-0">
            {/* Navigation */}
            <div className="fixed top-8 left-4 z-50">
                <Link to="/" className="p-3 bg-white/10 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all block text-white border border-white/20 group">
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Immersive Showcase (Replaces Hero + Cinema Section) */}
            <ImmersiveShowcase
                title={projectData.title}
                description={projectData.description}
            />

            {/* Asset Taxonomy Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10 bg-gray-50 dark:bg-gray-900 pt-12">
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
                            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow group"
                        >
                            {/* Category Thumbnail Header */}
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={categoryImages[feature.category] || itemPlaceholder}
                                    alt={feature.category}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <h3 className="text-xl font-bold text-white">
                                        {feature.category}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <ul className="space-y-3">
                                    {feature.items.map((item, i) => (
                                        <li
                                            key={i}
                                            onClick={() => handleAssetClick(feature.category)}
                                            className="relative group/item flex items-center text-gray-600 dark:text-gray-300 text-sm cursor-pointer"
                                        >
                                            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2 group-hover/item:bg-primary transition-colors"></div>
                                            <span className="group-hover/item:text-primary transition-colors">{item}</span>

                                            {/* Hover Popup */}
                                            <div className="absolute left-0 bottom-full mb-4 w-80 aspect-video bg-gray-900/90 backdrop-blur-md rounded-xl border border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.5)] overflow-hidden opacity-0 translate-y-4 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-300 pointer-events-none z-50">
                                                <img
                                                    src={itemPlaceholder}
                                                    alt={item}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center">
                                                    <span className="text-xs text-white font-medium">Placeholder</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}

                    {/* VISUAL HINT - Fills empty slot */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -10 }}
                        whileInView={{ opacity: 1, rotate: 6 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden lg:flex flex-col items-center justify-center p-6 text-center transform translate-y-8"
                    >
                        <div style={{ fontFamily: '"Patrick Hand", cursive' }} className="text-3xl text-gray-400 dark:text-gray-500 leading-tight">
                            Click on an <br />
                            asset to view <br />
                            it in the <br />
                            Topology Inspector!
                        </div>
                        <CornerRightDown className="w-12 h-12 text-gray-400 dark:text-gray-500 mt-4 animate-bounce" />
                    </motion.div>
                </div>
            </div>

            {/* Topology Section */}
            <TopologySlider
                ref={topologyRef}
                renderImage={activeTopology.render}
                wireframeImage={activeTopology.wireframe}
            />

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
