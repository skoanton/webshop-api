export type Item = {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    images:      string[];
    category:    Category;
}

export type Category = {
    id:         number;
    name:       Name;
    image:      string;
    creationAt: Date;
    updatedAt:  Date;
}

export type Name = "Clothes" | "Electronics" | "Uncharter" | "Shoes" | "Miscellaneous" | "Waoov nice product";

