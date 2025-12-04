import { Github, Linkedin, Youtube, Palette } from 'lucide-react';
import LogoLight from '../../assets/ZBVR_logo-Light.png';
import LogoDark from '../../assets/ZBVR_logo-Dark.png';

const Footer = ({ theme }) => {
    return (
        <footer className="bg-gray-100 dark:bg-black py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                            <img
                                src={theme === 'light' ? LogoLight : LogoDark}
                                alt="ZBVR Logo"
                                className="h-8 w-auto object-contain"
                            />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Zohair Banoori
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            3D Artist & VR Developer
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="https://github.com/lolbanoori" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/lolbanoori/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://www.youtube.com/@lolbanoori" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                            <Youtube size={24} />
                        </a>
                        <a href="https://www.artstation.com/lolbanoori" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                            <Palette size={24} />
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
