import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import BlenderTemplate from '../components/templates/BlenderTemplate';
import AssetInspector from '../components/ui/AssetInspector';

/**
 * ProjectDetails Dispatcher
 * 
 * Acts as the entry point for all project detail pages.
 * Determines the correct template to render based on the project's 'type' field.
 * 
 * Templates:
 * - Blender: Standard Asset Pack layout (Scrollytelling -> Gallery -> Inspector)
 * - Unity: (Future) Game-ready showcase layout
 * - VR: (Future) XR-specific layout
 * 
 * @returns {JSX.Element} The appropriate template for the project.
 */
const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id || p.id === Number(id));

    if (!project) {
        return (
            <div className="h-screen flex items-center justify-center text-white bg-gray-900">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Project Not Found</h1>
                    <p className="text-gray-400">The project you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    // Template Routing Logic
    // Normalize type comparison to be case-insensitive
    const type = project.type?.toLowerCase();

    switch (type) {
        case 'blender':
            return <BlenderTemplate project={project} />;

        case 'unity':
            // future return <UnityTemplate project={project} />;
            return <div className="text-white p-20">Unity Template Coming Soon...</div>;

        case 'vr':
            // future return <VRTemplate project={project} />;
            return <div className="text-white p-20">VR Template Coming Soon...</div>;

        default:
            // Fallback for unknown types
            return (
                <div className="h-screen flex items-center justify-center text-white bg-gray-900">
                    <p>Unknown Project Type: {project.type}</p>
                </div>
            );
    }
};

export default ProjectDetails;
