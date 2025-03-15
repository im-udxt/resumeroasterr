'use client';

import { useState } from 'react';
import RoastLevelSelector from '@/components/RoastLevelSelector';
import UploadSection from '@/components/UploadSection';
import RoastDisplay from '@/components/RoastDisplay';

export default function Home() {
  const [roastLevel, setRoastLevel] = useState('medium');
  const [roastContent, setRoastContent] = useState(null);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-orange-400">Resume Roaster</h1>
          <p className="text-gray-400">Upload your resume and prepare to get roasted! 🔥</p>
        </div>

        <RoastLevelSelector 
          roastLevel={roastLevel} 
          onChange={setRoastLevel} 
        />

        <UploadSection 
          roastLevel={roastLevel} 
          onRoastGenerated={setRoastContent}
        />

        <RoastDisplay roastContent={roastContent} />
      </div>
    </main>
  );
}
