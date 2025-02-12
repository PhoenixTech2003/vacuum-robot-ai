import type { VacuumRobot, Room } from "@/types/types"

export function VacuumRobotAgent(data: VacuumRobot): Room[] {
  return data.allRooms.map((room) => {
    if (room.state === "dirty") {
      console.log(`Cleaning Room ${room.roomName}`)
      return { ...room, state: "clean" }
    }
    console.log(`Room ${room.roomName} is already clean`)
    return room
  })
}

