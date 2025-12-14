/**
 * MetricCard Component
 *
 * Displays a metric card with icon, title, and value.
 * Used for total completed/incomplete task counts.
 *
 * Completed: CheckCircle2 icon with purple background
 * Incomplete: Circle icon with gray background
 *
 * @see /specs/004-frontend-backend-integration/ - Metric cards display
 */

"use client";

import React from "react";
import { CheckCircle2, Circle, ListTodo, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: number;
  type: "completed" | "incomplete" | "total" | "created";
}

export default function MetricCard({ title, value, type }: MetricCardProps) {
  const config = {
    completed: {
      icon: <CheckCircle2 size={28} className="text-white" />,
      gradient: "from-green-400 to-emerald-500",
      textColor: "text-green-600 dark:text-green-400",
      message: "Great progress!"
    },
    incomplete: {
      icon: <Circle size={28} className="text-white" />,
      gradient: "from-yellow-400 to-orange-500",
      textColor: "text-orange-600 dark:text-orange-400",
      message: "Keep going!"
    },
    total: {
      icon: <ListTodo size={28} className="text-white" />,
      gradient: "from-purple-400 to-pink-500",
      textColor: "text-purple-600 dark:text-purple-400",
      message: "All tasks"
    },
    created: {
      icon: <Plus size={28} className="text-white" />,
      gradient: "from-blue-400 to-cyan-500",
      textColor: "text-blue-600 dark:text-blue-400",
      message: "This week"
    }
  }[type];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-purple-100 dark:border-purple-900 hover:shadow-xl transition-all group overflow-hidden"
    >
      <div className="flex items-center gap-4 mb-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${config.gradient} shadow-lg`}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <p className={`text-3xl font-bold ${config.textColor} mt-1`}>
            {value}
          </p>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${config.gradient} inline-block`} />
          <span>{config.message}</span>
        </div>
      </div>

      {/* Hover Gradient Bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
    </motion.div>
  );
}
