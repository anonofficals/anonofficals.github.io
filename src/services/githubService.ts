// GitHub API service for fetching user profiles
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_KEY = 'github_profiles_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CacheEntry {
  data: GitHubUser;
  timestamp: number;
}

interface ProfileCache {
  [username: string]: CacheEntry;
}

const getCache = (): ProfileCache => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const setCache = (cache: ProfileCache): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore cache errors
  }
};

export const fetchGitHubUser = async (username: string): Promise<GitHubUser | null> => {
  // Check cache first
  const cache = getCache();
  const cached = cache[username];
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch GitHub user ${username}: ${response.status}`);
      return null;
    }

    const data: GitHubUser = await response.json();
    
    // Update cache
    cache[username] = { data, timestamp: Date.now() };
    setCache(cache);
    
    return data;
  } catch (error) {
    console.error(`Error fetching GitHub user ${username}:`, error);
    return null;
  }
};

export const getGitHubAvatarUrl = (username: string, size: number = 200): string => {
  return `https://github.com/${username}.png?size=${size}`;
};

export const clearGitHubCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
};
