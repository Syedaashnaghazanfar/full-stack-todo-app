"use client";

/**
 * HeroSection Component
 *
 * Full-width hero banner for the homepage with purple theme styling.
 * Features responsive design, Framer Motion animations, and WCAG AAA compliance.
 *
 * Key Features:
 * - Responsive: Mobile (single column) → Tablet (centered) → Desktop (full width)
 * - Animations: Staggered fade-in and slide-up effects with Framer Motion
 * - Purple Theme: Gradient backgrounds, purple text, branded button
 * - Accessibility: Semantic HTML, focus states, reduced motion support
 *
 * @see /specs/001-phase2-homepage-ui/spec.md - Phase 3: T017-T019
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { Button } from "@/components/shared/Button";
import type { HeroSectionProps } from "@/types/components";
import { ArrowRight } from "lucide-react";

/**
 * Default props for HeroSection
 */
const defaultProps: Required<Omit<HeroSectionProps, "backgroundImage" | "theme">> = {
  headline: "Welcome to Your Dashboard",
  description:
    "Streamline your workflow with our powerful, intuitive platform. Manage tasks, track progress, and collaborate seamlessly—all in one place.",
  ctaText: "Get Started",
  ctaLink: "/features",
};

/**
 * HeroSection Component
 *
 * Renders the hero banner with headline, description, and CTA button.
 * Applies purple theme styling and responsive layout.
 *
 * @example
 * ```tsx
 * <HeroSection
 *   headline="Welcome to Your Dashboard"
 *   description="Streamline your workflow"
 *   ctaText="Get Started"
 *   ctaLink="/features"
 * />
 * ```
 */
export const HeroSection: React.FC<Partial<HeroSectionProps>> = (props) => {
  const { headline, description, ctaText, ctaLink, backgroundImage, theme } = {
    ...defaultProps,
    ...props,
  };

  const { isMobile, isTablet } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  /**
   * Animation variants for container (staggered children)
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  /**
   * Animation variants for individual items (fade + slide up)
   */
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  /**
   * Background style (gradient or image)
   */
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.25)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  /**
   * Theme-specific text colors
   */
  const textColorClass = theme === "dark" ? "text-white" : "text-purple-600";
  const descriptionColorClass = theme === "dark" ? "text-purple-100" : "text-purple-700";

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`
        relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden
        ${backgroundImage ? "" : "bg-gradient-to-br from-purple-50 via-white to-pink-50"}
        ${theme === "dark" && !backgroundImage ? "dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" : ""}
        px-4 py-12
        md:px-8 md:py-16
        lg:px-12 lg:py-20
      `}
      style={backgroundStyle}
      role="banner"
      aria-label="Hero section"
    >
      {/* Optional decorative gradient overlay for better text contrast */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/15 to-purple-950/30 z-0"
          aria-hidden="true"
        />
      )}

      {/* Content container with max-width and centering */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 md:space-y-10">
        {/* Headline with animation and shadow for better readability */}
        <motion.h1
          variants={itemVariants}
          className={`
            ${backgroundImage ? "text-white drop-shadow-2xl" : textColorClass}
            font-bold leading-tight
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            ${backgroundImage ? "bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent" : ""}
          `}
          style={backgroundImage ? {
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.5), 0 8px 15px rgba(124, 58, 237, 0.4)'
          } : {}}
        >
          {headline}
        </motion.h1>

        {/* Description with animation and enhanced shadow */}
        <motion.p
          variants={itemVariants}
          className={`
            ${backgroundImage ? "text-purple-50 drop-shadow-lg" : descriptionColorClass}
            text-lg leading-relaxed max-w-3xl mx-auto font-medium
            sm:text-xl
            md:text-2xl
          `}
          style={backgroundImage ? {
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3)'
          } : {}}
        >
          {description}
        </motion.p>

        {/* CTA Button with animation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center pt-6"
        >
          <Button
            href={ctaLink}
            variant="primary"
            className="
              px-10 py-4 text-xl font-bold
              inline-flex items-center gap-3
              bg-gradient-to-r from-purple-600 to-pink-600
              hover:from-purple-700 hover:to-pink-700
              text-white
              rounded-xl
              shadow-2xl hover:shadow-purple-500/50
              transition-all duration-300
              transform hover:scale-105
            "
            aria-label={`${ctaText} - Navigate to ${ctaLink}`}
          >
            {ctaText}
            <ArrowRight className="w-6 h-6" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

HeroSection.displayName = "HeroSection";

/**
 * Usage Examples:
 *
 * Basic usage with defaults:
 * <HeroSection />
 *
 * Custom headline and description:
 * <HeroSection
 *   headline="Transform Your Workflow"
 *   description="Experience the power of seamless productivity"
 *   ctaText="Start Free Trial"
 *   ctaLink="/signup"
 * />
 *
 * With background image and dark theme:
 * <HeroSection
 *   backgroundImage="/hero-bg.jpg"
 *   theme="dark"
 *   headline="Elevate Your Team"
 *   description="Collaboration made simple"
 *   ctaText="Learn More"
 *   ctaLink="/about"
 * />
 */
