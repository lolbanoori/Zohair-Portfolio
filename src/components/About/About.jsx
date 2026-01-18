import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import profileImage from '../../assets/profile.png';
import resumePdf from '../../assets/2nd Year Resume.pdf';

const About = () => {
    const skills = [
        "Blender", "Unity 3D", "C# Scripting", "VR Development",
        "3D Modeling", "Texturing", "Animation", "3D Interaction Design",
        "3D Asset Optimization", "Version Control / Git"
    ];

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Neon Flicker Animation Variants
    const neonFlicker = {
        initial: { opacity: 1 },
        animate: {
            opacity: [1, 0.8, 1, 0.9, 1, 0.4, 1, 0.9, 1],
            textShadow: [
                "0 0 5px currentColor",
                "0 0 10px currentColor",
                "0 0 5px currentColor",
                "0 0 20px currentColor",
                "0 0 5px currentColor"
            ],
            transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1]
            }
        }
    };

    const ref = React.useRef(null);
    const isInView = useTransform(useMotionValue(0), v => v)
    const textRef = React.useRef(null);
    const isTextInView = useInView(textRef);

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-black/50 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                        style={{ perspective: 1000 }}
                    >
                        <motion.a
                            href="https://horizon.meta.com/profile/104018922314597/?hwsh=cxZLEoBFc8"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            whileHover={{ scale: 1.05 }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="relative block aspect-square rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-black overflow-hidden cursor-pointer"
                        >
                            <img
                                src={profileImage}
                                alt="Zohair Banoori Profile"
                                className="w-full h-full object-cover"
                                style={{ backfaceVisibility: 'hidden' }}
                            />
                        </motion.a>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 space-y-6"
                    >
                        <h2 className="text-4xl font-bold relative inline-block">
                            About Me
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                        </h2>

                        <div ref={textRef} className="text-lg text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                            <p>
                                I am a <motion.span
                                    variants={neonFlicker}
                                    initial="initial"
                                    animate={isTextInView ? "animate" : "initial"}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 15px rgb(0, 216, 255)" }}
                                    className="inline-block font-orbitron font-bold text-primary cursor-default"
                                >3D Artist</motion.span> and <motion.span
                                    variants={neonFlicker}
                                    initial="initial"
                                    animate={isTextInView ? "animate" : "initial"}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 15px rgb(255, 0, 85)" }}
                                    className="inline-block font-orbitron font-bold text-secondary cursor-default"
                                >VR Developer</motion.span> shaping interactive worlds with a balance of precision and creative intent. My path began in <motion.span
                                    variants={neonFlicker}
                                    initial="initial"
                                    animate={isTextInView ? "animate" : "initial"}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 15px rgb(0, 216, 255)" }}
                                    className="inline-block font-orbitron font-bold text-primary cursor-default"
                                >Blender</motion.span> and expanded into building responsive, real-time VR experiences in <motion.span
                                    variants={neonFlicker}
                                    initial="initial"
                                    animate={isTextInView ? "animate" : "initial"}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 15px rgb(255, 0, 85)" }}
                                    className="inline-block font-orbitron font-bold text-secondary cursor-default"
                                >Unity</motion.span> for the <motion.span
                                    variants={neonFlicker}
                                    initial="initial"
                                    animate={isTextInView ? "animate" : "initial"}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 15px rgb(255, 165, 0)" }}
                                    className="inline-block font-orbitron font-bold text-orange-500 cursor-default"
                                >Meta Quest</motion.span> ecosystem.
                            </p>
                            <p>
                                My work blends clean visual design with purposeful interaction systems. I build environments, assets, and mechanics that stay optimized, intuitive, and grounded in real use. My long-term focus is <motion.span
                                    variants={neonFlicker}
                                    initial="initial"
                                    animate={isTextInView ? "animate" : "initial"}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 15px rgb(255, 0, 85)" }}
                                    className="inline-block font-orbitron font-bold text-secondary cursor-default"
                                >AR/VR</motion.span> and the emerging <motion.span
                                    variants={neonFlicker}
                                    initial="initial"
                                    animate={isTextInView ? "animate" : "initial"}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 15px rgb(255, 165, 0)" }}
                                    className="inline-block font-orbitron font-bold text-orange-500 cursor-default"
                                >Metaverse</motion.span>—spaces where technical discipline and imaginative design meet.
                            </p>
                            <p>
                                This portfolio presents the results: self-built projects, iterative prototypes, and complete VR experiences that reflect a consistent approach—clarity, function, and immersive depth.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Skills & Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700 cursor-default hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(0,216,255,0.5)] transition-all duration-300"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <motion.a
                                href={resumePdf}
                                download="Zohair_Banoori_Resume.pdf"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-dark dark:bg-light text-light dark:text-dark rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
                            >
                                <Download size={20} />
                                <span>Download Resume</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
