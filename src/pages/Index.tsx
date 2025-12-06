import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Users, Code, Heart, Terminal, Globe, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="relative z-10">

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
            <div className="w-full max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
              <p className="text-3xl sm:text-4xl text-white uppercase tracking-widest">
                ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-transparent text-white">
                ᴀɴᴏɴ ᴏss
              </h1>

              <p className="text-sm sm:text-base text-white max-w-2xl mx-auto">
                Building the future of decentralized technology, one commit at a time. We provide secure, scalable, and privacy-focused open-source solutions for the modern web.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects">
                  <Button className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden px-6 py-3 w-full sm:w-auto">
                    <span className="relative z-10 flex items-center gap-2 text-sm">
                      <Code className="w-4 h-4" />
                      Explore Projects
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
                <a href="https://github.com/AnonOSS" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden px-6 py-3 w-full sm:w-auto">
                    <span className="relative z-10 flex items-center gap-2 text-white text-sm">
                      <Github className="w-4 h-4" />
                      Visit GitHub
                    </span>
                  </Button>
                </a>
                <Link to="/community">
                  <Button className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden px-6 py-3 w-full sm:w-auto">
                    <span className="relative z-10 flex items-center gap-2 text-white text-sm">
                      <Users className="w-4 h-4" />
                      Join Community
                    </span>
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden px-6 py-3 w-full sm:w-auto">
                    <span className="relative z-10 flex items-center gap-2 text-white text-sm">
                      <Heart className="w-4 h-4 text-red-500" />
                      Support Us
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-12 text-white">
                Why Choose Anon?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-blue-500 hover:scale-105 transition-all duration-300">
                  <CardContent className="space-y-3 p-5">
                    <Shield className="w-8 h-8 text-blue-400" />
                    <h3 className="text-base font-semibold text-white">Privacy First</h3>
                    <p className="text-gray-400 text-xs">
                      We build tools that respect user privacy by default. No tracking, no hidden data collection.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-green-500 hover:scale-105 transition-all duration-300">
                  <CardContent className="space-y-3 p-5">
                    <Terminal className="w-8 h-8 text-green-400" />
                    <h3 className="text-base font-semibold text-white">Developer Centric</h3>
                    <p className="text-gray-400 text-xs">
                      APIs designed by developers, for developers. Clean documentation and intuitive interfaces.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-purple-500 hover:scale-105 transition-all duration-300">
                  <CardContent className="space-y-3 p-5">
                    <Zap className="w-8 h-8 text-purple-400" />
                    <h3 className="text-base font-semibold text-white">High Performance</h3>
                    <p className="text-gray-400 text-xs">
                      Optimized for speed and efficiency. Our tools are built to handle scale.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

export default Index;