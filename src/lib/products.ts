export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    features: string[];
    imageUrl: string;
    purchaseUrl: string;
    category: string;
    addedDate: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "La Pavoni Europiccola",
        description: "Handmade copper espresso art since 1961. Manual lever creates perfect crema. Made in Milan.",
        image: "/lapavoni.jpg",
        price: 299,
        features: [
            "Manual lever operation",
            "Copper and brass construction",
            "Made in Milan since 1961",
            "Perfect crema every time",
            "Lifetime durability"
        ],
        imageUrl: "/lapavoni.jpg",
        purchaseUrl: "https://example.com/lapavoni",
        category: "Kitchen",
        addedDate: new Date().toISOString()
    },
    {
        id: 2,
        name: "Kaweco Sport Pen",
        description: "Iconic 1935 German pocket pen. Expands to full size. Makes writing a joy.",
        image: "/kaweco.jpg",
        price: 80,
        features: [
            "Pocket sized design",
            "Expands to full size",
            "German engineering",
            "Brass construction",
            "Perfect everyday carry"
        ],
        imageUrl: "/kaweco.jpg",
        purchaseUrl: "https://example.com/kaweco",
        category: "Writing",
        addedDate: new Date().toISOString()
    },
    {
        id: 3,
        name: "Snow Peak Titanium Mug",
        description: "Weightless but indestructible Japanese design. Perfect for coffee anywhere.",
        image: "/snowpeak.jpg",
        price: 60,
        features: [
            "Titanium construction",
            "Ultralight design",
            "Perfect heat retention",
            "Develops unique patina",
            "Lifetime guarantee"
        ],
        imageUrl: "/snowpeak.jpg",
        purchaseUrl: "https://example.com/snowpeak",
        category: "Outdoor",
        addedDate: new Date().toISOString()
    }
];