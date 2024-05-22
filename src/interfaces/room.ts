

export interface IRoom {
    name: string,
    description: string,
    cost_per_hour: number,
    x: number,
    y: number,
    width: number,
    height: number,
    sid: string
}

export interface IRoomForm {
    name: string,
    description: string,
    cost_per_hour: number,
    x: number,
    y: number,
    width: number,
    height: number
}