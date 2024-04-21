import { Name } from "./itemsType";

export type Filters = {
    categories: Name[];
    priceRange: {
        minPrice: number,
        maxPrice: number
    }
    searchString: string,
}
