"use client";

/**
 * Login Page Route
 *
 * User authentication page with purple theme matching homepage.
 * Features:
 * - LoginForm component with validation
 * - Purple gradient background
 * - Framer Motion animations (fade in)
 * - Lucide icons
 * - "Don't have account?" link to signup
 * - Responsive design (mobile-first)
 * - Auto-redirect to /tasks on success
 *
 * @see /specs/006-auth-integration/spec.md - FR-002, FR-004, FR-013, FR-014
 */

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

/**
 * Login Page Component
 *
 * Renders centered login card with purple gradient background.
 * Matches homepage theme and animations.
 * Auto-redirects to /tasks on successful login (handled by LoginForm).
 *
 * @example
 * // Accessible at http://localhost:3000/login
 */
export default function LoginPage() {
  const prefersReducedMotion = useReducedMotion();

  /**
   * Animation variants for fade-in effect
   */
  const containerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center
        bg-gradient-to-br from-purple-50 via-white to-pink-50
        px-4 py-12
        relative overflow-hidden
      "
    >
      {/* Decorative Background Gradient Blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
        aria-hidden="true"
      />

      {/* Main Content Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="
          relative z-10 w-full max-w-md
          bg-white rounded-2xl shadow-2xl
          p-8 md:p-10
          border border-purple-100
        "
      >
        {/* Back to Home Link */}
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 text-purple-600 hover:text-purple-800
            text-sm font-medium mb-6
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded
          "
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
            Welcome Back
          </h1>
          <p className="text-purple-700 text-sm md:text-base">
            Log in to access your tasks and continue where you left off
          </p>
        </div>

        {/* Login Form */}
        <div className="flex flex-col items-center">
          <LoginForm />
        </div>

        {/* Signup Link - T052: Navigation link to signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="
                font-semibold text-purple-600 hover:text-purple-800
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded
                transition-colors
              "
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Decorative Bottom Border */}
        <div className="mt-8 pt-6 border-t border-purple-100">
          <p className="text-xs text-center text-gray-500">
            Your session will remain active for 30 days
          </p>
        </div>
      </motion.div>
    </div>
  );
}
