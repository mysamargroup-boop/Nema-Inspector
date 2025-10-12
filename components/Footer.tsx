import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-6 border-t border-neutral-200/80 dark:border-neutral-800/50">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
        <span className="text-red-500">*</span> Data is an estimate and may not be 100% accurate.
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Nema Inspector. A tool to inspect your device.
      </p>
    </footer>
  );
};