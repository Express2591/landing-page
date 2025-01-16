export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    features: string[];
    imageUrl: string;
    purchaseUrl: string;
    affiliate_url?: string;
    category: string;
    addedDate: string;
    scheduledDate?: string;
  }