const BASE_URL = "http://localhost:8000/api/v1"

export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  category: string
  stock: number
  description: string
  brand: string
  rating: number
  discountPercentage?: number
  createdAt: string
}

export interface ApiResponse<T> {
  status: number
  message: string
  data: T
  success: boolean
}

export interface PaginatedProductsResponse {
  status: number
  message: string
  data: Product[]
  success: boolean
}

export interface OrderRequest {
  productIds: number[]
}

export interface OrderResponse {
  id: number
  userId: number
  productIds: number[]
  products: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
  totalAmount: number
  status: string
  createdAt: string
  updatedAt: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone X1",
    price: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 25,
    description: "Latest smartphone with advanced features",
    brand: "TechPro",
    rating: 4.5,
    discountPercentage: 10,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 50,
    description: "Premium wireless earbuds with noise cancellation",
    brand: "AudioMax",
    rating: 4.7,
    discountPercentage: 15,
    createdAt: "2025-02-01T10:00:00Z",
  },
  {
    id: 3,
    name: "Leather Laptop Bag",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    category: "Accessories",
    stock: 30,
    description: "Premium leather laptop bag for professionals",
    brand: "LeatherCraft",
    rating: 4.6,
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: 4,
    name: "Smartwatch Series 5",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 20,
    description: "Advanced smartwatch with health monitoring",
    brand: "WatchTech",
    rating: 4.8,
    discountPercentage: 5,
    createdAt: "2025-04-01T10:00:00Z",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 40,
    description: "Portable Bluetooth speaker with rich sound",
    brand: "SoundWave",
    rating: 4.4,
    discountPercentage: 20,
    createdAt: "2025-05-01T10:00:00Z",
  },
  {
    id: 6,
    name: "Gaming Console Z",
    price: 499.99,
    imageUrl: "https://images.unsplash.com/photo-1606144042614-7d8f8e9e6a2f?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 10,
    description: "Next-gen gaming console with 4K graphics",
    brand: "GameMaster",
    rating: 4.8,
    discountPercentage: 5,
    createdAt: "2025-06-15T15:00:00Z",
  },
  {
    id: 7,
    name: "DSLR Camera 3000D",
    price: 799.99,
    imageUrl: "https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 8,
    description: "Professional DSLR camera with 24MP sensor",
    brand: "PhotoPro",
    rating: 4.6,
    createdAt: "2025-07-01T10:00:00Z",
  },
  {
    id: 8,
    name: '4K LED TV 55"',
    price: 999.99,
    imageUrl: "https://images.unsplash.com/photo-1593753936307-90c6f6e4a5f5?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 14,
    description: "55-inch 4K LED TV with smart streaming capabilities",
    brand: "VisionTech",
    rating: 4.5,
    createdAt: "2025-08-10T12:00:00Z",
  },
  {
    id: 9,
    name: "Portable Charger 20,000mAh",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1593399483886-6e2627c25d77?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 50,
    description: "High-capacity portable charger with fast charging",
    brand: "PowerUp",
    rating: 4.3,
    discountPercentage: 20,
    createdAt: "2025-09-01T09:00:00Z",
  },
  {
    id: 10,
    name: "VR Headset Pro",
    price: 399.99,
    imageUrl: "https://images.unsplash.com/photo-1611403894987-35c4f91f4a5f?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 6,
    description: "Immersive VR headset with high-resolution display",
    brand: "VirtualVibe",
    rating: 4.7,
    createdAt: "2025-09-15T14:00:00Z",
  },
  {
    id: 11,
    name: "Wireless Mouse Pro",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    category: "Electronics",
    stock: 35,
    description: "Ergonomic wireless mouse for productivity",
    brand: "TechGear",
    rating: 4.2,
    createdAt: "2025-10-01T10:00:00Z",
  },
  {
    id: 12,
    name: "Coffee Maker Deluxe",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
    category: "Appliances",
    stock: 18,
    description: "Premium coffee maker with programmable features",
    brand: "BrewMaster",
    rating: 4.5,
    discountPercentage: 10,
    createdAt: "2025-11-01T10:00:00Z",
  },
]

export async function getPaginatedProducts(limit = 10, skip = 0): Promise<Product[]> {
  try {
    console.log("Attempting to fetch from API:", `${BASE_URL}/products?limit=${limit}&skip=${skip}`)

    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: PaginatedProductsResponse = await response.json()
    console.log("API fetch successful:", result)
    return result.data
  } catch (error) {
    console.log("API fetch failed, using mock data:", error)

    const start = skip
    const end = skip + limit
    const paginatedMockData = mockProducts.slice(start, end)

    console.log("Returning mock data:", paginatedMockData)
    return paginatedMockData
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    console.log("Attempting to fetch product by ID:", id)

    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: ApiResponse<Product> = await response.json()
    console.log("Product fetch successful:", result)
    return result.data
  } catch (error) {
    console.log("Product fetch failed, using mock data:", error)

    const mockProduct = mockProducts.find((p) => p.id === id)
    if (!mockProduct) {
      throw new Error(`Product with ID ${id} not found`)
    }
    return mockProduct
  }
}

export async function createOrder(productIds: number[]): Promise<OrderResponse> {
  try {
    console.log("Attempting to create order with product IDs:", productIds)

    const response = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productIds }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: ApiResponse<OrderResponse> = await response.json()
    console.log("Order creation successful:", result)
    return result.data
  } catch (error) {
    console.log("Order creation failed, simulating success:", error)

    const productCounts: { [key: number]: number } = {}
    productIds.forEach((id) => {
      productCounts[id] = (productCounts[id] || 0) + 1
    })

    const orderProducts = Object.entries(productCounts).map(([id, quantity]) => {
      const product = mockProducts.find((p) => p.id === Number(id))
      return {
        id: Number(id),
        name: product?.name || `Product ${id}`,
        price: product?.price || 0,
        quantity,
      }
    })

    const totalAmount = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0)

    const mockOrder: OrderResponse = {
      id: Math.floor(Math.random() * 10000) + 1000,
      userId: 1,
      productIds,
      products: orderProducts,
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("Mock order created:", mockOrder)
    return mockOrder
  }
}
