import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-8 border-t border-neutral-800">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Nema Inspector. A tool to inspect your device.
      </p>
    </footer>
  );
};
