import React from "react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Code, Users, Heart, ArrowRight, GitPullRequest, MessageSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Contributions = () => {
    return (
        <PageTransition>
            <div className="min-h-screen">
                <div className="relative z-10">

                    {/* Hero Section */}
                    <section className="relative py-20 lg:py-32 flex items-center justify-center overflow-hidden">
                        <div className="container-responsive text-center relative z-10">
                            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 backdrop-blur-sm">
                                <Heart className="w-4 h-4 mr-2" />
                                Community Driven
                            </Badge>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                                Contribute to Anon
                            </h1>
                            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-10">
                                Join our global community of developers. Whether you're fixing bugs, improving documentation, or proposing new features, your contributions matter.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="https://github.com/anon-open-source" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 h-10 text-sm">
                                        <Github className="w-4 h-4 mr-2" />
                                        View on GitHub
                                    </Button>
                                </a>
                                <Link to="/contribution-guide">
                                    <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 h-10 text-sm">
                                        Read Guidelines
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Ways to Contribute */}
                    <section className="py-16 bg-transparent">
                        <div className="container-responsive">
                            <h2 className="text-2xl font-bold text-white text-center mb-12">Ways to Contribute</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-blue-500 transition-all duration-300">
                                    <CardHeader>
                                        <Code className="w-8 h-8 text-blue-400 mb-4" />
                                        <CardTitle className="text-white text-base">Code</CardTitle>
                                        <CardDescription className="text-gray-400 text-xs">
                                            Fix bugs, add features, or improve performance in our repositories.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>

                                <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-green-500 transition-all duration-300">
                                    <CardHeader>
                                        <BookOpen className="w-8 h-8 text-green-400 mb-4" />
                                        <CardTitle className="text-white text-base">Documentation</CardTitle>
                                        <CardDescription className="text-gray-400 text-xs">
                                            Improve our guides, API references, and tutorials to help others.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>

                                <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-purple-500 transition-all duration-300">
                                    <CardHeader>
                                        <MessageSquare className="w-8 h-8 text-purple-400 mb-4" />
                                        <CardTitle className="text-white text-base">Discussions</CardTitle>
                                        <CardDescription className="text-gray-400 text-xs">
                                            Help answer questions and engage in architectural discussions.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>

                                <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-orange-500 transition-all duration-300">
                                    <CardHeader>
                                        <GitPullRequest className="w-8 h-8 text-orange-400 mb-4" />
                                        <CardTitle className="text-white text-base">Review</CardTitle>
                                        <CardDescription className="text-gray-400 text-xs">
                                            Review pull requests to ensure code quality and security.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Registration CTA */}
                    <section className="py-20 bg-gradient-to-b from-transparent to-black/50">
                        <div className="container-responsive text-center">
                            <div className="max-w-3xl mx-auto bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-12">
                                <h2 className="text-2xl font-bold text-white mb-6">Become an Official Contributor</h2>
                                <p className="text-gray-300 mb-8 text-base">
                                    Register for an account to track your contributions, get recognized, and access exclusive developer resources.
                                </p>
                                <Link to="/auth?tab=signup">
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 text-sm rounded-xl shadow-lg shadow-purple-900/20 h-10">
                                        Register Now <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </PageTransition>
    );
};

export default Contributions;
