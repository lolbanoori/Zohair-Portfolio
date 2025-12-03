import React from 'react';
import { Download } from 'lucide-react';

const About = () => {
    const skills = [
        "Blender", "Unity 3D", "C# Scripting", "VR Development",
        "3D Modeling", "Texturing", "Animation", "Shader Graph",
        "React.js", "Three.js"
    ];

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-black/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image/Visual */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-black">
                            {/* Placeholder for profile image or 3D avatar */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-600 dark:text-gray-400">
                                <span className="text-lg">Profile Image / 3D Avatar</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl font-bold">About Me</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            I am a passionate 3D Artist and VR Developer with a knack for creating immersive digital worlds.
                            With a background in both artistic design and technical development, I bridge the gap between
                            visual aesthetics and interactive functionality.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            My journey started with Blender, modeling simple objects, and evolved into building full-scale
                            VR experiences in Unity. I love solving complex problems and bringing creative visions to life.
                        </p>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Skills & Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span key={skill} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="flex items-center space-x-2 px-6 py-3 bg-dark dark:bg-light text-light dark:text-dark rounded-full font-semibold hover:opacity-90 transition-opacity">
                                <Download size={20} />
                                <span>Download Resume</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
