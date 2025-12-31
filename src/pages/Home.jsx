import React, { Suspense } from 'react';
import Hero from '../components/Hero/Hero';

// Lazy load components
const Portfolio = React.lazy(() => import('../components/Portfolio/Portfolio'));
const About = React.lazy(() => import('../components/About/About'));
const Contact = React.lazy(() => import('../components/Contact/Contact'));

const Home = () => {
    return (
        <>
            <Hero />
            <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                <Portfolio />
                <About />
                <Contact />
            </Suspense>
        </>
    );
};

export default Home;
