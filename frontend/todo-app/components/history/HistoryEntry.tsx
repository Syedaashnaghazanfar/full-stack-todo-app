/**
 * HistoryEntry Component
 *
 * Displays individual history entry with color-coded action badge.
 * Shows timestamp, action type, task name, and optional description.
 *
 * Action colors: CREATED=green, UPDATED=blue, COMPLETED=purple, INCOMPLETED=yellow, DELETED=red
 *
 * @see /specs/004-frontend-backend-integration/ - History entry display
 */

"use client";

import React from "react";
import { HistoryEntry as HistoryEntryType } from "@/services/api";
import {
  Plus,
  Edit,
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

interface HistoryEntryProps {
  entry: HistoryEntryType;
  index?: number;
}

/**
 * Get action badge styling based on action type
 */
function getActionBadge(actionType: string) {
  switch (actionType) {
    case "CREATED":
      return {
        color: "bg-gradient-to-r from-green-400 to-emerald-500",
        textColor: "text-white",
        borderColor: "border-green-200 dark:border-green-800",
        glowColor: "shadow-green-200 dark:shadow-green-900",
        icon: <Plus size={16} />,
      };
    case "UPDATED":
      return {
        color: "bg-gradient-to-r from-blue-400 to-cyan-500",
        textColor: "text-white",
        borderColor: "border-blue-200 dark:border-blue-800",
        glowColor: "shadow-blue-200 dark:shadow-blue-900",
        icon: <Edit size={16} />,
      };
    case "COMPLETED":
      return {
        color: "bg-gradient-to-r from-purple-400 to-pink-500",
        textColor: "text-white",
        borderColor: "border-purple-200 dark:border-purple-800",
        glowColor: "shadow-purple-200 dark:shadow-purple-900",
        icon: <CheckCircle2 size={16} />,
      };
    case "INCOMPLETED":
      return {
        color: "bg-gradient-to-r from-yellow-400 to-orange-500",
        textColor: "text-white",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        glowColor: "shadow-yellow-200 dark:shadow-yellow-900",
        icon: <Circle size={16} />,
      };
    case "DELETED":
      return {
        color: "bg-gradient-to-r from-red-400 to-rose-500",
        textColor: "text-white",
        borderColor: "border-red-200 dark:border-red-800",
        glowColor: "shadow-red-200 dark:shadow-red-900",
        icon: <Trash2 size={16} />,
      };
    default:
      return {
        color: "bg-gradient-to-r from-gray-400 to-slate-500",
        textColor: "text-white",
        borderColor: "border-gray-200 dark:border-gray-800",
        glowColor: "shadow-gray-200 dark:shadow-gray-900",
        icon: <Clock size={16} />,
      };
  }
}

export default function HistoryEntry({ entry, index = 0 }: HistoryEntryProps) {
  const { action_type, task_id, description, timestamp } = entry;
  const badge = getActionBadge(action_type);

  // Format timestamp
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative pl-8 pb-6 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-transparent dark:from-purple-800 dark:via-purple-700" />

      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.05 + 0.2, type: "spring", stiffness: 200 }}
        className={`absolute left-0 top-2 w-6 h-6 rounded-full ${badge.color} ${badge.glowColor} shadow-lg flex items-center justify-center ring-4 ring-white dark:ring-gray-900`}
      >
        <div className={badge.textColor}>{badge.icon}</div>
      </motion.div>

      {/* Entry Card */}
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${badge.borderColor} overflow-hidden`}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            {/* Action Badge */}
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold ${badge.color} ${badge.textColor} shadow-md`}>
                {badge.icon}
                {action_type}
              </span>
            </div>

            {/* Timestamp */}
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{formattedDate}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end gap-1 mt-1">
                <Clock size={12} />
                {formattedTime}
              </div>
            </div>
          </div>

          {/* Task Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">
                Task ID
              </span>
              <code className="text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {task_id.substring(0, 8)}...
              </code>
            </div>

            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.3 }}
                className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-1 border-l-2 border-purple-200 dark:border-purple-800 ml-2"
              >
                <span className="pl-3">{description}</span>
              </motion.p>
            )}
          </div>
        </div>

        {/* Gradient Overlay at Bottom */}
        <div className={`h-1 ${badge.color}`} />
      </motion.div>
    </motion.div>
  );
}
