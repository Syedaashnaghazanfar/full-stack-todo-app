"use client";

/**
 * LoginForm Component
 *
 * User login form with email/password validation and purple theme.
 * Handles form state, validation, submission, and error display.
 *
 * Features:
 * - Real-time email validation (EmailStr regex)
 * - Password field with secure input
 * - Disabled submit button when form invalid
 * - Loading state during API call
 * - Lucide icons for visual enhancement
 * - Purple gradient styling matching homepage
 *
 * @see /specs/006-auth-integration/spec.md - FR-002, FR-004, FR-013, FR-014
 */

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';
import { login } from '@/services/authApi';
import { loginSuccess, loginError } from '@/utils/authAlerts';
import type { LoginFormData } from '@/types/auth';

/**
 * Email validation regex (EmailStr format)
 *
 * Validates: user@example.com
 * Rejects: invalid-email, @example.com, user@
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * LoginForm Component
 *
 * Renders email/password form with validation and submission handling.
 *
 * @example
 * <LoginForm />
 */
export const LoginForm: React.FC = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormData, boolean>>>({});

  /**
   * Validate email field
   *
   * @param email - Email address to validate
   * @returns Error message or empty string if valid
   */
  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  /**
   * Validate password field
   *
   * @param password - Password to validate
   * @returns Error message or empty string if valid
   */
  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Password is required';
    }
    return '';
  };

  /**
   * Check if form is valid
   *
   * @returns True if all fields valid, false otherwise
   */
  const isFormValid = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    return !emailError && !passwordError;
  };

  /**
   * Handle input change
   *
   * Updates form data and validates field in real-time.
   *
   * @param e - Input change event
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate field if already touched
    if (touched[name as keyof LoginFormData]) {
      const error = name === 'email' ? validateEmail(value) : validatePassword(value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  /**
   * Handle input blur
   *
   * Marks field as touched and validates.
   *
   * @param e - Input blur event
   */
  const handleBlur = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = name === 'email' ? validateEmail(value) : validatePassword(value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  /**
   * Handle form submission
   *
   * Validates form, calls login API, shows success/error alerts.
   *
   * @param e - Form submit event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Final validation
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);

    try {
      // Call login API
      await login(formData.email, formData.password);

      // Show success alert
      await loginSuccess();

      // Redirect to tasks page
      router.push('/tasks');
    } catch (error) {
      // Show error alert with API message
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      loginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md" noValidate>
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-purple-700">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-purple-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            className={`
              block w-full pl-10 pr-3 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-colors
              ${touched.email && errors.email ? 'border-red-500' : 'border-purple-300'}
            `}
            placeholder="you@example.com"
            required
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
          />
        </div>
        {touched.email && errors.email && (
          <p id="email-error" className="text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-purple-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-purple-400" aria-hidden="true" />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            className={`
              block w-full pl-10 pr-3 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-colors
              ${touched.password && errors.password ? 'border-red-500' : 'border-purple-300'}
            `}
            placeholder="Enter your password"
            required
            aria-invalid={touched.password && !!errors.password}
            aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
          />
        </div>
        {touched.password && errors.password && (
          <p id="password-error" className="text-sm text-red-600" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !isFormValid()}
        className={`
          w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg
          font-semibold text-white
          bg-gradient-to-r from-purple-600 to-pink-600
          hover:from-purple-700 hover:to-pink-700
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500
          transition-all duration-200
          transform hover:scale-105 active:scale-95
        `}
        aria-label="Log in to account"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            Logging In...
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" aria-hidden="true" />
            Log In
          </>
        )}
      </button>
    </form>
  );
};

LoginForm.displayName = 'LoginForm';
