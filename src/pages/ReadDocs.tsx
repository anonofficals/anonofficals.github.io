import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, List, Copy, Check } from "lucide-react";
import { projects } from "@/data/projects";
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

const ReadDocs = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const [readingProgress, setReadingProgress] = useState(0);

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

    if (!project || !project.documentation) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">Documentation Not Found</h1>
                        <Link to={`/projects/${id}`}>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                Back to Project
                            </Button>
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    // Extract headings for TOC
    const headings = project.documentation.match(/^#{1,3} .+/gm)?.map(heading => {
        const level = heading.match(/^#+/)?.[0].length || 0;
        const text = heading.replace(/^#+ /, '');
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        return { level, text, id };
    }) || [];

    return (
        <PageTransition>
            <div className="min-h-screen pt-20 pb-12">
                {/* Reading Progress Bar */}
                <div
                    className="fixed top-0 left-0 h-1 bg-purple-600 z-[60] transition-all duration-100"
                    style={{ width: `${readingProgress}%` }}
                />

                <div className="container mx-auto max-w-6xl px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            {/* Docs Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    {project.title} Documentation
                                </h1>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
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
                                        {project.documentation}
                                    </ReactMarkdown>
                                </article>
                            </div>
                        </div>

                        {/* Sidebar / TOC */}
                        <div className="hidden lg:block lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                {/* TOC */}
                                <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6">
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
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ReadDocs;
