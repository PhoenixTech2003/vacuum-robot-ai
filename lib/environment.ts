import { Environment } from "@/types/types";


export function schoolRooms({rooms, agent}:Environment){
    const data = agent({allRooms:rooms})
    console.log("NEW STATUS OF ROOMS")
    console.log(data)
}