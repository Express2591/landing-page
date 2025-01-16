export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "La Pavoni Europiccola",
        description: "Handmade copper espresso art since 1961. Manual lever creates perfect crema. Made in Milan.",
        image: "/lapavoni.jpg",
    },
    {
        id: 2,
        name: "Kaweco Sport Pen",
        description: "Iconic 1935 German pocket pen. Expands to full size. Makes writing a joy.",
        image: "/kaweco.jpg",
    },
    {
        id: 3, 
        name: "Snow Peak Titanium Mug",
        description: "Weightless but indestructible Japanese design. Perfect for coffee anywhere.",
        image: "/snowpeak.jpg",
    },
];