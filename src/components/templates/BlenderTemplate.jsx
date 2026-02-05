import React, { useRef, useState } from 'react';
import HeroSection from './blender/HeroSection';
import AssetGallery from './blender/AssetGallery';
import AssetInspector from '../ui/AssetInspector';

/**
 * BlenderTemplate Component
 * 
 * The standard layout for Blender-based projects.
 * Orchestrates the interactions between the Gallery and the Asset Inspector.
 * 
 * Layout:
 * 1. HeroSection (Scrollytelling Video)
 * 2. AssetGallery (Grid & Modal)
 * 3. Asset Inspector (Comparison Slider)
 * 
 * @param {Object} project - The full project data object.
 */
const BlenderTemplate = ({ project }) => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const inspectorRef = useRef(null);

    /**
     * Handles the "Inspect Asset" action from the Gallery Modal.
     * Updates the local state and smooth-scrolls to the inspector.
     * 
     * @param {Object} asset - The asset to inspect {name, render, wireframe}.
     */
    const handleInspect = (asset) => {
        setSelectedAsset(asset);

        // Wait for modal to begin exiting before scrolling to avoid animation jank
        setTimeout(() => {
            if (inspectorRef.current) {
                inspectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    };

    return (
        <div className="bg-light dark:bg-dark min-h-screen text-dark dark:text-light">

            {/* 1. Cinematic Hero */}
            <HeroSection project={project} />

            {/* 2. Asset Gallery */}
            {/* Passes features and the inspect callback */}
            <AssetGallery
                features={project.features}
                onInspect={handleInspect}
            />

            {/* 3. Asset Inspector */}
            {/* Receives the selected asset to display */}
            <div ref={inspectorRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {selectedAsset ? (
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white flex items-center justify-center gap-2">
                            {/* Icon could go here */}
                            Asset Inspector
                        </h3>
                        <AssetInspector
                            topImage={selectedAsset.wireframe}
                            bottomImage={selectedAsset.render}
                            topLabel="Wireframe"
                            bottomLabel="Render"
                        />
                        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
                            Drag the slider to inspect mesh topology for: <span className="text-primary font-bold">{selectedAsset.name}</span>
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400 dark:text-gray-600 italic">
                        Select an asset from the gallery above to inspect its topology.
                    </div>
                )}
            </div>

        </div>
    );
};

export default BlenderTemplate;
