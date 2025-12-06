import React from 'react'
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

const Projects = () => {
    return (
        <div className="min-h-screen py-20">
            <div className="relative z-10">
                {/* Header Section */}
                <section className="container-responsive relative min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold font-playfair text-white">
                            Our Projects
                        </h1>
                        <p className="text-base text-gray-300">
                            Explore our open-source contributions. From secure databases to privacy-focused UI libraries, we are building the future of the decentralized web.
                        </p>
                    </div>
                </section>

                <section className="container-responsive pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Projects;
