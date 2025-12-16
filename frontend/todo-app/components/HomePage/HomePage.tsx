"use client";

/**
 * HomePage Container Component
 *
 * Main page container that orchestrates all homepage layout components.
 * Manages responsive layout, sidebar visibility, and component composition.
 *
 * Layout Structure:
 * - Navigation: Fixed top header with hamburger menu (mobile) and desktop links
 * - Sidebar: Collapsible left sidebar (desktop only, hidden on mobile/tablet)
 * - Main Content: Hero section + future sections (Quick Actions, System Status, Stats)
 * - Footer: Full-width footer with links and branding
 *
 * Responsive Behavior:
 * - Mobile (< 640px): Single column, hamburger menu, no sidebar
 * - Tablet (640px - 1024px): Centered content, optional sidebar on menu toggle
 * - Desktop (> 1024px): Full layout with visible sidebar
 *
 * @see /specs/001-phase2-homepage-ui/spec.md - Phase 3: T020-T021
 */

import React, { useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";
import { HeroSection } from "./HeroSection";
import { Footer } from "./Footer";
import { QuickActionCards } from "./QuickActionCards";
import { quickActionCards } from "@/data/quickActionCards";
import type { HomePageProps } from "@/types/components";

/**
 * HomePage Container Component
 *
 * Renders the complete homepage with all layout components.
 * Manages sidebar state and responsive behavior.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <HomePage />
 *
 * // With initial loading state
 * <HomePage initialLoading={true} />
 * ```
 */
export const HomePage: React.FC<HomePageProps> = ({ initialLoading = false }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { isAuthenticated } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  /**
   * Toggle sidebar visibility
   * On mobile/tablet: Show/hide overlay sidebar
   * On desktop: Expand/collapse sidebar width
   */
  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Navigation - Fixed at top */}
      <Navigation />

      {/* Main layout container - Navigation takes 4rem (h-16) */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Desktop: Always rendered, Mobile/Tablet: Conditional */}
        {isDesktop ? (
          <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
        ) : (
          // Mobile/Tablet: Render sidebar only when explicitly opened
          sidebarOpen &&
          !isDesktop && (
            <>
              {/* Backdrop overlay */}
              <div
                className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />
              {/* Mobile sidebar */}
              <div className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl dark:bg-purple-950 lg:hidden">
                <Sidebar
                  isOpen={true}
                  onToggle={() => setSidebarOpen(false)}
                  className="relative w-full border-r-0 block"
                />
              </div>
            </>
          )
        )}

        {/* Main content area */}
        <main className="flex flex-1 flex-col" role="main" aria-label="Main content">
          {/* Hero Section */}
          <HeroSection
            headline="Welcome to Your Dashboard"
            description="Streamline your workflow with our powerful, intuitive platform. Manage tasks, track progress, and collaborate seamlessly—all in one place."
            ctaText={isAuthenticated ? "Go to Tasks" : "Get Started"}
            ctaLink={isAuthenticated ? "/tasks" : "/signup"}
            backgroundImage="/task2.jpg"
          />

          {/* Phase 4: QuickActionCards */}
          <QuickActionCards cards={quickActionCards} />

          {/* Phase 5: SystemStatusWidget will be added here */}
          {/* <SystemStatusWidget refreshInterval={10000} /> */}

          {/* Phase 6: StatsPreviewArea will be added here */}
          {/* <StatsPreviewArea layout="grid" slots={6} /> */}

          {/* Footer - Inside main content to respect sidebar width */}
          <Footer />

          {/* Loading state overlay (if needed) */}
          {initialLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
                <p className="text-lg font-medium text-purple-700 dark:text-purple-300">
                  Loading your dashboard...
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

HomePage.displayName = "HomePage";

/**
 * Layout Behavior Notes:
 *
 * 1. Navigation:
 *    - Fixed at top (z-50)
 *    - Mobile: Hamburger menu with dropdown
 *    - Desktop: Horizontal navigation links
 *
 * 2. Sidebar:
 *    - Desktop (>= 1024px): Fixed left, collapsible (256px ↔ 80px)
 *    - Tablet/Mobile (< 1024px): Hidden by default
 *    - Mobile overlay: Full-screen backdrop + slide-in sidebar
 *
 * 3. Main Content:
 *    - Takes remaining width after sidebar
 *    - Responsive padding: 4 (mobile) → 8 (tablet) → 12 (desktop)
 *    - Flex column layout for stacked sections
 *
 * 4. Footer:
 *    - Full width at bottom
 *    - Sticky to bottom if content is short
 *
 * Accessibility:
 * - Semantic HTML (nav, main, footer, aside)
 * - ARIA labels for sidebar toggle and main content
 * - Keyboard navigation support
 * - Focus management for mobile menu
 * - Backdrop click to close mobile sidebar
 *
 * Performance:
 * - useResponsive hook with debounced resize listener
 * - Conditional rendering based on breakpoints
 * - Framer Motion animations respect prefers-reduced-motion
 */
