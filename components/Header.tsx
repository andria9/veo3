
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-slate-800/30 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
    <div className="container mx-auto p-4 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.223 2.1c.38-.48.98-.77 1.62-.84.64-.07 1.28.08 1.83.42l9 6c.55.36.93.94.93 1.58v.48c0 .64-.38 1.22-.93 1.58l-9 6A2.25 2.25 0 017.843 21a2.25 2.25 0 01-1.62-.84c-.38-.48-.56-1.08-.5-1.7l.42-4.21-3.26-.35a.75.75 0 01-.65-.74l.03-1.48a.75.75 0 01.65-.74l3.26-.35.42-4.21c.06-.62.24-1.22.62-1.7z"/>
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
          VEO Video Generator
        </h1>
      </div>
    </div>
  </header>
);
