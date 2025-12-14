/**
 * Analytics Dashboard Page
 *
 * Displays analytics dashboard with Recharts visualizations:
 * - Weekly bar chart (completed vs incomplete tasks)
 * - Metric cards (total stats)
 * - Activity timeline (operations over time)
 *
 * Uses purple theme from chartConfig.ts (#7c3aed)
 *
 * @see /specs/004-frontend-backend-integration/ - Analytics dashboard
 */

"use client";

import React, { useEffect } from "react";
import { useStats } from "@/hooks/useStats";
import { ArrowLeft, RefreshCw, BarChart3, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import WeeklyChart from "@/components/analytics/WeeklyChart";
import MetricCard from "@/components/analytics/MetricCard";
import ActivityTimeline from "@/components/analytics/ActivityTimeline";
import CompletionPieChart from "@/components/analytics/CompletionPieChart";

// Transform WeeklyStats into chart data format
interface WeeklyStatsData {
  tasks_created_this_week: number;
  tasks_completed_this_week: number;
  total_tasks: number;
  total_completed: number;
  total_incomplete: number;
}

function transformWeeklyData(stats: WeeklyStatsData) {
  return [
    {
      day: "This Week",
      completed: stats.tasks_completed_this_week,
      incomplete: stats.tasks_created_this_week - stats.tasks_completed_this_week,
    }
  ];
}


export default function AnalyticsPage() {
  const router = useRouter();
  const { stats, loading, error, fetchStats, clearError } = useStats();

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Refresh */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:shadow-none"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh Data
          </motion.button>
        </div>

        {/* Page Header with Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-2">
                <TrendingUp size={16} className="text-purple-500" />
                Track your productivity and task completion trends
              </p>
            </div>
          </div>
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
        {loading && !stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600 shadow-lg" />
            </div>
            <p className="mt-6 text-lg font-medium text-purple-600 dark:text-purple-400">
              Loading your analytics...
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Crunching the numbers for you
            </p>
          </motion.div>
        )}

        {/* Analytics Content */}
        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Metric Cards Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <MetricCard
                title="Total Tasks"
                value={stats.total_tasks}
                type="total"
              />
              <MetricCard
                title="Total Completed"
                value={stats.total_completed}
                type="completed"
              />
              <MetricCard
                title="Total Incomplete"
                value={stats.total_incomplete}
                type="incomplete"
              />
              <MetricCard
                title="This Week Created"
                value={stats.tasks_created_this_week}
                type="created"
              />
            </motion.div>

            {/* Charts Row - Bar Chart and Pie Chart Side by Side */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Weekly Bar Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-purple-900">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  This Week&apos;s Activity
                </h2>
                <WeeklyChart data={transformWeeklyData(stats)} />
              </div>

              {/* Completion Pie Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-purple-900">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  Completion Status
                </h2>
                <CompletionPieChart
                  completed={stats.total_completed}
                  incomplete={stats.total_incomplete}
                />
              </div>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-purple-900"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Activity Timeline
              </h2>
              <ActivityTimeline data={transformWeeklyData(stats)} />
            </motion.div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-20 text-center border border-purple-100 dark:border-purple-900"
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                <BarChart3 className="h-16 w-16 text-purple-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              No Analytics Data
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Start creating and completing tasks to see your analytics
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
