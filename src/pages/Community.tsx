import React from 'react';
import { Users, MessageCircle, Github, Twitter, Globe, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";
import { Link } from 'react-router-dom';

const Community = () => {
    return (
        <div className="container-responsive py-12 sm:py-20">
            <div className="space-y-12">

                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold font-playfair text-white">
                        Join Our Community
                    </h1>
                    <p className="text-base text-gray-300">
                        Connect with developers, contributors, and enthusiasts building the future of open source technology.
                    </p>
                </div>

                {/* Community Channels */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 text-center space-y-4 hover:border-blue-500 transition-all duration-300">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                            <MessageCircle className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="text-base font-bold text-white">Discord Server</h3>
                        <p className="text-gray-400 text-xs">Chat with the team and community in real-time.</p>
                        <a href="https://discord.gg/anon" target="_blank" rel="noopener noreferrer" className="block">
                            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white h-9">
                                Join Discord
                            </Button>
                        </a>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 text-center space-y-4 hover:border-white transition-all duration-300">
                        <div className="w-10 h-10 bg-gray-500/10 rounded-full flex items-center justify-center mx-auto">
                            <Github className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-base font-bold text-white">GitHub Discussions</h3>
                        <p className="text-gray-400 text-xs">Propose features, ask questions, and share ideas.</p>
                        <a href="https://github.com/anonofficals" target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-9">
                                View Discussions
                            </Button>
                        </a>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 text-center space-y-4 hover:border-sky-500 transition-all duration-300">
                        <div className="w-10 h-10 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto">
                            <Twitter className="w-5 h-5 text-sky-500" />
                        </div>
                        <h3 className="text-base font-bold text-white">Twitter / X</h3>
                        <p className="text-gray-400 text-xs">Follow us for the latest updates and announcements.</p>
                        <a href="https://twitter.com/anon" target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-9">
                                Follow @AnonOpenSource
                            </Button>
                        </a>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 text-center space-y-4 hover:border-purple-500 transition-all duration-300">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                            <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        <h3 className="text-base font-bold text-white">Contributors</h3>
                        <p className="text-gray-400 text-xs">Meet the amazing people building Anon.</p>
                        <Link to="/contributors" className="block">
                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-9">
                                View Contributors
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Events Section */}
                <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
                            <p className="text-gray-400 text-xs">Join us at our next meetup or hackathon.</p>
                        </div>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-9">
                            View All Events
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {events.map((event) => {
                            const dateObj = new Date(event.date);
                            const month = dateObj.toLocaleString('default', { month: 'short' });
                            const day = dateObj.getDate();

                            return (
                                <div key={event.id} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-lg flex flex-col items-center justify-center text-blue-400 border border-blue-500/30">
                                        <span className="text-[10px] font-bold uppercase">{month}</span>
                                        <span className="text-lg font-bold">{day}</span>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="text-base font-bold text-white">{event.title}</h4>
                                        <p className="text-xs text-gray-400">{event.type} • {event.time}</p>
                                    </div>
                                    <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                                        <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white h-8 text-xs">
                                            Register
                                        </Button>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
