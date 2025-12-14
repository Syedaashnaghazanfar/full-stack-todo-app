/**
 * Card Component
 *
 * Reusable card container with purple theme styling and optional click handler.
 * Supports responsive padding and hover effects.
 *
 * Usage:
 * <Card onClick={() => navigate('/feature')}>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  hover = true
}) => {
  const isClickable = !!onClick;

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        // Base styles
        'rounded-lg border-2 p-6',
        // Purple theme
        'border-purple-200 bg-purple-50',
        // Dark mode support
        'dark:border-purple-800 dark:bg-purple-950/30',
        // Hover effects (only if clickable or hover prop is true)
        (isClickable || hover) && [
          'transition-all duration-300',
          'hover:shadow-lg hover:shadow-purple-200/50',
          'dark:hover:shadow-purple-900/50',
        ],
        // Clickable styles
        isClickable && [
          'cursor-pointer',
          'hover:border-purple-300 hover:-translate-y-1',
          'dark:hover:border-purple-700',
          'active:translate-y-0',
        ],
        className
      )}
      // Framer Motion animations
      whileHover={isClickable ? { scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

Card.displayName = 'Card';
