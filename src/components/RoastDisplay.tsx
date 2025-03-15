'use client';

import { useState } from 'react';

interface RoastContent {
  workExperience: string[];
  skills: string;
  education: string;
  overallImpression: string;
  savageTweet: string;
}

export default function RoastDisplay({ roastContent }: { roastContent?: RoastContent }) {
  if (!roastContent) return null;

  return (
    <div className="space-y-6 mt-8 p-6 bg-gray-800 rounded-lg">
      <div>
        <h2 className="text-xl font-bold text-orange-400 mb-2">🔥 Savage Tweet</h2>
        <p className="text-gray-200 italic">{roastContent.savageTweet}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-orange-400 mb-2">💼 Work Experience Roast</h2>
        <ul className="list-disc list-inside space-y-2">
          {Array.isArray(roastContent.workExperience) ? (
            roastContent.workExperience.map((critique, index) => (
              <li key={index} className="text-gray-200">{critique}</li>
            ))
          ) : (
            <li className="text-gray-200">{roastContent.workExperience}</li>
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold text-orange-400 mb-2">🎯 Skills Critique</h2>
        <p className="text-gray-200">{roastContent.skills}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-orange-400 mb-2">🎓 Education Roast</h2>
        <p className="text-gray-200">{roastContent.education}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-orange-400 mb-2">🔍 Overall Impression</h2>
        <p className="text-gray-200">{roastContent.overallImpression}</p>
      </div>
    </div>
  );
} 