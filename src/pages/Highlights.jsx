import React from 'react';
import { Construction } from 'lucide-react';

const HighlightsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto py-20">
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-cyan-500/10 rounded-full">
            <Construction className="h-16 w-16 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Page Under Construction
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          We're working hard to bring you something amazing! This section will showcase all the exciting highlights and events.
          Please check back soon for updates.
        </p>
        <div className="animate-pulse text-cyan-400 text-sm">
          Coming Soon...
        </div>
      </div>
    </div>
  );
};

export default HighlightsPage;
