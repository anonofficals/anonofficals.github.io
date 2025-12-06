import { useState, useEffect } from 'react';
import { fetchGitHubUser, GitHubUser, getGitHubAvatarUrl } from '@/services/githubService';

interface UseGitHubProfileResult {
  profile: GitHubUser | null;
  loading: boolean;
  error: string | null;
  avatarUrl: string;
  displayName: string;
}

export const useGitHubProfile = (username: string): UseGitHubProfileResult => {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      const data = await fetchGitHubUser(username);
      
      if (data) {
        setProfile(data);
      } else {
        setError('Failed to fetch GitHub profile');
      }
      
      setLoading(false);
    };

    fetchProfile();
  }, [username]);

  return {
    profile,
    loading,
    error,
    avatarUrl: getGitHubAvatarUrl(username),
    displayName: profile?.name || username,
  };
};
