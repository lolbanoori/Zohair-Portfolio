import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/Utils/ScrollToTop';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

/**
 * App Root Component
 * 
 * Sets up global providers, routing, and layout structure.
 * Uses Framer Motion's LazyMotion to reduce initial bundle size.
 */
function App() {
    return (
        <>
            <ScrollToTop />
            <LazyMotion features={domAnimation}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                    </Routes>
                </Layout>
            </LazyMotion>
        </>
    );
}

export default App;
