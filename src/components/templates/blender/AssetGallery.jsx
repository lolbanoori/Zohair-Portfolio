import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Box, Scan } from 'lucide-react';

/**
 * AssetGallery Component
 * 
 * Displays a grid of asset categories. 
 * Clicking a category opens a split-view modal to browse individual items.
 * 
 * @param {Array} features - Array of category objects { category, image, items: [{name, image}] }.
 * @param {Function} onInspect - Callback function (asset) => void. Called when "Inspect Topology" is clicked.
 */
const AssetGallery = ({ features, onInspect }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [previewAsset, setPreviewAsset] = useState(null);

    const handleCategorySelect = (feature) => {
        setSelectedCategory(feature);
        // Initialize preview with the first item in the category
        if (feature.items && feature.items.length > 0) {
            setPreviewAsset(feature.items[0]);
        }
    };

    const handleInspectClick = () => {
        if (previewAsset && onInspect) {
            onInspect({
                name: previewAsset.name,
                render: previewAsset.image,
                wireframe: previewAsset.wireframe || (previewAsset.image + "&grayscale")
            });
            setSelectedCategory(null);
        }
    };

    return (
        <div className="relative z-40 bg-white dark:bg-gray-950 py-24 min-h-screen rounded-t-3xl mt-[-5vh] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark dark:text-white">Asset Collections</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        Browse the diverse categories included in this pack. Click a category to view individual assets.
                    </p>
                </div>

                {/* CATEGORY GRID */}
                {features ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {features.map((feature, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ y: -10 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleCategorySelect(feature)}
                                className="group relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer text-left"
                            >
                                <img
                                    src={feature.image}
                                    alt={feature.category}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/60 transition-colors" />

                                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {feature.category}
                                    </h3>
                                    <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        {feature.items.length} Unique Assets
                                    </p>
                                </div>
                            </motion.button>
                        ))}

                        {/* More Assets Coming Soon - Visual Placeholder */}
                        <div className="relative md:col-span-2 lg:col-span-2 h-64 md:h-80 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-800 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900/50">

                            {/* Blurred Placeholders */}
                            <div className="flex gap-4 opacity-30 blur-sm transform scale-95 pointer-events-none select-none">
                                <div className="w-40 h-52 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                                <div className="w-40 h-52 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                                <div className="w-40 h-52 bg-gray-200 dark:bg-gray-800 rounded-xl hidden md:block"></div>
                            </div>

                            {/* Handwritten Note Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="transform -rotate-6 bg-[#ffffd0] text-black px-6 py-4 shadow-xl max-w-sm text-center font-['Patrick_Hand'] text-2xl leading-tight rounded-sm border border-yellow-200/50 paper-clipped">
                                    <span className="block text-3xl mb-1 text-gray-800">✨</span>
                                    More assets coming soon!
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">No categories found.</div>
                )}

                {/* --- SPLIT-VIEW CATEGORY MODAL --- */}
                <AnimatePresence>
                    {selectedCategory && (
                        <motion.div
                            key="category-modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, pointerEvents: "none" }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                            onClick={() => setSelectedCategory(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-white dark:bg-gray-900 w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[650px] relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="absolute top-4 right-4 z-40 p-2 bg-black/20 hover:bg-black/40 dark:bg-white/10 dark:hover:bg-white/20 rounded-full text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {/* Left Side: List */}
                                <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col h-full bg-light dark:bg-gray-900 z-10 relative">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold mb-2 text-primary">{selectedCategory.category}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                            <Box size={16} />
                                            <span>{selectedCategory.items.length} items available</span>
                                        </p>
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                        {selectedCategory.items.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setPreviewAsset(item)}
                                                className={`
                                                    w-full p-4 rounded-xl text-left transition-all group flex items-center justify-between
                                                    ${previewAsset === item
                                                        ? 'bg-primary/10 ring-1 ring-primary shadow-sm'
                                                        : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-primary/20'
                                                    }
                                                `}
                                            >
                                                <span className={`font-medium group-hover:text-primary ${previewAsset === item ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}>
                                                    {item.name}
                                                </span>
                                                {(previewAsset === item) && (
                                                    <motion.div layoutId="activeDot" className="w-2 h-2 rounded-full bg-primary" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side: Dynamic Preview */}
                                <div className="hidden md:flex w-2/3 bg-black relative h-full flex-col justify-end">

                                    <AnimatePresence mode="wait">
                                        {previewAsset && (
                                            <motion.img
                                                key={previewAsset.image}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6 }}
                                                src={previewAsset.image}
                                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                                                alt="Preview"
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                                    <motion.div
                                        key={previewAsset?.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative z-20 p-8 flex items-end justify-between"
                                    >
                                        <div>
                                            <div className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Selected Asset</div>
                                            <h4 className="text-4xl text-white font-bold mb-2">{previewAsset?.name}</h4>
                                            <p className="text-gray-300 max-w-md">Premium quality 3D asset ready for inspection.</p>
                                        </div>

                                        <button
                                            onClick={handleInspectClick}
                                            className="bg-white text-black hover:bg-primary hover:text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-3"
                                        >
                                            <Scan size={20} />
                                            Inspect Topology
                                        </button>
                                    </motion.div>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AssetGallery;
