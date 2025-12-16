/**
 * CompletionPieChart Component
 *
 * Displays task completion status as a pie chart using Recharts.
 * Shows the proportion of completed vs incomplete tasks.
 * Uses green for completed and orange for incomplete tasks.
 *
 * @see /specs/004-frontend-backend-integration/ - Analytics dashboard
 */

"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS, CHART_CONFIG } from "@/lib/chartConfig";

interface CompletionPieChartProps {
  completed: number;
  incomplete: number;
}

export default function CompletionPieChart({ completed, incomplete }: CompletionPieChartProps) {
  // Prepare data for pie chart
  const data = [
    { name: "Completed", value: completed, color: CHART_COLORS.green.main },
    { name: "Incomplete", value: incomplete, color: CHART_COLORS.orange.main },
  ];

  // If no data, show empty state
  if (completed === 0 && incomplete === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>No task data available</p>
      </div>
    );
  }

  // Calculate total and percentages
  const total = completed + incomplete;
  const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const incompletePercent = total > 0 ? Math.round((incomplete / total) * 100) : 0;

  // Custom label to show percentages
  const renderCustomLabel = (entry: any) => {
    const percent = total > 0 ? Math.round((entry.value / total) * 100) : 0;
    return `${percent}%`;
  };

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationDuration={CHART_CONFIG.animationDuration}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: `1px solid ${CHART_COLORS.purple.light}`,
              borderRadius: "8px",
              padding: "12px",
            }}
            formatter={(value: number) => `${value} tasks`}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Summary Stats Below Chart */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-100 dark:border-purple-900">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: CHART_COLORS.green.main }} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completed}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{completedPercent}% of total</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: CHART_COLORS.orange.main }} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Incomplete</span>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{incomplete}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{incompletePercent}% of total</p>
        </div>
      </div>
    </div>
  );
}
