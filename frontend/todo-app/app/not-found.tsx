/**
 * 404 Not Found Page
 *
 * Custom error page for handling 404 (Not Found) errors with purple theme.
 * Includes navigation back to homepage and helpful information.
 *
 * @see /specs/001-phase2-homepage-ui/spec.md - Phase 7: Cross-Cutting Concerns
 */

'use client';

import React from 'react';
import { Button } from '@/components/shared/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-950/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-purple-900/30 rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mb-4">
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">404</span>
          </div>
          <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="mb-8">
          <div className="inline-block p-4 bg-purple-50 dark:bg-purple-900/30 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-purple-500 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The page you&apos;re looking for might have been moved, deleted, or never existed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href="/"
            variant="primary"
            className="px-6 py-3 rounded-lg transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Button>

          <Button
            variant="outline"
            className="px-6 py-3 rounded-lg border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-all"
            onClick={() => window.history.back()}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;