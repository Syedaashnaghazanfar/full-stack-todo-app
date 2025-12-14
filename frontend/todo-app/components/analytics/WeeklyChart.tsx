/**
 * WeeklyChart Component
 *
 * Displays weekly task completion data as a bar chart using Recharts.
 * Shows completed vs incomplete tasks for the current week.
 * Uses purple theme colors from chartConfig.ts (#7c3aed, #a78bfa).
 *
 * @see /specs/004-frontend-backend-integration/ - Weekly analytics chart
 */

"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS, CHART_CONFIG } from "@/lib/chartConfig";

interface DayData {
  day: string;
  completed: number;
  incomplete: number;
}

interface WeeklyChartProps {
  data: DayData[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  // If no data, show empty state
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>No weekly data available</p>
      </div>
    );
  }

  // Format data for Recharts (ensure day names are short)
  const formattedData = data.map((item) => ({
    ...item,
    day: item.day.substring(0, 3), // Mon, Tue, Wed, etc.
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={formattedData}
        margin={CHART_CONFIG.margin}
        barSize={CHART_CONFIG.barSize}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={CHART_COLORS.gray.light}
          opacity={0.3}
        />
        <XAxis
          dataKey="day"
          stroke={CHART_COLORS.gray.medium}
          style={{
            fontSize: "14px",
            fontWeight: "500",
          }}
        />
        <YAxis
          stroke={CHART_COLORS.gray.medium}
          style={{
            fontSize: "14px",
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: `1px solid ${CHART_COLORS.purple.light}`,
            borderRadius: "8px",
            padding: "12px",
          }}
          cursor={{ fill: CHART_COLORS.gray.light, opacity: 0.2 }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />
        <Bar
          dataKey="completed"
          name="Completed"
          fill={CHART_COLORS.green.main}
          radius={[8, 8, 0, 0]}
          animationDuration={CHART_CONFIG.animationDuration}
        />
        <Bar
          dataKey="incomplete"
          name="Incomplete"
          fill={CHART_COLORS.orange.main}
          radius={[8, 8, 0, 0]}
          animationDuration={CHART_CONFIG.animationDuration}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
