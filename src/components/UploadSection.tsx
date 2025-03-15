"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface RoastContent {
  workExperience: string[];
  skills: string;
  education: string;
  overallImpression: string;
  savageTweet: string;
  about?: string;
}

interface UploadSectionProps {
  roastLevel: string;
  onRoastGenerated: (roast: RoastContent) => void;
}

export default function UploadSection({ roastLevel, onRoastGenerated }: UploadSectionProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('roastLevel', roastLevel);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        toast.error('Server returned an invalid response format');
        return;
      }

      if (!response.ok) {
        const errorMessage = data?.error || 'Failed to analyze resume';
        console.error('Resume analysis error:', data);
        toast.error(errorMessage);
        return;
      }

      toast.success('Roast generated successfully!');
      
      // Parse the roast data if it's a string
      let roastContent;
      try {
        roastContent = typeof data.roast === 'string' ? JSON.parse(data.roast) : data.roast;
      } catch (e) {
        roastContent = data.roast;
      }
      
      if (onRoastGenerated) {
        onRoastGenerated(roastContent);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error while analyzing resume');
    } finally {
      setIsLoading(false);
    }
  }, [roastLevel, onRoastGenerated]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-8" suppressHydrationWarning>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-orange-400 bg-orange-400/10' : 'border-gray-600 hover:border-orange-400'}
        `}
        suppressHydrationWarning
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <ArrowUpTrayIcon className="h-12 w-12 text-gray-400" />
          <div>
            <p className="text-gray-300">
              {isDragActive
                ? 'Drop your resume here...'
                : 'Drag and drop your resume here, or click to select'}
            </p>
            <p className="text-sm text-gray-400 mt-2">Only PDF files are accepted</p>
          </div>
          {isLoading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 