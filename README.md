# Task Manager

A simple full-stack Task Manager built with **Next.js** and **Tailwind CSS**.

## Features

- Add new tasks with title validation
- View all tasks with status (Pending / Completed)
- Mark tasks as completed via API
- Loading, success, and error state handling
- Clean, minimal UI

## Data Storage

> **In-memory storage** is used for task persistence. Data resets when the server restarts.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | /api/tasks       | Fetch all tasks          |
| POST   | /api/tasks       | Create a new task        |
| PUT    | /api/tasks/:id   | Mark a task as completed |

## Tech Stack

- Next.js 16 (App Router + API Routes)
- React 19 (useState, useEffect, useCallback)
- Tailwind CSS 4
- In-memory storage (no external database required)
