import React, { useState } from 'react';
import ProjectGrid from './ProjectGrid';
import FilterBar from './FilterBar';
import { projects } from '../../data/projects';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.type === filter);

    return (
        <section id="portfolio" className="py-20 bg-light dark:bg-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Selected Works</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A collection of my best 3D models, VR experiences, and game development projects.
                    </p>
                </div>

                <FilterBar currentFilter={filter} setFilter={setFilter} />

                <ProjectGrid projects={filteredProjects} />
            </div>
        </section>
    );
};

export default Portfolio;
