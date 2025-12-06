import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, User, ArrowRight } from "lucide-react";
import blogData from "@/data/blogData.json";

const OurBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogData.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent text-white font-sans">
        <div className="relative z-10">
          {/* Header & Search Section */}
          <section className="pt-24 pb-12 px-4 border-b border-gray-800 bg-transparent">
            <div className="container mx-auto max-w-6xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                Blog
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Explore the latest tutorials, insights, and updates from the world of coding and technology.
              </p>
            </div>
          </section>

          {/* Blog List Section */}
          <section className="py-16 px-4 bg-transparent">
            <div className="container mx-auto max-w-7xl">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-gray-500 text-xl mb-4">No blogs found matching your search.</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredBlogs.map((blog) => (
                    <Link key={blog.id} to={`/blogs/${blog.id}`} className="group h-full">
                      <Card className="bg-[#1a1a1a] border-gray-800 overflow-hidden hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-purple-900/10">
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-purple-600/90 hover:bg-purple-700 text-white border-none backdrop-blur-sm">
                              {blog.category}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(blog.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {blog.readTime}
                            </div>
                          </div>
                          <CardTitle className="text-white text-xl md:text-2xl font-bold leading-tight group-hover:text-purple-400 transition-colors line-clamp-2">
                            {blog.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="flex-grow">
                          <CardDescription className="text-gray-400 text-base line-clamp-3">
                            {blog.excerpt}
                          </CardDescription>
                        </CardContent>

                        <CardFooter className="pt-0 pb-6">
                          <Button className="w-full bg-white text-black hover:bg-gray-200 font-medium">
                            Read More
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default OurBlogs;
