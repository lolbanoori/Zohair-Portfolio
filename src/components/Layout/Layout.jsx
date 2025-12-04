import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="flex flex-col min-h-screen bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer theme={theme} />
        </div>
    );
};

export default Layout;
