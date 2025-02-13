export type Room = {
  state: "clean" | "dirty"
  roomName: string
  position: { x: number; y: number }
}

export type VacuumRobot = {
  allRooms: Room[]
  position: { x: number; y: number }
}

export type Environment = {
  rooms: Room[]
  agent: (data: VacuumRobot) => Room[]
}

export type CleaningStatus = "idle" | "cleaning" | "stopped"

export type Task = "task1" | "task2"

