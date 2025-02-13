import type { Task } from "@/types/types"

type SidebarProps = {
  selectedTask: Task
  setSelectedTask: (task: Task) => void
}

export default function Sidebar({ selectedTask, setSelectedTask }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul>
        <li
          className={`cursor-pointer p-2 rounded ${selectedTask === "task1" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          onClick={() => setSelectedTask("task1")}
        >
          Task 1: Two Rooms
        </li>
        <li
          className={`cursor-pointer p-2 rounded mt-2 ${selectedTask === "task2" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          onClick={() => setSelectedTask("task2")}
        >
          Task 2: Rooms with Corridor
        </li>
      </ul>
    </div>
  )
}

