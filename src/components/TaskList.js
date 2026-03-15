"use client";

import { useState } from "react";

function TaskItem({ task, onComplete, index }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const isCompleted = task.status === "completed";

  const handleComplete = async () => {
    setIsUpdating(true);
    setError("");
    try {
      await onComplete(task._id);
    } catch (err) {
      setError(err.message || "Failed to update task.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <li
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div
        className={`group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200
                    ${isCompleted
                      ? "bg-emerald-50/50 border-emerald-100"
                      : "bg-white border-gray-100 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5"
                    }`}
      >
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-9 h-9 rounded-full bg-done flex items-center justify-center animate-check-pop shadow-md shadow-done/25">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full border-2 border-gray-200 group-hover:border-accent/40 transition-colors flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-pending" />
            </div>
          )}
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium leading-relaxed ${
              isCompleted ? "line-through text-muted" : "text-ink"
            }`}
          >
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider
                          ${isCompleted
                            ? "bg-done-light text-done"
                            : "bg-pending-light text-pending"
                          }`}
            >
              {isCompleted ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Completed
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-pending animate-pulse" />
                  Pending
                </>
              )}
            </span>
          </div>
          {error && (
            <p className="mt-1 text-danger text-xs font-medium">{error}</p>
          )}
        </div>

        {/* Action */}
        {!isCompleted && (
          <button
            onClick={handleComplete}
            disabled={isUpdating}
            className="flex-shrink-0 px-4 py-2 bg-done/10 text-done text-xs font-semibold rounded-xl
                       hover:bg-done hover:text-white hover:shadow-md hover:shadow-done/25
                       disabled:opacity-40 disabled:cursor-not-allowed
                       active:scale-95 transition-all duration-200"
          >
            {isUpdating ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Updating
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Mark Complete
              </span>
            )}
          </button>
        )}
      </div>
    </li>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100">
          <div className="w-9 h-9 rounded-full skeleton" />
          <div className="flex-1 space-y-2">
            <div className="h-4 skeleton w-3/4" />
            <div className="h-3 skeleton w-20" />
          </div>
          <div className="h-8 w-28 skeleton rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function TaskList({ tasks, onComplete, isLoading, error }) {
  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-bold text-ink mb-4">Your Tasks</h2>
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-danger font-semibold text-sm mb-1">Connection Error</p>
        <p className="text-muted text-xs">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-accent-light flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="12" x2="12" y2="18" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
        <p className="text-ink font-semibold mb-1">No tasks yet</p>
        <p className="text-muted text-sm">
          Add your first task above to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-ink mb-4">Your Tasks</h2>
      <ul className="space-y-3">
        {tasks.map((task, i) => (
          <TaskItem key={task._id} task={task} onComplete={onComplete} index={i} />
        ))}
      </ul>
    </div>
  );
}
