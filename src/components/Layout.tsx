import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-pink-50">
      {title && (
        <header className="bg-white border-b-4 border-pink-200 py-6 px-4 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-800 text-center">
              {title}
            </h1>
          </div>
        </header>
      )}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};