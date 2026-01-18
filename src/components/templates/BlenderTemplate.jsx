import React, { useRef, useState } from 'react';
import HeroSection from './blender/HeroSection';
import AssetGallery from './blender/AssetGallery';
import TopologyInspector from './blender/TopologyInspector';

/**
 * BlenderTemplate Component
 * 
 * The standard layout for Blender-based projects.
 * Orchestrates the interactions between the Gallery and the Topology Inspector.
 * 
 * Layout:
 * 1. HeroSection (Scrollytelling Video)
 * 2. AssetGallery (Grid & Modal)
 * 3. TopologyInspector (Comparison Slider)
 * 
 * @param {Object} project - The full project data object.
 */
const BlenderTemplate = ({ project }) => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const inspectorRef = useRef(null);

    /**
     * Handles the "Inspect Topology" action from the Gallery Modal.
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

            {/* 3. Topology Inspector */}
            {/* Receives the selected asset to display */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <TopologyInspector
                    ref={inspectorRef}
                    selectedAsset={selectedAsset}
                />
            </div>

        </div>
    );
};

export default BlenderTemplate;
