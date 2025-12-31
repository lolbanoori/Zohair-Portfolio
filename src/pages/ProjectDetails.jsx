import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const { id } = useParams();
    return (
        <div className="pt-20 px-4 text-white">
            <h1 className="text-3xl font-bold">Project Details: {id}</h1>
        </div>
    );
};

export default ProjectDetails;
