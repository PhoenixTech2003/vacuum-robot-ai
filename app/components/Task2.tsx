"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Room, CleaningStatus } from "@/types/types"
import { VacuumRobotAgent } from "../VacuumRobotAgent"
import { Loader2 } from "lucide-react"

const initialRooms: Room[] = [
  { roomName: "A", state: "dirty", position: { x: 0, y: 0 } },
  { roomName: "B", state: "dirty", position: { x: 240, y: 0 } },
  { roomName: "C", state: "dirty", position: { x: 480, y: 0 } },
]

// Define corridor waypoints for each room transition
const getWaypoints = (fromRoom: Room, toRoom: Room) => {
  // First go down the vertical corridor
  const point1 = { x: fromRoom.position.x + 80, y: 160 }
  // Then move horizontally
  const point2 = { x: toRoom.position.x + 80, y: 160 }
  // Finally go up to the destination room
  const point3 = { x: toRoom.position.x + 80, y: 70 }
  return [point1, point2, point3]
}

export default function Task2() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [vacuumPosition, setVacuumPosition] = useState({ x: 80, y: 70 })
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [cleaningStatus, setCleaningStatus] = useState<CleaningStatus>("idle")
  const [cycleCount, setCycleCount] = useState(0)
  const [currentWaypoint, setCurrentWaypoint] = useState(0)
  const [waypoints, setWaypoints] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    if (cleaningStatus === "cleaning") {
      const timer = setTimeout(() => {
        if (waypoints.length > 0 && currentWaypoint < waypoints.length) {
          // Move through waypoints
          setVacuumPosition(waypoints[currentWaypoint])
          setCurrentWaypoint((prev) => prev + 1)
        } else {
          // Clean current room and prepare for next room
          const updatedRooms = VacuumRobotAgent({ allRooms: [rooms[currentRoomIndex]], position: vacuumPosition })
          setRooms(rooms.map((room, index) => (index === currentRoomIndex ? updatedRooms[0] : room)))

          const nextRoomIndex = (currentRoomIndex + 1) % rooms.length

          // Calculate new waypoints for next room transition
          const newWaypoints = getWaypoints(rooms[currentRoomIndex], rooms[nextRoomIndex])
          setWaypoints(newWaypoints)
          setCurrentWaypoint(0)

          setCurrentRoomIndex(nextRoomIndex)

          // Increment cycle count when completing a full cycle
          if (nextRoomIndex === 0) {
            setCycleCount((prevCount) => prevCount + 1)
            // Randomize rooms every 5 cycles
            if (cycleCount % 2 === 0) {
              setRooms((prevRooms) =>
                prevRooms.map((room) => (Math.random() > 0.7 ? { ...room, state: "dirty" } : room)),
              )
            }
          }
        }
      }, 800) // Shorter delay for smoother movement
      return () => clearTimeout(timer)
    }
  }, [cleaningStatus, currentRoomIndex, rooms, vacuumPosition, cycleCount, waypoints, currentWaypoint])

  const startCleaning = () => {
    setCleaningStatus("cleaning")
    setCurrentRoomIndex(0)
    setVacuumPosition({ x: rooms[0].position.x + 80, y: 70 })
    setWaypoints([])
    setCurrentWaypoint(0)
    setCycleCount(0)
  }

  const stopCleaning = () => {
    setCleaningStatus("stopped")
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={startCleaning}
          disabled={cleaningStatus === "cleaning"}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {cleaningStatus === "cleaning" ? (
            <span className="flex items-center">
              Cleaning <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </span>
          ) : (
            "Start Cleaning"
          )}
        </button>
        <button
          onClick={stopCleaning}
          disabled={cleaningStatus !== "cleaning"}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Stop
        </button>
      </div>
      <div className="relative w-[720px] h-[220px] border-4 border-gray-300 rounded-lg bg-white shadow-lg">
        {/* Horizontal corridor */}
        <div className="absolute left-0 bottom-[20px] w-full h-[40px] bg-gray-200"></div>

        {/* Vertical corridors */}
        {rooms.map((room) => (
          <div
            key={`corridor-${room.roomName}`}
            className="absolute w-[40px] h-[90px] bg-gray-200"
            style={{
              left: room.position.x + 90,
              top: "130px",
            }}
          />
        ))}

        {rooms.map((room, index) => (
          <div
            key={room.roomName}
            className={`absolute w-[200px] h-[120px] border-2 border-gray-300 rounded-lg ${
              room.state === "clean" ? "bg-green-200" : "bg-red-200"
            } transition-colors duration-300 ease-in-out`}
            style={{ left: room.position.x, top: room.position.y }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-2xl font-bold">{room.roomName}</p>
              <p className="text-lg capitalize">{room.state}</p>
            </div>
          </div>
        ))}
        <motion.div
          className="absolute w-[40px] h-[40px] bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
          animate={vacuumPosition}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-[26px] h-[26px] bg-gray-600 rounded-full flex items-center justify-center">
            <div className="w-[13px] h-[13px] bg-gray-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>
      <div className="mt-4 text-lg">Cycle Count: {cycleCount}</div>
    </div>
  )
}

