"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchTasks, createTask, markTaskComplete } from "@/lib/api";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : "Could not connect to server."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAdd = async (title) => {
    setIsAdding(true);
    try {
      const newTask = await createTask(title);
      setTasks((prev) => [newTask, ...prev]);
      showSuccess("Task added successfully!");
    } finally {
      setIsAdding(false);
    }
  };

  const handleComplete = async (id) => {
    const updated = await markTaskComplete(id);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    showSuccess("Task completed!");
  };

  const pending = tasks.filter((t) => t.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Card */}
        <header className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Task Manager
              </h1>
              <p className="text-white/60 text-sm mt-0.5">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        {!isLoading && tasks.length > 0 && (
          <div className="flex gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Total</p>
              <p className="text-white text-2xl font-bold">{tasks.length}</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
              <p className="text-amber-200/70 text-xs font-medium uppercase tracking-wider">Pending</p>
              <p className="text-white text-2xl font-bold">{pending.length}</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
              <p className="text-emerald-200/70 text-xs font-medium uppercase tracking-wider">Done</p>
              <p className="text-white text-2xl font-bold">{completed.length}</p>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {successMsg && (
          <div className="mb-4 px-4 py-3 bg-emerald-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-emerald-500/25 animate-slide-in">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Main Card */}
        <div
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 overflow-hidden animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Input Section */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <TaskInput onAdd={handleAdd} isAdding={isAdding} />
          </div>

          {/* Task List Section */}
          <div className="p-6 sm:p-8">
            <TaskList
              tasks={tasks}
              onComplete={handleComplete}
              isLoading={isLoading}
              error={fetchError}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-white/30 text-xs font-medium">
            Task Manager &middot; Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  );
}
