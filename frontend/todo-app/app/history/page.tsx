/**
 * History Page
 *
 * Displays chronological log of all task operations with pagination.
 * Shows CREATED, UPDATED, COMPLETED, INCOMPLETED, DELETED actions.
 *
 * @see /specs/004-frontend-backend-integration/ - View history
 */

"use client";

import React, { useEffect } from "react";
import { useHistory } from "@/hooks/useHistory";
import { ArrowLeft, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import HistoryList from "@/components/history/HistoryList";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const router = useRouter();
  const {
    entries,
    loading,
    error,
    pagination,
    fetchHistory,
    clearError,
  } = useHistory();

  // Fetch first page on mount
  useEffect(() => {
    fetchHistory(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchHistory(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </motion.button>

        {/* Page Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Task History
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-2">
                <TrendingUp size={16} className="text-purple-500" />
                Track every action and change in your tasks
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          {!loading && pagination.total_count > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-purple-100 dark:border-purple-900">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Events</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {pagination.total_count}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-purple-100 dark:border-purple-900">
                <div className="text-sm text-gray-500 dark:text-gray-400">Current Page</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {pagination.page} / {pagination.total_pages}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-purple-100 dark:border-purple-900">
                <div className="text-sm text-gray-500 dark:text-gray-400">Showing</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {entries.length} events
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm"
          >
            <p className="font-medium">{error}</p>
            <button
              onClick={clearError}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600 shadow-lg" />
            </div>
            <p className="mt-6 text-lg font-medium text-purple-600 dark:text-purple-400">
              Loading your activity timeline...
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Gathering all your task events
            </p>
          </motion.div>
        )}

        {/* History List */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <HistoryList
              entries={entries}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
