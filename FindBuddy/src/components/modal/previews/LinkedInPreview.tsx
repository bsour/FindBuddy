import { FC } from 'react';

const LinkedInPreview: FC = () => {
  return (
    <div className="p-4 space-y-3 bg-white dark:bg-space-black">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-gray-500 dark:text-gray-400" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold dark:text-white">Sourabh Beniwal</h3>
            <span className="text-xs text-gray-600 dark:text-gray-400">(He/Him)</span>
            {/* Verification Badge */}
            <svg 
              className="w-4 h-4 text-blue-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        Building high-performance, accessible user interfaces with modern frontend technologies, focused on delivering exceptional digital experiences through best practices in JavaScript, React, and beyond.
      </p>
      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>500+ connections</span>
        <span>Frontend Developer</span>
      </div>
    </div>
  );
};

export default LinkedInPreview; 