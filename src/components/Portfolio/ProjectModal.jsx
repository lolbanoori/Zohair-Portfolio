import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh] md:h-[600px]">
                    {/* Media Section (Image/3D Viewer Placeholder) */}
                    <div className="bg-gray-100 dark:bg-black relative h-64 md:h-full">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        {/* 
              TODO: Integrate Three.js Viewer here if project.modelUrl exists.
              For now, we just show the image.
            */}
                        {project.modelUrl && (
                            <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg text-white text-sm">
                                3D Model Available (Viewer Placeholder)
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8 overflow-y-auto">
                        <div className="mb-6">
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                                {project.type}
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3">Tools Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool) => (
                                    <span key={tool} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            {project.isInternalLink ? (
                                <a
                                    href={project.demoLink}
                                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                    onClick={(e) => {
                                        // Allow default navigation for internal links if we want a full page load, 
                                        // OR use react-router's useNavigate if we want SPA transition. 
                                        // Since we used href above, let's treat it as a normal link but let's actually use React Router's Link or just href for simplicity if Router is wrapping it.
                                        // Actually, to use 'framer-motion' exit animations properly, we might want to just let it handle the URL change.
                                    }}
                                >
                                    <ExternalLink size={20} />
                                    <span>Dive In</span>
                                </a>
                            ) : (
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                >
                                    <ExternalLink size={20} />
                                    <span>Live Demo</span>
                                </a>
                            )}
                            <a
                                href="#"
                                className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
