'use client';

/**
 * Button Component
 *
 * Reusable button with purple theme variants and support for links.
 * Includes primary and secondary variants with hover states.
 *
 * Usage:
 * <Button variant="primary" onClick={handleClick}>Click Me</Button>
 * <Button variant="secondary" href="/about">Learn More</Button>
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  className,
  onClick,
  type = 'button',
}) => {
  const baseStyles = cn(
    // Base button styles
    'inline-flex items-center justify-center',
    'rounded-lg px-6 py-3',
    'font-medium text-base',
    'transition-all duration-300',
    'focus:outline-none focus:ring-4',
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed',
    // Full width option
    fullWidth && 'w-full',
    // Variant styles
    variant === 'primary' && [
      'bg-purple-600 text-white',
      'hover:bg-purple-700',
      'focus:ring-purple-300',
      'dark:bg-purple-600 dark:hover:bg-purple-700',
      'dark:focus:ring-purple-800',
      'shadow-md hover:shadow-lg',
    ],
    variant === 'secondary' && [
      'bg-purple-200 text-purple-700',
      'hover:bg-purple-300',
      'focus:ring-purple-200',
      'dark:bg-purple-900/50 dark:text-purple-200',
      'dark:hover:bg-purple-800/50',
      'dark:focus:ring-purple-900',
    ],
    variant === 'outline' && [
      'border-2 border-purple-600 text-purple-600',
      'hover:bg-purple-50',
      'focus:ring-purple-300',
      'dark:border-purple-400 dark:text-purple-400',
      'dark:hover:bg-purple-900/30',
      'dark:focus:ring-purple-800',
    ],
    className
  );

  const MotionComponent = motion.button;

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles}>
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center w-full"
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <MotionComponent
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </MotionComponent>
  );
};

Button.displayName = 'Button';
