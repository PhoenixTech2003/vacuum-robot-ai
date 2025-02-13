"use client"

import { useState } from "react"
import type { Task } from "@/types/types"
import Sidebar from "./components/Sidebar"
import Task1 from "./components/Task1"
import Task2 from "./components/Task2"

export default function Home() {
  const [selectedTask, setSelectedTask] = useState<Task>("task1")

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Vacuum Cleaner Simulation</h1>
        {selectedTask === "task1" ? <Task1 /> : <Task2 />}
      </main>
    </div>
  )
}

