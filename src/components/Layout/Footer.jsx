import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-black py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Zohair Banoori
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            3D Artist & VR Developer
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                            <Twitter size={24} />
                        </a>
                        <a href="mailto:zohair@example.com" className="text-gray-500 hover:text-primary transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Zohair. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
