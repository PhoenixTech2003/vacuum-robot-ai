import type { VacuumRobot } from "@/types/types";

export function VacuumRobotAgent(data: VacuumRobot) {
  const cleanedRooms = data.allRooms.map((room) => {
    if (room.state === "dirty") {
      console.log(`Cleaning Room ${room.roomName}`);
      console.log("Moving to next room");
      return { ...room, state: "clean" };
    }
    console.log(`Room ${room.roomName} is already clean moving to next room`);
    return room;
  });
  console.log("Finished cleaning all rooms terminating now")
  return cleanedRooms

}
