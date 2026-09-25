import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface SourceCodeButtonProps {
  variant?: 'nav' | 'hero' | 'minimal';
  className?: string;
}

export const GITHUB_REPO_URL = 'https://github.com/azharhussaincs/Trip-Planner';

export const SourceCodeButton: React.FC<SourceCodeButtonProps> = ({
  variant = 'nav',
  className = '',
}) => {
  if (variant === 'hero') {
    return (
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Source Code on GitHub"
        className={`inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 transition-all active:scale-[0.98] ${className}`}
      >
        <Github className="h-4 w-4 text-slate-900" />
        <span>Source Code</span>
        <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
      </a>
    );
  }

  if (variant === 'minimal') {
    return (
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Source Code on GitHub"
        className={`inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors ${className}`}
      >
        <Github className="h-3.5 w-3.5" />
        <span>Source Code</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Source Code on GitHub"
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 transition-all ${className}`}
    >
      <Github className="h-3.5 w-3.5 text-slate-900" />
      <span className="hidden sm:inline">Source Code</span>
      <span className="sm:hidden">GitHub</span>
      <ExternalLink className="h-3 w-3 text-slate-400" />
    </a>
  );
};
