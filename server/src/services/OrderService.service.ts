import { Order } from "../models/Order";
import { Product } from "../models/Product";

const createOrderService = async (products: Product[]): Promise<Order> => {
  console.log("🛒 Received order request...");

  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("👨‍🍳 Preparing order...");

  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("✅ Order ready!");

  // Aggregate products by id (count duplicates)
  const productMap = new Map<number, { id: number; name: string; price: number; quantity: number }>();

  for (const p of products) {
    if (productMap.has(p.id)) {
      productMap.get(p.id)!.quantity += 1;
    } else {
      productMap.set(p.id, {
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
      });
    }
  }

  // Convert map to array
  const aggregatedProducts = Array.from(productMap.values());

  const totalAmount = aggregatedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const order: Order = {
    id: Math.floor(Math.random() * 100000), // Random ID for demo
    userId: 1, // Demo user
    productIds: aggregatedProducts.map((p) => p.id),
    products: aggregatedProducts,
    totalAmount,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return order;
};

const printOrderDetails = (order: Order) => {
  console.log("Order Details:");
  console.log(`Order ID: ${order.id}`);
  console.log(`User ID: ${order.userId}`);
  console.log(`Product IDs: ${order.productIds.join(", ")}`);
  console.log("Products:");
  order.products.forEach((p) =>
    console.log(`- ${p.name} (x${p.quantity}) - $${(p.price * p.quantity).toFixed(2)}`)
  );
  console.log(`Total Amount: $${order.totalAmount.toFixed(2)}`);
  console.log(`Status: ${order.status}`);
  console.log(`Created At: ${order.createdAt}`);
  console.log(`Updated At: ${order.updatedAt}`);
  console.log("🙏 Thank you for your order!");
};

export const OrderService = { createOrderService, printOrderDetails };
