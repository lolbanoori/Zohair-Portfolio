import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

/**
 * AssetInspector UI Component
 * 
 * A reusable interactive slider for comparing two images (e.g., Render vs Wireframe).
 * Supports mouse and touch dragging, with neon-styled labels for each side.
 * 
 * @param {string} topImage - URL for the overlay image (Left side).
 * @param {string} bottomImage - URL for the base image (Right side).
 * @param {string} topLabel - Label text for the top image.
 * @param {string} bottomLabel - Label text for the bottom image.
 */
const AssetInspector = ({ topImage, bottomImage, topLabel = "Before", bottomLabel = "After" }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [mode, setMode] = useState('slider'); // 'slider' | 'zoom'
    const containerRef = useRef(null);
    const x = useMotionValue(50); // Percentage 0-100

    // Transform motion value to CSS styles
    const clipPath = useTransform(x, v => `inset(0 ${100 - v}% 0 0)`);
    const leftPos = useTransform(x, v => `${v}%`);

    // Fade out bottom label as slider approaches the right edge
    // Only active in Slider mode
    const bottomLabelOpacity = useTransform(x, [85, 95], [1, 0]);
    // Fade out top label as slider approaches the left edge
    const topLabelOpacity = useTransform(x, [5, 15], [0, 1]);

    const handleResize = useCallback((clientX) => {
        if (!containerRef.current || mode !== 'slider') return; // Disable resizing in zoom mode
        const rect = containerRef.current.getBoundingClientRect();
        const clientXRel = clientX - rect.left;
        const newPercentage = Math.max(0, Math.min(100, (clientXRel / rect.width) * 100));
        x.set(newPercentage);
    }, [x, mode]);

    const onMouseDown = () => mode === 'slider' && setIsResizing(true);
    const onTouchStart = () => mode === 'slider' && setIsResizing(true);

    // Global event listeners to handle dragging outside the component
    useEffect(() => {
        const onMouseUp = () => setIsResizing(false);
        const onTouchEnd = () => setIsResizing(false);

        const onMouseMove = (e) => {
            if (isResizing) handleResize(e.clientX);
        };

        const onTouchMove = (e) => {
            if (isResizing && e.touches.length > 0) {
                handleResize(e.touches[0].clientX);
            }
        };

        if (isResizing) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [isResizing, handleResize]);

    // Handle click to jump (only if not dragging)
    const handleClick = (e) => {
        if (mode === 'slider') handleResize(e.clientX);
    };

    return (
        <div className="w-full h-[400px] md:h-[600px] rounded-xl shadow-2xl overflow-hidden relative bg-black select-none group">

            {/* --- CONTROLS OVERLAY --- */}
            {/* Mode Toggle */}
            <div className="absolute top-4 right-4 z-50 flex bg-black/80 backdrop-blur-md rounded-lg p-1 border border-white/10 shadow-xl">
                <button
                    onClick={() => setMode('slider')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'slider'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Slider
                </button>
                <div className="w-px bg-white/10 mx-1 my-1" />
                <button
                    onClick={() => setMode('zoom')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'zoom'
                        ? 'bg-primary text-white shadow-sm ring-1 ring-primary/50'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Zoom
                </button>
            </div>

            {/* Static Labels - Now OUTSIDE the transform wrapper so they don't scale */}
            {mode === 'slider' && (
                <>
                    {/* Top Label (Render) */}
                    {topLabel && (
                        <motion.span
                            style={{ opacity: topLabelOpacity }}
                            className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/30 text-red-500 text-sm font-bold tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] z-40 uppercase pointer-events-none"
                        >
                            {topLabel}
                        </motion.span>
                    )}

                    {/* Bottom Label (Wireframe) */}
                    {bottomLabel && (
                        <motion.span
                            style={{ opacity: bottomLabelOpacity }}
                            className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] z-40 uppercase pointer-events-none"
                        >
                            {bottomLabel}
                        </motion.span>
                    )}
                </>
            )}

            {/* Instructions Overlay */}
            <div className="absolute bottom-4 left-0 right-0 z-40 pointer-events-none flex justify-center">
                <div className="bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5 text-xs text-white/70 font-mono tracking-wider">
                    {mode === 'slider' ? 'DRAG SLIDER TO COMPARE' : 'PINCH / SCROLL TO ZOOM'}
                </div>
            </div>

            {/* --- TRANSFORMABLE CONTENT --- */}
            <TransformWrapper
                disabled={mode === 'slider'}
                initialScale={1}
                minScale={1}
                maxScale={4}
                centerOnInit
                onZoom={(ref) => ref.state.scale === 1 && setMode('slider')} // Optional: switch back on reset? Maybe confusing.
            >
                {({ resetTransform }) => (
                    // Reset zoom when switching back to slider
                    useEffect(() => {
                        if (mode === 'slider') resetTransform();
                    }, [mode, resetTransform]) || (
                        <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
                            <div
                                ref={containerRef}
                                className={`relative w-full h-full ${mode === 'slider' ? 'cursor-ew-resize' : 'cursor-default'}`}
                                onMouseDown={onMouseDown}
                                onTouchStart={onTouchStart}
                                onClick={handleClick}
                                style={{ touchAction: mode === 'slider' ? 'none' : 'auto' }}
                            >
                                {/* Bottom Image (Wireframe) */}
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={bottomImage}
                                        alt="Bottom"
                                        className="w-full h-full object-cover pointer-events-none"
                                        draggable="false"
                                    />
                                </div>

                                {/* Top Image (Render) - Hidden handle when in zoom mode, but keep image to show split? 
                                    DECISION: user wants zoom. Zooming split image is weird. 
                                    Let's keep the split active for now to see detail on both sides?
                                */}
                                <motion.div
                                    className="absolute inset-0 w-full h-full overflow-hidden z-20"
                                    style={{ clipPath }}
                                >
                                    <img
                                        src={topImage}
                                        alt="Top"
                                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                        draggable="false"
                                    />
                                </motion.div>

                                {/* Handle - Only visible in Slider Mode */}
                                <motion.div
                                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                                    style={{ left: leftPos, opacity: mode === 'slider' ? 1 : 0 }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
                                        <ArrowLeftRight size={20} />
                                    </div>
                                </motion.div>
                            </div>
                        </TransformComponent>
                    )
                )}
            </TransformWrapper>
        </div>
    );
};

export default AssetInspector;
