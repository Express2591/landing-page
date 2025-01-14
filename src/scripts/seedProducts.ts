import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

const initialProducts = [
  {
    id: "prod_1",
    name: "Stanley Thermos",
    price: 35,
    description: "Keeps coffee hot for 24 hours. Survives being dropped. Made since 1913.",
    features: [
      "Keeps drinks hot for 24 hours",
      "Virtually indestructible",
      "Lifetime warranty",
      "Made in USA"
    ],
    imageUrl: "/stanley.jpg",
    purchaseUrl: "https://amzn.to/stanley",
    category: "Kitchen",
    addedDate: new Date().toISOString()
  },
  // Add 4-5 more products
];

async function seedProducts() {
  for (const product of initialProducts) {
    await redis.hset('products', {
      [product.id]: JSON.stringify(product)
    });
  }
  console.log('Products seeded!');
}

seedProducts();