// src/types/Product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    description: string;
    brand: string;
    rating: number; // Out of 5
    discountPercentage?: number; // Optional discount
    createdAt: string; // ISO date string
  }