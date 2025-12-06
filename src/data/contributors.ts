export interface Contributor {
  id: string;
  githubUsername: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  role: 'contributor' | 'content_manager';
  contributions: number;
  badges: string[];
  joinedDate: string;
  isActive: boolean;
}

export const contributors: Contributor[] = [
  {
    id: '1',
    githubUsername: 'octocat',
    name: 'The Octocat',
    role: 'contributor',
    contributions: 156,
    badges: ['Core Contributor', 'Bug Hunter'],
    joinedDate: '2023-01-15',
    isActive: true,
  },
  {
    id: '2',
    githubUsername: 'torvalds',
    name: 'Linus Torvalds',
    role: 'contributor',
    contributions: 89,
    badges: ['Documentation Expert'],
    joinedDate: '2023-03-22',
    isActive: true,
  },
  {
    id: '3',
    githubUsername: 'defunkt',
    name: 'Chris Wanstrath',
    role: 'content_manager',
    contributions: 234,
    badges: ['Founding Member', 'Core Contributor'],
    joinedDate: '2022-11-01',
    isActive: true,
  },
];

export const CONTRIBUTOR_BADGES = [
  'Core Contributor',
  'Bug Hunter',
  'Documentation Expert',
  'Founding Member',
  'First Commit',
  'Security Champion',
  'Community Helper',
  'Feature Builder',
];
