import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { ArrowDown } from 'lucide-react';
import { useInView } from 'framer-motion';

const Scene = React.lazy(() => import('./Scene'));

const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <section ref={ref} id="hero" className="relative h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-center overflow-hidden">
            {/* Text Content */}
            <div className="w-full md:w-1/2 px-6 md:px-12 z-10 flex flex-col justify-center items-start space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Zohair</span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300">
                    3D Artist & VR Developer
                </h2>
                <div className="text-lg text-gray-500 dark:text-gray-400 max-w-lg space-y-4">
                    <p className="font-semibold text-xl text-gray-800 dark:text-gray-200 italic border-l-4 border-primary pl-4">
                        "Designing the spaces people escape to when reality isn’t enough."
                    </p>
                    <p>
                        I craft immersive digital experiences using Blender and Unity, turning imagination into interactive reality.
                    </p>
                </div>
                <div className="flex space-x-4">
                    <a href="#portfolio" className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-primary/30">
                        View Work
                    </a>
                    <a href="#contact" className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Contact Me
                    </a>
                </div>
            </div>

            {/* 3D Scene */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full absolute md:relative top-0 right-0 -z-0 md:z-0 opacity-50 md:opacity-100">
                <Canvas dpr={[1, 2]} frameloop={isInView ? "always" : "never"} camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={1} />
                        <Scene />
                        <Environment preset="city" />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                <ArrowDown className="text-gray-400" size={32} />
            </div>
        </section>
    );
};

export default Hero;
