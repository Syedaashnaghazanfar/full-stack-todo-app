/**
 * QuickActionCards Component
 *
 * Renders a responsive grid of quick-action cards with icons, titles, descriptions,
 * and navigation links. Each card is clickable and includes hover animations.
 * Cards appear with staggered animations using Framer Motion.
 *
 * Usage:
 * <QuickActionCards cards={quickActionData} />
 *
 * Responsive Behavior:
 * - Mobile: 1 column grid
 * - Tablet: 2 column grid
 * - Desktop: 3 column grid
 *
 * @see /specs/001-phase2-homepage-ui/spec.md - Phase 4: T025-T033
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../shared/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the shape of a quick action card
export interface QuickActionCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export interface QuickActionCardsProps {
  cards: QuickActionCard[];
  className?: string;
}

/**
 * QuickActionCards Component
 *
 * Renders a responsive grid of quick-action cards with icons, titles, descriptions,
 * and navigation links. Each card is clickable and includes hover animations.
 * Cards appear with staggered animations using Framer Motion.
 */
export const QuickActionCards: React.FC<QuickActionCardsProps> = ({
  cards,
  className
}) => {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    hover: {
      y: -5,
      scale: 1.02
    }
  };

  return (
    <section
      className={cn('w-full py-12 px-4 sm:px-6 lg:px-12', className)}
      aria-labelledby="quick-actions-title"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          id="quick-actions-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent sm:text-5xl"
        >
          Quick Actions
        </motion.h2>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            role="list"
            aria-label="Quick action cards"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={itemVariants}
                whileHover="hover"
                layout
                role="listitem"
              >
                <a
                  href={card.link}
                  target={card.target || '_self'}
                  rel={card.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="block h-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl"
                  aria-label={`${card.title}: ${card.description}`}
                  tabIndex={0}
                >
                  <Card className="relative h-full flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-xl border-purple-100 dark:border-purple-900 bg-white dark:bg-gray-800 overflow-hidden group rounded-xl">
                    {/* Icon container with gradient background */}
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 p-4 shadow-lg">
                      <card.icon
                        className="h-12 w-12 text-white"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">
                      {card.description}
                    </p>

                    {/* CTA text */}
                    <span className="mt-auto inline-flex items-center text-sm font-semibold text-purple-600 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-300 transition-colors">
                      Learn more
                      <svg
                        className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>

                    {/* Bottom gradient accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

QuickActionCards.displayName = 'QuickActionCards';