import React, { forwardRef } from 'react';
import { Scan } from 'lucide-react';
import ComparisonSlider from '../../ui/ComparisonSlider';

/**
 * TopologyInspector Component
 * 
 * Displays the "Render vs Wireframe" comparison slider.
 * Features a sticky note prompt when no asset is selected.
 * 
 * @param {Object} selectedAsset - The currently selected asset { name, render, wireframe }.
 * @param {Object} selectedCategory - Fallback category info (optional).
 */
const TopologyInspector = forwardRef(({ selectedAsset, selectedCategory }, ref) => {
    return (
        <div ref={ref} className="scroll-mt-24 relative">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-6 md:p-12 shadow-inner ring-1 ring-black/5 dark:ring-white/5 relative overflow-hidden">

                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 relative z-10">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <Scan className="text-primary" />
                            Topology Inspector
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Inspecting: <span className="text-primary font-semibold">{selectedAsset ? selectedAsset.name : "Select an asset"}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Sticky Note - Only shows when NO asset is selected */}
                        {!selectedAsset && (
                            <div className="hidden md:block transform rotate-2 bg-yellow-200 text-black px-4 py-3 shadow-lg max-w-[200px] text-center font-['Patrick_Hand'] text-xl leading-tight rounded-sm border-t border-yellow-100">
                                Select an asset to view its topology!
                            </div>
                        )}

                        <div className="text-sm px-4 py-2 bg-white dark:bg-black rounded-full shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
                            Interactive View
                        </div>
                    </div>
                </div>

                {/* Slider Container */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black relative focus-within:ring-4 ring-primary/30 transition-shadow">
                    {selectedAsset ? (
                        <ComparisonSlider
                            topImage={selectedAsset.render}     // Render on TOP (Left/Overlay)
                            bottomImage={selectedAsset.wireframe} // Wireframe on BOTTOM (Right/Base)
                            topLabel="Render"
                            bottomLabel="Wireframe"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-black flex items-center justify-center">
                            <div className="text-white/20 font-mono text-sm">Waiting for selection...</div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
});

export default TopologyInspector;
