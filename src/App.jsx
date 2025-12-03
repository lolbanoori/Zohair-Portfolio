import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Portfolio />
                            <About />
                            <Contact />
                        </>
                    } />
                    {/* Add more routes if needed for standalone pages */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
