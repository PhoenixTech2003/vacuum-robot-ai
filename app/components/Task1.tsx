"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Room, CleaningStatus } from "@/types/types"
import { VacuumRobotAgent } from "../VacuumRobotAgent"
import { Loader2 } from "lucide-react"

const initialRooms: Room[] = [
  { roomName: "A", state: "dirty", position: { x: 0, y: 0 } },
  { roomName: "B", state: "dirty", position: { x: 220, y: 0 } },
]



export default function Task1() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [vacuumPosition, setVacuumPosition] = useState({ x: 0, y: 0 })
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [cleaningStatus, setCleaningStatus] = useState<CleaningStatus>("idle")
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (cleaningStatus === "cleaning") {
      const timer = setTimeout(() => {
        // Clean the current room if it's dirty
        const updatedRooms = VacuumRobotAgent({ allRooms: [rooms[currentRoomIndex]], position: vacuumPosition })
        setRooms(rooms.map((room, index) => (index === currentRoomIndex ? updatedRooms[0] : room)))

        const nextRoomIndex = (currentRoomIndex + 1) % rooms.length
        setCurrentRoomIndex(nextRoomIndex)
        setVacuumPosition(rooms[nextRoomIndex].position)

        // Increment cycle count
        setCycleCount((prevCount) => prevCount + 1)

        // Randomize rooms every 5 cycles
        if (cycleCount % 5 === 4) {
          setRooms((prevRooms) => prevRooms.map((room) => (Math.random() > 0.7 ? { ...room, state: "dirty" } : room)))
        }
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [cleaningStatus, currentRoomIndex, rooms, vacuumPosition, cycleCount])

  const startCleaning = () => {
    setCleaningStatus("cleaning")
    setCurrentRoomIndex(0)
    setVacuumPosition(rooms[0].position)
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
      <div className="relative w-[460px] h-[220px] border-4 border-gray-300 rounded-lg bg-white shadow-lg">
        {rooms.map((room) => (
          <div
            key={room.roomName}
            className={`absolute w-[220px] h-[200px] border-2 border-gray-300 rounded-lg ${
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
          className="absolute w-[60px] h-[60px] bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
          animate={vacuumPosition}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-[40px] h-[40px] bg-gray-600 rounded-full flex items-center justify-center">
            <div className="w-[20px] h-[20px] bg-gray-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>
      <div className="mt-4 text-lg">Cycle Count: {cycleCount}</div>
    </div>
  )
}

