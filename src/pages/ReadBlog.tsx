import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, Copy, Check, List } from "lucide-react";
import blogData from "@/data/blogData.json";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, children }: { language: string, children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg border border-gray-700 bg-black/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-white/5">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{language || 'code'}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
        </Button>
      </div>
      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          customStyle={{ margin: 0, padding: 0, background: 'transparent', fontSize: '0.875rem', lineHeight: '1.6' }}
          wrapLines={true}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const ReadBlog = () => {
  const { id } = useParams();
  const blog = blogData.find(b => b.id === id);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title || 'Anon Open Source Blog',
          text: blog?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  if (!blog) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
            <Link to="/blog">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Extract headings for TOC
  const headings = blog.content.match(/^#{1,3} .+/gm)?.map(heading => {
    const level = heading.match(/^#+/)?.[0].length || 0;
    const text = heading.replace(/^#+ /, '');
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return { level, text, id };
  }) || [];

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-12">
        {/* Beautiful Hero Section */}
        <div className="relative h-[45vh] min-h-[400px] w-full overflow-hidden">

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl z-10 animate-pulse" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl z-10 animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Content */}
          <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center">


            {/* Blog Title with Gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                {blog.title}
              </span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-300">
              <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 hover:bg-purple-900/50 border-purple-700/50 backdrop-blur-md">
                {blog.category}
              </Badge>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {blog.readTime}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blog.date).toLocaleDateString()}
              </span>
            </div>

            {/* Tags with Animation */}
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={tag}
                  className="group relative px-4 py-2 text-sm font-semibold bg-white/10 backdrop-blur-xl border border-white/30 rounded-full text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">#{tag}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Image */}
              <div className="aspect-video overflow-hidden rounded-xl shadow-2xl shadow-purple-900/20 border border-gray-800">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Markdown Content */}
              <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8">
                <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-strong:text-white prose-code:text-purple-300 prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-gray-800">
                  <ReactMarkdown
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                          <CodeBlock language={match[1]}>
                            {String(children).replace(/\n$/, '')}
                          </CodeBlock>
                        ) : (
                          <code {...props} className={className}>
                            {children}
                          </code>
                        )
                      },
                      h1: ({ children }) => <h1 id={String(children).toLowerCase().replace(/[^\w]+/g, '-')}>{children}</h1>,
                      h2: ({ children }) => <h2 id={String(children).toLowerCase().replace(/[^\w]+/g, '-')}>{children}</h2>,
                      h3: ({ children }) => <h3 id={String(children).toLowerCase().replace(/[^\w]+/g, '-')}>{children}</h3>,
                    }}
                  >
                    {blog.content}
                  </ReactMarkdown>
                </article>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{blog.author}</div>
                    <div className="text-xs text-purple-400">Content Creator</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Passionate about open source and sharing knowledge with the community.
                </p>
              </div>

              {/* TOC */}
              <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <List className="w-4 h-4 text-purple-500" />
                  Table of Contents
                </h3>
                <nav className="space-y-1 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {headings.map((heading, index) => (
                    <a
                      key={index}
                      href={`#${heading.id}`}
                      className={`block text-sm py-1.5 transition-colors hover:text-purple-400 border-l-2 border-transparent hover:border-purple-500 ${heading.level === 1 ? 'text-white font-medium pl-3' :
                        heading.level === 2 ? 'text-gray-400 pl-6' :
                          'text-gray-500 pl-9'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    onClick={handleShare}
                  >
                    {isShared ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Share2 className="w-4 h-4 mr-2" />}
                    {isShared ? "Copied!" : "Share Article"}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ReadBlog;