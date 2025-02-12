export type VacuumRobot = {
    allRooms: Room[]

}

export type Environment = {
    rooms :Room[]
    agent: (data:VacuumRobot) => {state:string, roomName:string}[];
}

export type Room = {
    state : "clean" | "dirty"
    roomName : string
}