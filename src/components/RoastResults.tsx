"use client";

import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface RoastData {
  workExperience: string[];
  skills: string;
  education: string;
  overallImpression: string;
  savageTweet: string;
  about?: string;
}

interface RoastResultsProps {
  data: RoastData;
}

export default function RoastResults({ data }: RoastResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(data.savageTweet);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6 animate-fade-in">
      <div className="bg-orange-500/10 border border-orange-500 rounded-lg p-4">
        <h3 className="text-xl font-bold text-orange-500 mb-2">Savage Tweet 🔥</h3>
        <div className="flex items-start justify-between gap-4">
          <p className="text-gray-200">{data.savageTweet}</p>
          <button
            onClick={handleShare}
            className="flex-shrink-0 text-orange-500 hover:text-orange-400"
            title="Copy to clipboard"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {data.about && (
        <section>
          <h3 className="text-lg font-semibold mb-2">About Section Roast</h3>
          <p className="text-gray-300">{data.about}</p>
        </section>
      )}

      <section>
        <h3 className="text-lg font-semibold mb-2">Work Experience Roast</h3>
        <ul className="space-y-4">
          {data.workExperience.map((critique, index) => (
            <li key={index} className="text-gray-300">
              {critique}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Skills Roast</h3>
        <p className="text-gray-300">{data.skills}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Education Roast</h3>
        <p className="text-gray-300">{data.education}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Overall Impression</h3>
        <p className="text-gray-300">{data.overallImpression}</p>
      </section>
    </div>
  );
}

// Add this to your globals.css
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}`; 