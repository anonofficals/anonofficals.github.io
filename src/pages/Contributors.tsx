import React from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Trophy, Star, Code, Heart, Users } from "lucide-react";

const Contributors = () => {
    // Mock data for contributors
    const topContributors = [
        {
            name: "Alex Johnson",
            role: "Core Maintainer",
            contributions: 450,
            avatar: "https://github.com/shadcn.png", // Using a placeholder
            badges: ["Architect", "Bug Hunter"],
        },
        {
            name: "Sarah Chen",
            role: "Documentation Lead",
            contributions: 320,
            avatar: "https://github.com/shadcn.png",
            badges: ["Writer", "Mentor"],
        },
        {
            name: "Michael Smith",
            role: "Frontend Wizard",
            contributions: 280,
            avatar: "https://github.com/shadcn.png",
            badges: ["UI/UX", "React"],
        },
    ];

    const recentContributors = Array.from({ length: 12 }).map((_, i) => ({
        name: `Contributor ${i + 1}`,
        contributions: Math.floor(Math.random() * 50) + 10,
        avatar: "https://github.com/shadcn.png",
    }));

    return (
        <PageTransition>
            <div className="universal-page-bg">
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="relative py-20 lg:py-32 flex items-center justify-center overflow-hidden">
                        <div className="container-responsive text-center relative z-10">
                            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 backdrop-blur-sm">
                                <Heart className="w-4 h-4 mr-2" />
                                Community Heroes
                            </Badge>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                                Our Contributors
                            </h1>
                            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-10">
                                Meet the amazing people who make Anon Open Source possible.
                                From code to documentation, every contribution counts.
                            </p>
                        </div>
                    </section>

                    {/* Top Contributors Section */}
                    <section className="section-padding bg-transparent">
                        <div className="container-responsive">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                Top Contributors
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {topContributors.map((contributor, index) => (
                                    <Card key={index} className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                                        <CardHeader className="text-center">
                                            <div className="w-24 h-24 mx-auto mb-4 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-orange-500">
                                                <img
                                                    src={contributor.avatar}
                                                    alt={contributor.name}
                                                    className="w-full h-full rounded-full object-cover border-4 border-black"
                                                />
                                            </div>
                                            <CardTitle className="text-white text-xl">{contributor.name}</CardTitle>
                                            <CardDescription className="text-blue-400 font-medium">{contributor.role}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <div className="flex justify-center gap-2 mb-4">
                                                {contributor.badges.map((badge, i) => (
                                                    <Badge key={i} variant="secondary" className="bg-white/10 text-gray-300 hover:bg-white/20">
                                                        {badge}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                                                <Code className="w-4 h-4" />
                                                <span>{contributor.contributions} contributions</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* All Contributors Grid */}
                    <section className="section-padding bg-transparent">
                        <div className="container-responsive">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                                <Users className="w-6 h-6 text-blue-500" />
                                Recent Contributors
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {recentContributors.map((contributor, index) => (
                                    <div key={index} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center hover:bg-white/5 transition-all">
                                        <img
                                            src={contributor.avatar}
                                            alt={contributor.name}
                                            className="w-16 h-16 mx-auto rounded-full mb-3 opacity-80 hover:opacity-100 transition-opacity"
                                        />
                                        <h3 className="text-white text-sm font-medium truncate">{contributor.name}</h3>
                                        <p className="text-gray-500 text-xs mt-1">{contributor.contributions} commits</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contributors;
