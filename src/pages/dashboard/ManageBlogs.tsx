import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import blogData from "@/data/blogData.json";
import { Badge } from "@/components/ui/badge";

const ManageBlogs = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manage Blogs</h1>
                    <p className="text-gray-400 mt-1">Create, edit, and manage your blog posts.</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Post
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="Search posts..."
                        className="bg-gray-900/50 border-gray-700 text-white pl-10 focus:border-purple-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-800 hover:bg-transparent">
                            <TableHead className="text-gray-400">Title</TableHead>
                            <TableHead className="text-gray-400">Category</TableHead>
                            <TableHead className="text-gray-400">Author</TableHead>
                            <TableHead className="text-gray-400">Date</TableHead>
                            <TableHead className="text-gray-400 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogData.map((blog) => (
                            <TableRow key={blog.id} className="border-gray-800 hover:bg-white/5">
                                <TableCell className="font-medium text-white">{blog.title}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 border-purple-700/50">
                                        {blog.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-300">{blog.author}</TableCell>
                                <TableCell className="text-gray-300">{new Date(blog.date).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-400">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-400">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageBlogs;
