export type LocosState = Locos

export type Loco = {
    name: string,
    throttle: ThrottleState
}

export type Locos = Loco[]

export type ThrottleState = {
    speed: number,
    direction: number
};