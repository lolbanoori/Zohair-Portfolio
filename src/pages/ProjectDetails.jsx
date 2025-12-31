import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { projects } from '../data/projects';
import ComparisonSlider from '../components/ui/ComparisonSlider';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id || p.id === Number(id)); // Handle string/number IDs
    const containerRef = useRef(null);

    // Parallax Scroll Hooks
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Text moves slower
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);   // Background moves slightly

    if (!project) {
        return <div className="h-screen flex items-center justify-center text-white">Project not found</div>;
    }

    return (
        <div className="bg-light dark:bg-dark min-h-screen text-dark dark:text-light">
            {/* --- PARALLAX HERO --- */}
            <div ref={containerRef} className="relative h-screen overflow-hidden flex items-center justify-center">

                {/* Background Image (Atlas) */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ y: yBg }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay */}
                    <img
                        src={project.image} // Using the main image (should be Atlas for dungeon)
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Hero Text */}
                <motion.div
                    style={{ y: yText }}
                    className="relative z-20 text-center px-4 max-w-4xl mx-auto"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow-lg shadow-black/50 drop-shadow-2xl"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md"
                    >
                        {project.description}
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce"
                >
                    <ArrowDown className="text-white/70" size={32} />
                </motion.div>
            </div>

            {/* --- VIDEO DISPLAY SECTION --- */}
            {project.videoUrl && (
                <div className="py-24 bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }} // Trigger slightly before center
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                        >
                            <iframe
                                src={project.videoUrl} // Note: This assumes local file or embeddable URL. For local MP4, use video tag.
                                title="Project Trailer"
                                className="w-full h-full object-cover"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            {/* Fallback for local video if iframe isn't ideal for raw mp4 */}
                            {project.videoUrl.endsWith('.mp4') && (
                                <video
                                    src={project.videoUrl}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    controls
                                    muted
                                    playsInline
                                />
                            )}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* --- INTERACTIVE GALLERY (Topology Sliders) --- */}
            {project.gallery && project.gallery.length > 0 && (
                <div className="py-24 bg-light dark:bg-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-center mb-16 text-primary"
                        >
                            Asset Collection
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {project.gallery.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="flex flex-col space-y-4"
                                >
                                    {/* Slider Container */}
                                    <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
                                        <ComparisonSlider
                                            topImage={item.wireframe}
                                            bottomImage={item.render}
                                            topLabel="Wireframe"
                                            bottomLabel="Render"
                                        />
                                    </div>

                                    {/* Optional Caption (if we had item names) */}
                                    <div className="text-center text-gray-500 text-sm font-medium uppercase tracking-widest">
                                        Asset {index + 1}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Content Placeholder for next phases (Features, etc.) */}
            <div className="h-40 flex items-center justify-center text-gray-500">
                More content coming soon...
            </div>
        </div>
    );
};

export default ProjectDetails;
