/**
 * Task Detail Page
 *
 * Displays a single task with view/edit mode toggle.
 * Allows users to update task title and description.
 *
 * @see /specs/004-frontend-backend-integration/ - Edit task details
 */

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import { ArrowLeft, Edit2, Save, X } from "lucide-react";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const { tasks, getTask, updateTask, loading, error } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Find task from existing tasks or fetch it
  const task = tasks.find((t) => t.id === taskId);

  useEffect(() => {
    if (!task && !loading) {
      getTask(taskId).catch((err) => {
        console.error("Failed to load task:", err);
      });
    }
  }, [taskId, task, loading]);

  // Initialize edit fields when task loads
  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description || "");
    }
  }, [task]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description || "");
    }
  };

  const handleSave = async () => {
    if (!editedTitle.trim()) return;

    try {
      setIsSaving(true);
      await updateTask(taskId, editedTitle, editedDescription);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save task:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && !task) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading task...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">Task not found</p>
            <button
              onClick={() => router.push("/tasks")}
              className="mt-4 text-purple-600 hover:text-purple-700 underline"
            >
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with Back Button */}
        <button
          onClick={() => router.push("/tasks")}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
        >
          <ArrowLeft size={20} />
          Back to Tasks
        </button>

        {/* Task Detail Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* View Mode */}
          {!isEditing ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {task.title}
                  </h1>
                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Created {new Date(task.created_at).toLocaleDateString()}</span>
                    {task.completed_at && (
                      <span>Completed {new Date(task.completed_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                  Edit
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                  {task.description || "No description provided"}
                </p>
              </div>

              {/* Status */}
              <div>
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Status
                </h2>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    task.is_completed
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {task.is_completed ? "Completed" : "Active"}
                </span>
              </div>
            </>
          ) : (
            /* Edit Mode */
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Edit Task
              </h1>

              <div className="space-y-4 mb-6">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Task title..."
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Task description..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving || !editedTitle.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
