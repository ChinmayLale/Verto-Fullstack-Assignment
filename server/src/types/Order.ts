export interface Order {
    id: number;
    userId: number;
    productIds: number[];
    totalAmount: number;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}