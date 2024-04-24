export type Item = {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    image:      string;
    category:    Category;
}

export type Category = "men's clothing" | "jewelery" | "electronics" | "women's clothing";
