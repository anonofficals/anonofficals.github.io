import React from 'react';
import { GitPullRequest, MessageSquare, Bug, BookOpen, CheckCircle } from 'lucide-react';

const ContributionGuide = () => {
    return (
        <div className="container-responsive py-12 sm:py-20">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold font-playfair text-white">
                        Contribution Guide
                    </h1>
                    <p className="text-xl text-gray-300">
                        Thank you for your interest in contributing to Anon Open Source! We welcome contributions from everyone.
                    </p>
                </div>

                {/* Ways to Contribute */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="card-professional space-y-4">
                        <div className="flex items-center space-x-3 text-blue-400">
                            <Bug className="w-6 h-6" />
                            <h3 className="text-xl font-bold text-white">Report Bugs</h3>
                        </div>
                        <p className="text-gray-400">
                            Found a bug? Open an issue on GitHub. Please include steps to reproduce, expected behavior, and screenshots if possible.
                        </p>
                    </div>

                    <div className="card-professional space-y-4">
                        <div className="flex items-center space-x-3 text-green-400">
                            <GitPullRequest className="w-6 h-6" />
                            <h3 className="text-xl font-bold text-white">Submit Code</h3>
                        </div>
                        <p className="text-gray-400">
                            Fix a bug or add a feature. Fork the repository, create a branch, and submit a Pull Request.
                        </p>
                    </div>

                    <div className="card-professional space-y-4">
                        <div className="flex items-center space-x-3 text-purple-400">
                            <BookOpen className="w-6 h-6" />
                            <h3 className="text-xl font-bold text-white">Improve Docs</h3>
                        </div>
                        <p className="text-gray-400">
                            Help us improve our documentation. Fix typos, clarify instructions, or add new guides.
                        </p>
                    </div>

                    <div className="card-professional space-y-4">
                        <div className="flex items-center space-x-3 text-yellow-400">
                            <MessageSquare className="w-6 h-6" />
                            <h3 className="text-xl font-bold text-white">Join Discussions</h3>
                        </div>
                        <p className="text-gray-400">
                            Participate in discussions on GitHub or Discord. Help answer questions and share your knowledge.
                        </p>
                    </div>
                </div>

                {/* Process Steps */}
                <div className="glass-card p-8 md:p-12 rounded-2xl space-y-8">
                    <h2 className="text-3xl font-bold text-white">Contribution Process</h2>

                    <div className="space-y-6">
                        {[
                            { title: "Fork & Clone", desc: "Fork the repository to your GitHub account and clone it locally." },
                            { title: "Create a Branch", desc: "Create a new branch for your feature or bug fix." },
                            { title: "Make Changes", desc: "Write your code and tests. Ensure everything passes locally." },
                            { title: "Commit & Push", desc: "Commit your changes with clear messages and push to your fork." },
                            { title: "Submit PR", desc: "Open a Pull Request against the main repository." },
                        ].map((step, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{step.title}</h4>
                                    <p className="text-gray-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code of Conduct */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-white">Code of Conduct</h2>
                    <p className="text-gray-300">
                        We are committed to providing a friendly, safe, and welcoming environment for all. Please read and follow our Code of Conduct in all interactions.
                    </p>
                    <a href="#" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
                        Read Code of Conduct <CheckCircle className="w-4 h-4 ml-2" />
                    </a>
                </div>

            </div>
        </div>
    );
};

export default ContributionGuide;
