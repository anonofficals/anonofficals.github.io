import { Star, GitFork, AlertCircle, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    githubUrl: string;
    demoUrl?: string;
    stats: {
        stars: number;
        forks: number;
        issues: number;
    };
    documentation?: string;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Link to={`/projects/${project.id}`}>
            <div className="flex flex-col h-full group">
                {/* Image - No card background, rounded top corners */}
                <div className="relative mb-0 overflow-hidden rounded-t-lg">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content - Black card only under text */}
                <div className="flex-1 bg-black/40 backdrop-blur-md border border-gray-800 rounded-b-xl p-6 space-y-4 group-hover:border-blue-500 transition-all duration-300">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded-full text-gray-300">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Button className="w-full bg-white text-black hover:bg-gray-200 font-medium mt-auto">
                        Read More
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
