import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/Utils/ScrollToTop';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

function App() {
    return (
        <>
            <ScrollToTop />
            <LazyMotion features={domAnimation}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:id" element={<ProjectDetails />} />
                    </Routes>
                </Layout>
            </LazyMotion>
        </>
    );
}

export default App;
