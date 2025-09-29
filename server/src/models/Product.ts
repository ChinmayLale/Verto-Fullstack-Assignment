// src/models/Product.ts
// when integrated DB We will change this to DB Model
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