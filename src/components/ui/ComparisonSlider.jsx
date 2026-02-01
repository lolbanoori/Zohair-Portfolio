import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

/**
 * ComparisonSlider UI Component
 * 
 * A reusable interactive slider for comparing two images (e.g., Render vs Wireframe).
 * Supports mouse and touch dragging, with neon-styled labels for each side.
 * 
 * @param {string} topImage - URL for the overlay image (Left side).
 * @param {string} bottomImage - URL for the base image (Right side).
 * @param {string} topLabel - Label text for the top image.
 * @param {string} bottomLabel - Label text for the bottom image.
 */
const ComparisonSlider = ({ topImage, bottomImage, topLabel = "Before", bottomLabel = "After" }) => {
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef(null);
    const x = useMotionValue(50); // Percentage 0-100

    // Transform motion value to CSS styles
    const clipPath = useTransform(x, v => `inset(0 ${100 - v}% 0 0)`);
    const leftPos = useTransform(x, v => `${v}%`);

    // Fade out bottom label as slider approaches the right edge (where the label is)
    // This simulates the "cover" effect even if the top image is transparent
    const bottomLabelOpacity = useTransform(x, [85, 95], [1, 0]);

    const handleResize = useCallback((clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientXRel = clientX - rect.left;
        const newPercentage = Math.max(0, Math.min(100, (clientXRel / rect.width) * 100));
        x.set(newPercentage);
    }, [x]);

    const onMouseDown = () => setIsResizing(true);
    const onTouchStart = () => setIsResizing(true);

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
        handleResize(e.clientX);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[400px] md:h-[600px] overflow-hidden select-none group cursor-ew-resize rounded-xl shadow-2xl"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onClick={handleClick}
            style={{ touchAction: 'none' }} // Crucial for mobile
        >
            {/* Bottom Image (After/Base) - WIREFRAME */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={bottomImage}
                    alt="Bottom (Wireframe)"
                    className="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                />
                {bottomLabel && (
                    <motion.span
                        style={{ opacity: bottomLabelOpacity }}
                        className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] z-10 uppercase pointer-events-none"
                    >
                        {bottomLabel}
                    </motion.span>
                )}
            </div>

            {/* Top Image (Before/Overlay) - RENDER */}
            <motion.div
                className="absolute inset-0 w-full h-full overflow-hidden z-20"
                style={{ clipPath }}
            >
                <img
                        src={topImage}
                        alt="Top (Render)"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable="false"
                />
                {topLabel && (
                    <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/30 text-red-500 text-sm font-bold tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] z-30 uppercase pointer-events-none">
                        {topLabel}
                    </span>
                )}
            </motion.div>

            {/* Handle */}
            <motion.div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                style={{ left: leftPos }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
                    <ArrowLeftRight size={20} />
                </div>
            </motion.div>
        </div>
    );
};

export default ComparisonSlider;
