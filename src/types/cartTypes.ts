import { Item } from "./itemsType"

export type Cart = {
    items:Item[],
    totalCost: number
}