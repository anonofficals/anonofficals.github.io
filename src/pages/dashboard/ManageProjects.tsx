import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import { Badge } from "@/components/ui/badge";

const ManageProjects = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
                    <p className="text-gray-400 mt-1">Oversee your open source projects and contributions.</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Project
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="Search projects..."
                        className="bg-gray-900/50 border-gray-700 text-white pl-10 focus:border-purple-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-800 hover:bg-transparent">
                            <TableHead className="text-gray-400">Project Name</TableHead>
                            <TableHead className="text-gray-400">Tags</TableHead>
                            <TableHead className="text-gray-400">Stats</TableHead>
                            <TableHead className="text-gray-400 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id} className="border-gray-800 hover:bg-white/5">
                                <TableCell className="font-medium text-white">
                                    <div className="flex items-center gap-3">
                                        <img src={project.image} alt={project.title} className="w-8 h-8 rounded object-cover" />
                                        {project.title}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400 text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {project.tags.length > 2 && (
                                            <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs">
                                                +{project.tags.length - 2}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> {project.stats.stars}</span>
                                        <span className="flex items-center gap-1"><span className="text-blue-500">⑂</span> {project.stats.forks}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                            <Github className="w-4 h-4" />
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

export default ManageProjects;
