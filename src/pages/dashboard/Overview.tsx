import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, FolderKanban, TrendingUp, Activity } from 'lucide-react';

const Overview = () => {
    const stats = [
        {
            title: "Total Views",
            value: "45.2K",
            change: "+12.5%",
            icon: Activity,
            color: "text-blue-500"
        },
        {
            title: "Active Users",
            value: "2,450",
            change: "+5.2%",
            icon: Users,
            color: "text-purple-500"
        },
        {
            title: "Blog Posts",
            value: "128",
            change: "+3",
            icon: FileText,
            color: "text-green-500"
        },
        {
            title: "Projects",
            value: "12",
            change: "+1",
            icon: FolderKanban,
            color: "text-orange-500"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-[#1a1a1a] border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <p className="text-xs text-green-500 flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {stat.change} from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-[#1a1a1a] border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <div className="flex-1">
                                        <p className="text-sm text-white">New blog post published</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1a1a1a] border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">API Status</span>
                                <span className="text-green-500 text-sm font-medium">Operational</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Database</span>
                                <span className="text-green-500 text-sm font-medium">Connected</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Storage</span>
                                <span className="text-yellow-500 text-sm font-medium">85% Used</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Overview;
