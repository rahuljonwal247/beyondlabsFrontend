"use client";

import { useState } from "react";

export default function TaskInput({ onAdd, isAdding }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }
    setError("");
    try {
      await onAdd(title.trim());
      setTitle("");
    } catch (err) {
      setError(err.message || "Failed to add task.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="task-title"
        className="block text-sm font-semibold text-ink mb-3"
      >
        Add a new task
      </label>
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder="What needs to be done?"
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm text-ink
                       placeholder:text-muted/60 focus:outline-none focus:border-accent focus:bg-white
                       focus:ring-4 focus:ring-accent/10 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim() || isAdding}
          className="px-6 py-3.5 bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-semibold rounded-xl
                     shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0
                     active:translate-y-0 transition-all duration-200 whitespace-nowrap"
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </span>
          ) : (
            "Add Task"
          )}
        </button>
      </div>
      {error && (
        <div className="mt-3 flex items-center gap-2 text-danger text-xs font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}
    </form>
  );
}
