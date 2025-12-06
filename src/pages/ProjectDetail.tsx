import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Star, GitFork, AlertCircle, Download, BookOpen, Copy, Check, GitPullRequest, Code, Bug, MessageSquare } from 'lucide-react';

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
            onClick={handleCopy}
        >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </Button>
    );
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    if (!project) {
        return (
            <div className="container-responsive py-20 text-center">
                <h1 className="text-3xl text-white mb-4">Project Not Found</h1>
                <Link to="/projects">
                    <Button>Back to Projects</Button>
                </Link>
            </div>
        );
    }

    const installCommand = `npm install ${project.id}`;
    const quickStartCode = `import { ${project.id.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')} } from '${project.id}';

// Initialize
const instance = new ${project.id.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')}();

// Use it
instance.start();`;

    return (
        <div className="min-h-screen pt-20 pb-12">
            {/* Beautiful Hero Section */}
            <div className="relative h-[45vh] min-h-[400px] w-full overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl z-10 animate-pulse" />
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl z-10 animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Content */}
                <div className="absolute inset-0 z-20 container-responsive flex flex-col justify-center">


                    {/* Project Title with Gradient */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                            {project.title}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-6 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tags with Animation */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {project.tags.map((tag, index) => (
                            <span
                                key={tag}
                                className="group relative px-4 py-2 text-sm font-semibold bg-white/10 backdrop-blur-xl border border-white/30 rounded-full text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <span className="relative z-10">{tag}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-responsive py-8">
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Stats Bar */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <span className="text-lg font-bold text-white">{project.stats.stars}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">Stars</div>
                                </div>
                                <div className="text-center border-x border-gray-800">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <GitFork className="w-4 h-4 text-blue-400" />
                                        <span className="text-lg font-bold text-white">{project.stats.forks}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">Forks</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <AlertCircle className="w-4 h-4 text-red-400" />
                                        <span className="text-lg font-bold text-white">{project.stats.issues}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">Issues</div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-3">About</h2>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {project.description}
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed mt-3">
                                This project is designed to provide developers with a robust, scalable solution that prioritizes performance and ease of use. Built with modern technologies and best practices, it offers a comprehensive set of features for building production-ready applications.
                            </p>
                        </div>

                        {/* Features Section */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
                            <ul className="space-y-2">
                                {[
                                    'High-performance architecture',
                                    'Easy integration with existing projects',
                                    'Comprehensive documentation',
                                    'Active community support',
                                    'Regular updates and maintenance'
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                                        <span className="text-blue-400 mt-1">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Installation Section */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl font-bold text-white">Installation</h2>
                                <CopyButton text={installCommand} />
                            </div>
                            <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                                <code className="text-green-400 font-mono text-sm">
                                    {installCommand}
                                </code>
                            </div>
                            <p className="text-gray-400 text-xs mt-2">
                                Or use yarn: <code className="text-green-400 font-mono">yarn add {project.id}</code>
                            </p>
                        </div>

                        {/* Quick Start */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl font-bold text-white">Quick Start</h2>
                                <CopyButton text={quickStartCode} />
                            </div>
                            <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                                <pre className="text-blue-400 font-mono text-xs overflow-x-auto">
                                    {quickStartCode}
                                </pre>
                            </div>
                        </div>

                        {/* Contribute Section */}
                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-md border border-green-500/20 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <GitPullRequest className="w-5 h-5 text-green-400" />
                                Contribute to {project.title}
                            </h2>
                            <p className="text-gray-300 text-sm mb-4">
                                We welcome contributions! Whether you're fixing bugs, adding features, improving documentation, or helping with discussions, your help makes this project better.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <a href={`${project.githubUrl}/issues/new`} target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="bg-black/30 hover:bg-black/50 border border-gray-700 hover:border-green-500/50 rounded-lg p-4 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Bug className="w-5 h-5 text-red-400" />
                                            <h3 className="text-white font-semibold">Report a Bug</h3>
                                        </div>
                                        <p className="text-gray-400 text-xs">Found an issue? Let us know so we can fix it.</p>
                                    </div>
                                </a>
                                
                                <a href={`${project.githubUrl}/pulls`} target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="bg-black/30 hover:bg-black/50 border border-gray-700 hover:border-green-500/50 rounded-lg p-4 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Code className="w-5 h-5 text-blue-400" />
                                            <h3 className="text-white font-semibold">Submit Code</h3>
                                        </div>
                                        <p className="text-gray-400 text-xs">Fix bugs or add features via Pull Request.</p>
                                    </div>
                                </a>
                                
                                <a href={`${project.githubUrl}/issues`} target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="bg-black/30 hover:bg-black/50 border border-gray-700 hover:border-green-500/50 rounded-lg p-4 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MessageSquare className="w-5 h-5 text-purple-400" />
                                            <h3 className="text-white font-semibold">Join Discussions</h3>
                                        </div>
                                        <p className="text-gray-400 text-xs">Share ideas and help answer questions.</p>
                                    </div>
                                </a>
                                
                                <Link to="/contribution-guide" className="block">
                                    <div className="bg-black/30 hover:bg-black/50 border border-gray-700 hover:border-green-500/50 rounded-lg p-4 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3 mb-2">
                                            <BookOpen className="w-5 h-5 text-yellow-400" />
                                            <h3 className="text-white font-semibold">Contribution Guide</h3>
                                        </div>
                                        <p className="text-gray-400 text-xs">Learn how to contribute effectively.</p>
                                    </div>
                                </Link>
                            </div>

                            <div className="flex gap-2">
                                <a href={`${project.githubUrl}/fork`} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm h-9">
                                        <GitFork className="w-3 h-3 mr-2" />
                                        Fork Repository
                                    </Button>
                                </a>
                                <a href={`${project.githubUrl}/issues/new/choose`} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10 text-sm h-9">
                                        <GitPullRequest className="w-3 h-3 mr-2" />
                                        Open Issue
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Action Buttons */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 space-y-3">
                            <h3 className="text-base font-bold text-white mb-3">Quick Actions</h3>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
                                <Button className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white text-sm h-9">
                                    <Github className="w-3 h-3 mr-2" />
                                    View on GitHub
                                </Button>
                            </a>
                            {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-sm h-9">
                                        <ExternalLink className="w-3 h-3 mr-2" />
                                        Live Demo
                                    </Button>
                                </a>
                            )}
                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-sm h-9" onClick={() => setIsDownloadOpen(true)}>
                                <Download className="w-3 h-3 mr-2" />
                                Download
                            </Button>
                            <Link to={`/projects/${id}/docs`} className="block">
                                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 text-sm h-9">
                                    <BookOpen className="w-3 h-3 mr-2" />
                                    Documentation
                                </Button>
                            </Link>
                        </div>

                        {/* Contribute Section - Prominent */}
                        <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md border-2 border-green-500/50 rounded-xl p-4 space-y-3">
                            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                                <GitPullRequest className="w-4 h-4 text-green-400" />
                                Contribute
                            </h3>
                            <p className="text-gray-300 text-xs mb-3">
                                Help improve this project by contributing code, reporting bugs, or joining discussions.
                            </p>
                            <a href={`${project.githubUrl}/fork`} target="_blank" rel="noopener noreferrer" className="block">
                                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm h-10 font-semibold shadow-lg shadow-green-500/20">
                                    <GitFork className="w-4 h-4 mr-2" />
                                    Fork & Contribute
                                </Button>
                            </a>
                            <div className="grid grid-cols-2 gap-2">
                                <a href={`${project.githubUrl}/issues/new`} target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs h-8">
                                        <Bug className="w-3 h-3 mr-1" />
                                        Report Bug
                                    </Button>
                                </a>
                                <a href={`${project.githubUrl}/pulls`} target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs h-8">
                                        <Code className="w-3 h-3 mr-1" />
                                        Submit PR
                                    </Button>
                                </a>
                            </div>
                            <Link to="/contribution-guide" className="block">
                                <Button variant="ghost" className="w-full text-green-400 hover:text-green-300 hover:bg-green-500/10 text-xs h-8">
                                    <BookOpen className="w-3 h-3 mr-1" />
                                    Contribution Guide
                                </Button>
                            </Link>
                        </div>

                        {/* Project Info */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4">
                            <h3 className="text-base font-bold text-white mb-3">Project Info</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">License</span>
                                    <span className="text-white font-medium">MIT</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Version</span>
                                    <span className="text-white font-medium">1.0.0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Updated</span>
                                    <span className="text-white font-medium">2 days ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Contributors */}
                        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4">
                            <h3 className="text-base font-bold text-white mb-3">Contributors</h3>
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-900 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">{i}</span>
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-gray-900 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">+12</span>
                                </div>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/20 rounded-xl p-4">
                            <h3 className="text-base font-bold text-white mb-2">Support This Project</h3>
                            <p className="text-xs text-gray-300 mb-3">
                                Help us maintain and improve this project
                            </p>
                            <Link to="/donate">
                                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm h-9">
                                    ❤️ Sponsor
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Download Modal */}
            {isDownloadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsDownloadOpen(false)}>
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Clone Project</h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => setIsDownloadOpen(false)}>
                                <span className="text-xl">×</span>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-400 mb-2 block">HTTPS</label>
                                <div className="flex items-center gap-2 bg-black/50 border border-gray-700 rounded-lg p-2">
                                    <code className="flex-1 text-sm text-green-400 font-mono truncate">
                                        git clone {project.githubUrl}.git
                                    </code>
                                    <CopyButton text={`git clone ${project.githubUrl}.git`} />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-400 mb-2 block">SSH</label>
                                <div className="flex items-center gap-2 bg-black/50 border border-gray-700 rounded-lg p-2">
                                    <code className="flex-1 text-sm text-blue-400 font-mono truncate">
                                        git clone git@github.com:{project.githubUrl.split('github.com/')[1]}.git
                                    </code>
                                    <CopyButton text={`git clone git@github.com:${project.githubUrl.split('github.com/')[1]}.git`} />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsDownloadOpen(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800">
                                    Cancel
                                </Button>
                                <a href={`${project.githubUrl}/archive/refs/heads/main.zip`} target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                        Download ZIP
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
