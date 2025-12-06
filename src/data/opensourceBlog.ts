export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introducing Semantic Kernel 1.0",
    excerpt: "We're excited to announce the general availability of Semantic Kernel 1.0, bringing enterprise-ready AI orchestration to your applications.",
    content: "Full blog content here...",
    author: "Sarah Chen",
    authorAvatar: "https://github.com/ghost.png",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Engineering",
    tags: ["AI", "SDK", "Release"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    featured: true,
  },
  {
    id: "2",
    title: "Building Accessible Components",
    excerpt: "Learn how we approach accessibility in our component library to ensure everyone can use our software.",
    content: "Full blog content here...",
    author: "Alex Rivera",
    authorAvatar: "https://github.com/ghost.png",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Design",
    tags: ["Accessibility", "UI/UX", "Best Practices"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
    featured: false,
  },
  {
    id: "3",
    title: "Open Source Community Report 2024",
    excerpt: "A look back at our open source community growth and achievements over the past year.",
    content: "Full blog content here...",
    author: "Michael Torres",
    authorAvatar: "https://github.com/ghost.png",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Community",
    tags: ["Open Source", "Community", "Report"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    featured: true,
  },
  {
    id: "4",
    title: "Getting Started with PowerToys",
    excerpt: "A comprehensive guide to installing and configuring PowerToys for maximum productivity.",
    content: "Full blog content here...",
    author: "Emily Johnson",
    authorAvatar: "https://github.com/ghost.png",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Tutorial",
    tags: ["PowerToys", "Windows", "Productivity"],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
    featured: false,
  },
  {
    id: "5",
    title: "Security Best Practices for Open Source Projects",
    excerpt: "Essential security guidelines every open source maintainer should follow.",
    content: "Full blog content here...",
    author: "David Kim",
    authorAvatar: "https://github.com/ghost.png",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Engineering",
    tags: ["Security", "Open Source", "Best Practices"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    featured: false,
  },
];

export const blogCategories = [
  "All",
  "Engineering",
  "Design",
  "Community",
  "Tutorial",
];
