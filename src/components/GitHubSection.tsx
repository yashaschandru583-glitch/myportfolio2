import React, { useState, useEffect } from 'react';
import {
  Github,
  Star,
  GitFork,
  BookOpen,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Search,
  Code2,
  Calendar
} from 'lucide-react';
import { defaultGitHubData, personalInfo } from '../data/portfolioData';
import { GitHubRepo } from '../types/portfolio';

export const GitHubSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>(defaultGitHubData.pinnedRepos as any);
  const [userInfo, setUserInfo] = useState({
    username: defaultGitHubData.username,
    name: defaultGitHubData.name,
    bio: defaultGitHubData.bio,
    public_repos: defaultGitHubData.public_repos,
    followers: defaultGitHubData.followers,
    following: defaultGitHubData.following
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveFetched, setIsLiveFetched] = useState(false);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      // 1. Fetch user metadata
      const userRes = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        setUserInfo({
          username: userData.login || personalInfo.githubUsername,
          name: userData.name || personalInfo.name,
          bio: userData.bio || personalInfo.bio,
          public_repos: userData.public_repos || defaultGitHubData.public_repos,
          followers: userData.followers || defaultGitHubData.followers,
          following: userData.following || defaultGitHubData.following
        });
      }

      // 2. Fetch public repositories
      const repoRes = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}/repos?sort=updated&per_page=12`);
      if (repoRes.ok) {
        const repoData: any[] = await repoRes.json();
        if (Array.isArray(repoData) && repoData.length > 0) {
          const mappedRepos: GitHubRepo[] = repoData.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || 'Public software repository by Yashas C',
            html_url: r.html_url,
            homepage: r.homepage,
            language: r.language || 'Code',
            stargazers_count: r.stargazers_count || 0,
            forks_count: r.forks_count || 0,
            updated_at: r.updated_at,
            topics: r.topics || []
          }));
          setRepos(mappedRepos);
          setIsLiveFetched(true);
        }
      }
    } catch (err) {
      console.log('GitHub API offline or rate-limited; using cached repositories.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (repo.language && repo.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getLanguageColor = (lang: string) => {
    switch (lang?.toLowerCase()) {
      case 'c++':
      case 'cpp':
        return 'bg-pink-500';
      case 'c':
        return 'bg-slate-400';
      case 'javascript':
        return 'bg-yellow-400';
      case 'typescript':
        return 'bg-blue-400';
      case 'python':
        return 'bg-emerald-400';
      case 'java':
        return 'bg-orange-500';
      case 'html':
        return 'bg-red-400';
      default:
        return 'bg-indigo-400';
    }
  };

  return (
    <section id="github" className="py-20 bg-slate-950/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-3">
            <Github className="w-3.5 h-3.5" />
            <span>Open Source & GitHub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            GitHub Activity & Repositories
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3 mb-2" />
          <p className="text-sm text-slate-400 max-w-xl">
            Live public repositories, open source contributions, and code repositories by Yashas C.
          </p>
        </div>

        {/* GitHub Profile Banner Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md shadow-xl mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 p-3 flex items-center justify-center text-white shadow-lg">
                <Github className="w-10 h-10 text-indigo-400" />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-bold text-white">{userInfo.name}</h3>
                  <span className="text-xs font-mono text-indigo-400">@{userInfo.username}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  {userInfo.bio}
                </p>
              </div>
            </div>

            {/* Stats Pills & Link */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-base font-bold text-white block">{userInfo.public_repos}</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Repositories</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-base font-bold text-white block">{userInfo.followers}</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Followers</span>
              </div>

              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-900/40 transition"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Search Bar & Live Sync Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            {isLiveFetched ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live GitHub Synced
              </span>
            ) : (
              <span>Public Showcase Repositories</span>
            )}
            <button
              type="button"
              onClick={fetchGitHubData}
              disabled={loading}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Refresh GitHub Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-indigo-300 transition hover:underline"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{repo.name}</span>
                  </a>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-indigo-300 transition p-1"
                    title="Open on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                  <span>{repo.language || 'Code'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-blue-400" />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
