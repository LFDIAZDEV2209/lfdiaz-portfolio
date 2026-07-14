"use client";

import { useEffect, useState } from "react";
import { FiGitBranch, FiStar, FiCode } from "react-icons/fi";
import { profile } from "@/app/data/profile";

interface GitHubData {
  publicRepos: number;
  totalStars: number;
  topLanguage: string;
  loading: boolean;
  error: boolean;
}

export default function GitHubStatsRow() {
  const [data, setData] = useState<GitHubData>({
    publicRepos: 0,
    totalStars: 0,
    topLanguage: "—",
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const userRes = await fetch(
          `https://api.github.com/users/${profile.githubUsername}`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!userRes.ok) throw new Error("GitHub user fetch failed");
        const userData = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!reposRes.ok) throw new Error("GitHub repos fetch failed");
        const reposData: any[] = await reposRes.json();

        const totalStars = reposData.reduce(
          (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
          0
        );

        // Count languages
        const langCount: Record<string, number> = {};
        reposData.forEach((repo: any) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        });
        const topLang = Object.entries(langCount).sort(
          ([, a], [, b]) => b - a
        )[0]?.[0] || "—";

        if (!cancelled) {
          setData({
            publicRepos: userData.public_repos || reposData.length,
            totalStars,
            topLanguage: topLang,
            loading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  const stats = [
    {
      icon: FiGitBranch,
      label: "Repos públicos",
      value: data.loading ? "..." : String(data.publicRepos),
    },
    {
      icon: FiStar,
      label: "Estrellas totales",
      value: data.loading ? "..." : String(data.totalStars),
    },
    {
      icon: FiCode,
      label: "Lenguaje principal",
      value: data.loading ? "..." : data.topLanguage,
    },
  ];

  return (
    <div data-prj className="grid grid-cols-3 gap-3 mb-10">
      {stats.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className={`glass-card rounded-xl p-4 text-center transition-all duration-500 ${
            data.loading ? "opacity-50" : "opacity-100"
          } ${data.error ? "opacity-40" : ""}`}
        >
          <Icon
            size={16}
            className="text-neon mx-auto mb-2"
          />
          <p className="text-xl md:text-2xl font-extrabold gradient-text">
            {data.error ? "—" : value}
          </p>
          <p className="font-mono text-[10px] text-muted mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
