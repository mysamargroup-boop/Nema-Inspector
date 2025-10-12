import React from 'react';
import { Icon } from './Icon';
import { LiveClock } from './LiveClock';

interface HeaderProps {
    onDownloadReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadReport }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Icon name="logo" className="w-8 h-8 text-sky-400" />
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Nema Inspector
            </span>
          </div>
          <div className="flex items-center gap-4">
             <LiveClock />
             <button
                onClick={onDownloadReport}
                aria-label="Download full report"
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800/60 text-sm text-slate-200 hover:text-white hover:bg-neutral-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <Icon name="download" className="w-4 h-4" />
                <span className="hidden md:inline">Download Report</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};