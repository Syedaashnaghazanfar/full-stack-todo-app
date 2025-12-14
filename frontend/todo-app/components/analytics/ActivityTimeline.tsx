/**
 * ActivityTimeline Component
 *
 * Displays task operations over time as a line chart using Recharts.
 * Shows total task activity (completed + incomplete) for the week.
 * Uses purple theme colors from chartConfig.ts.
 *
 * @see /specs/004-frontend-backend-integration/ - Activity timeline chart
 */

"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { CHART_COLORS, CHART_CONFIG } from "@/lib/chartConfig";

interface DayData {
  day: string;
  completed: number;
  incomplete: number;
}

interface ActivityTimelineProps {
  data: DayData[];
}

export default function ActivityTimeline({ data }: ActivityTimelineProps) {
  // If no data, show empty state
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>No activity data available</p>
      </div>
    );
  }

  // Calculate total activity per day
  const formattedData = data.map((item) => ({
    day: item.day.substring(0, 3), // Mon, Tue, Wed, etc.
    total: item.completed + item.incomplete,
    completed: item.completed,
    incomplete: item.incomplete,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={formattedData} margin={CHART_CONFIG.margin}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={CHART_COLORS.purple.main}
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor={CHART_COLORS.purple.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
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
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-700 rounded-lg p-3 shadow-lg">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    {data.day}
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Total: {data.total}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Completed: {data.completed} | Incomplete: {data.incomplete}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          name="Total Activity"
          stroke={CHART_COLORS.purple.main}
          strokeWidth={3}
          fill="url(#colorTotal)"
          animationDuration={CHART_CONFIG.animationDuration}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
