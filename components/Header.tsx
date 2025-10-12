import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <Icon name="smartphone" className="w-10 h-10 text-sky-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
          Nema Inspector
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Your device's vital statistics, beautifully presented. Here's what the browser knows about your hardware and connection.
      </p>
    </header>
  );
};