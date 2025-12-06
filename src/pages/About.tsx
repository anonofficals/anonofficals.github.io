import React from "react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Github,
  Mail,
  Linkedin,
  Twitter,
  Building2,
  MapPin,
  Clock4,
  ArrowRight,
  Award,
  Users,
  Rocket,
  Target,
  Globe,
  Calendar,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const leadership = [
    {
      name: "Muhammad Qasim",
      role: "CEO & Founder",
      image: "https://i.postimg.cc/cH7gM7Qz/shared-image.jpg",
      bio: "CEO and founder, driving the company's strategic direction and technological advancement",
    },
    {
      name: "Sobia Kosar",
      role: "CRO & Co-Founder",
      image: "https://i.postimg.cc/25Mf5gMd/45f90cfb5261bedd9164fecd01d9b12d.jpg",
      bio: "Expert in research operations and scientific methodology, leading groundbreaking projects in AI and space technology",
    },
    {
      name: "Sawera Afzal",
      role: "CMO & Investor",
      image: "https://i.postimg.cc/25Mf5gMd/45f90cfb5261bedd9164fecd01d9b12d.jpg",
      bio: "CMO and investor, driving marketing strategies and fostering innovation partnerships",
    },
    {
      name: "Ayesha Tariq",
      role: "CTO & Co-Founder",
      image: "https://i.postimg.cc/3Rn7S5kM/Whats-App-Image-2025-12-06-at-3-32-38-AM.jpg",
      bio: "CTO and co-founder, leading technical innovation and product development.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to revolutionize technology",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      year: "2019",
      title: "First AI Breakthrough",
      description: "Developed cutting-edge machine learning algorithms",
      icon: <Star className="w-6 h-6" />,
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Expanded operations to multiple countries",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      year: "2021",
      title: "Space Technology",
      description: "Launched space technology division",
      icon: <Target className="w-6 h-6" />,
    },
    {
      year: "2022",
      title: "100+ Team Members",
      description: "Reached significant team milestone",
      icon: <Users className="w-6 h-6" />,
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Won multiple technology innovation awards",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      title: "25+ Industry Awards",
      description: "Recognition for innovation excellence",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "250+ Team Members",
      description: "Growing global talent network",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "98% Client Satisfaction",
      description: "Exceptional service delivery",
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      title: "15+ Countries",
      description: "Global presence and impact",
    },
  ];
  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="relative z-10">

          {/* Hero Section */}
          <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-labelledby="about-hero-title"
          >
            <div className="relative z-10 text-center container-responsive">
              <h1
                id="about-hero-title"
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
              >
                About Anon Open Source
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-8 px-4">
                Learn about our mission, vision, and the team behind the
                cutting-edge technology solutions.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section
            className="section-padding bg-transparent"
            aria-labelledby="leadership-team-title"
          >
            <div className="container-responsive">
              <div className="text-center mb-12 sm:mb-16">
                <h2
                  id="leadership-team-title"
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                >
                  Leadership Team
                </h2>
                <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
                  Visionary leaders with decades of combined experience in technology,
                  research, and innovation.
                </p>
              </div>

              <div
                className="grid gap-6 sm:gap-8"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  justifyContent: "center",
                }}
              >
                {leadership.map((leader, index) => (
                  <Card
                    key={index}
                    className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl group hover:border-blue-500 transition-all duration-300 hover:scale-105"
                    role="region"
                    aria-label={`Profile of ${leader.name}`}
                  >
                    <CardHeader className="p-4 sm:p-6 text-center">
                      <div className="relative mx-auto mb-4">
                        <img
                          src={leader.image}
                          alt={`Portrait of ${leader.name}`}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mx-auto"
                        />
                      </div>
                      <CardTitle className="text-base sm:text-lg text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {leader.name}
                      </CardTitle>
                      <div className="flex justify-center mb-3">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {leader.role}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <CardDescription className="text-gray-300 text-xs text-center mb-4">
                        {leader.bio}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section className="section-padding bg-transparent">
            <div className="container-responsive">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Our Achievements
                </h2>
                <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
                  Numbers that reflect our commitment to excellence and innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl text-center hover:border-purple-500 transition-all duration-300 hover:scale-105"
                  >
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex justify-center mb-3">
                        {achievement.icon}
                      </div>
                      <CardTitle className="text-base sm:text-lg text-white mb-2">
                        {achievement.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <CardDescription className="text-gray-300 text-xs">
                        {achievement.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

export default About;
