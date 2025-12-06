import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Book, Code, Terminal, Layers, Search, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Documentation = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    const sidebarItems = [
        {
            title: "Getting Started",
            items: [
                { id: "introduction", label: "Introduction", icon: Book },
                { id: "installation", label: "Installation", icon: Terminal },
                { id: "quick-start", label: "Quick Start", icon: Code },
            ]
        },
        {
            title: "Core Concepts",
            items: [
                { id: "architecture", label: "Architecture", icon: Layers },
                { id: "security", label: "Security", icon: Layers },
                { id: "configuration", label: "Configuration", icon: Layers },
            ]
        },
        {
            title: "API Reference",
            items: [
                { id: "api-overview", label: "Overview", icon: Code },
                { id: "endpoints", label: "Endpoints", icon: Code },
                { id: "authentication", label: "Authentication", icon: Code },
            ]
        }
    ];

    return (
        <PageTransition>
            <div className="min-h-screen pt-20 pb-12">
                {/* Hero Section */}
                <div className="relative border-b border-gray-800 pb-12 mb-12">
                    <div className="container-responsive relative z-10">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-slide-up">
                                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Documentation
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 animate-fade-in delay-100">
                                Everything you need to build with Anon OSS.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container-responsive">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Sidebar */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="sticky top-24 space-y-8">
                                {sidebarItems.map((section, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-3">
                                            {section.title}
                                        </h4>
                                        <div className="space-y-1">
                                            {section.items.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setActiveSection(item.id)}
                                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.id
                                                        ? "bg-blue-600/20 text-blue-400 translate-x-1"
                                                        : "text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                                                        }`}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span>{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 md:p-12 min-h-[80vh]">

                                {/* Breadcrumbs */}
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-gray-300">Docs</span>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-blue-400 capitalize font-medium">{activeSection.replace('-', ' ')}</span>
                                </div>

                                {/* Content Area */}
                                <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:text-blue-300 prose-pre:bg-[#111] prose-pre:border prose-pre:border-gray-800">
                                    <h1 className="capitalize mb-6">
                                        {activeSection.replace('-', ' ')}
                                    </h1>

                                    <p className="lead">
                                        Welcome to the Anon Open Source documentation. This section covers the {activeSection.replace('-', ' ')} of our platform.
                                    </p>

                                    <div className="not-prose my-8">
                                        <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
                                            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-white/5">
                                                <span className="text-xs font-medium text-gray-400">TypeScript</span>
                                                <div className="flex space-x-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                                </div>
                                            </div>
                                            <div className="p-4 overflow-x-auto">
                                                <pre className="text-sm font-mono text-gray-300">
                                                    <code>{`// Example configuration for ${activeSection}
import { AnonConfig } from '@anon/core';

const config = new AnonConfig({
  mode: 'secure',
  encryption: 'aes-256-gcm',
  replicas: 3
});

await config.initialize();`}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>

                                    <h2>Key Features</h2>
                                    <ul>
                                        <li>High-performance architecture designed for scale</li>
                                        <li>End-to-end encryption by default for maximum security</li>
                                        <li>Seamless integration with existing tools and workflows</li>
                                        <li>Comprehensive API coverage with typed responses</li>
                                    </ul>

                                    <div className="not-prose mt-8 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                                        <div className="p-1 bg-blue-500/20 rounded-full">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-blue-400 mb-1">Note</h4>
                                            <p className="text-sm text-blue-200/70">
                                                This documentation is constantly updated. If you find any issues, please report them on our GitHub repository.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="not-prose mt-12 pt-8 border-t border-gray-800 flex justify-between">
                                        <Button variant="ghost" className="text-gray-400 hover:text-white">
                                            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                                            Previous
                                        </Button>
                                        <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                                            Next
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Documentation;
