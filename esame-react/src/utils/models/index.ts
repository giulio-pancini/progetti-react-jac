export interface Customer {
    fullName: string
    vatNumber: string
    city: string
    id?: number
}

export interface Stock {
    description: string
    cost: number
    code: number
    id?: number
}
