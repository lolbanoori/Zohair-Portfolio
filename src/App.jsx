import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Hero from './components/Hero/Hero';

const Portfolio = React.lazy(() => import('./components/Portfolio/Portfolio'));
const About = React.lazy(() => import('./components/About/About'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

function App() {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <LazyMotion features={domAnimation}>
                <Layout>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero />
                                <React.Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                                    <Portfolio />
                                    <About />
                                    <Contact />
                                </React.Suspense>
                            </>
                        } />
                        {/* Add more routes if needed for standalone pages */}
                    </Routes>
                </Layout>
            </LazyMotion>
        </Router>
    );
}

export default App;
