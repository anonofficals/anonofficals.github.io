import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GitBranch, Star, GitPullRequest, Activity, ExternalLink, 
  Award, Code, Users 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGitHubProfile } from "@/hooks/useGitHubProfile";
import { opensourceProjects } from "@/data/opensourceProjects";

const ContributorDashboard = () => {
  const { user } = useAuth();
  
  // Get GitHub username from user metadata or use default
  const githubUsername = (user as any)?.githubUsername || 'octocat';
  const { profile, loading, avatarUrl, displayName } = useGitHubProfile(githubUsername);

  const contributionStats = [
    { label: "Pull Requests", value: 24, icon: GitPullRequest, color: "text-purple-400" },
    { label: "Commits", value: 156, icon: GitBranch, color: "text-green-400" },
    { label: "Issues Resolved", value: 18, icon: Activity, color: "text-blue-400" },
    { label: "Stars Earned", value: 42, icon: Star, color: "text-yellow-400" },
  ];

  const badges = [
    { name: "First Commit", description: "Made your first contribution", icon: Code },
    { name: "Bug Hunter", description: "Fixed 10+ bugs", icon: Activity },
    { name: "Community Helper", description: "Helped 5+ newcomers", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contributor Dashboard</h1>
          <p className="text-gray-400">Your contribution overview</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <Award className="w-4 h-4 mr-1" /> Contributor
        </Badge>
      </div>

      {/* Profile Card */}
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              {loading ? (
                <div className="w-24 h-24 rounded-full bg-white/10 animate-pulse" />
              ) : (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-24 h-24 rounded-full border-4 border-blue-500/50"
                />
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{displayName}</h2>
              <p className="text-gray-400">@{githubUsername}</p>
              {profile?.bio && (
                <p className="text-gray-300 mt-2">{profile.bio}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <Badge className="bg-blue-500/20 text-blue-300">Core Contributor</Badge>
                <Badge className="bg-purple-500/20 text-purple-300">Bug Hunter</Badge>
              </div>
              <Button 
                variant="outline" 
                className="mt-4 text-white border-white/20"
                onClick={() => window.open(`https://github.com/${githubUsername}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" /> View GitHub Profile
              </Button>
            </div>
            {profile && (
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{profile.public_repos}</p>
                  <p className="text-gray-400 text-sm">Repos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{profile.followers}</p>
                  <p className="text-gray-400 text-sm">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{profile.following}</p>
                  <p className="text-gray-400 text-sm">Following</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contribution Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {contributionStats.map((stat) => (
          <Card key={stat.label} className="bg-black/40 backdrop-blur-xl border border-white/10">
            <CardContent className="p-4 text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" /> Your Badges
            </CardTitle>
            <CardDescription className="text-gray-400">
              Achievements earned through contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {badges.map((badge) => (
                <div key={badge.name} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <badge.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{badge.name}</p>
                    <p className="text-gray-400 text-sm">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects Contributed To */}
        <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" /> Projects
            </CardTitle>
            <CardDescription className="text-gray-400">
              Projects you've contributed to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {opensourceProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{project.name}</p>
                    <p className="text-gray-400 text-sm">{project.languages[0]}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Merged PR #234", project: "semantic-kernel", time: "2 hours ago", type: "merge" },
              { action: "Opened Issue #89", project: "global-country-data", time: "5 hours ago", type: "issue" },
              { action: "Committed to main", project: "powertoys", time: "1 day ago", type: "commit" },
              { action: "Reviewed PR #156", project: "zmap", time: "2 days ago", type: "review" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'merge' ? 'bg-purple-500' :
                  activity.type === 'issue' ? 'bg-green-500' :
                  activity.type === 'commit' ? 'bg-blue-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-white">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.project} · {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContributorDashboard;
