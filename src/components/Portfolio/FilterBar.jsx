import React from 'react';

const FilterBar = ({ currentFilter, setFilter }) => {
    const filters = ['All', 'Blender', 'Unity', 'VR'];

    return (
        <div className="flex justify-center space-x-4 mb-12">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setFilter(filter)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentFilter === filter
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
