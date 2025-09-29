export interface CartItem {
  product: {
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
  quantity: number
}

const CART_STORAGE_KEY = "cartcraft-cart"

export function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading cart from localStorage:", error)
    return []
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
  }
}

export function clearCartFromStorage(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing cart from localStorage:", error)
  }
}

export function getCartProductIds(cart: CartItem[]): number[] {
  const productIds: number[] = []

  cart.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      productIds.push(item.product.id)
    }
  })

  return productIds
}

export function addProductToCart(cart: CartItem[], product: any): CartItem[] {
  const existingItemIndex = cart.findIndex((item) => item.product.id === product.id)

  if (existingItemIndex >= 0) {
    // Product already exists, increase quantity
    const updatedCart = [...cart]
    updatedCart[existingItemIndex] = {
      ...updatedCart[existingItemIndex],
      quantity: updatedCart[existingItemIndex].quantity + 1,
    }
    return updatedCart
  } else {
    // New product, add to cart
    return [...cart, { product, quantity: 1 }]
  }
}

export function updateProductQuantityInCart(cart: CartItem[], productId: number, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return cart.filter((item) => item.product.id !== productId)
  }

  const existingItemIndex = cart.findIndex((item) => item.product.id === productId)
  if (existingItemIndex >= 0) {
    const updatedCart = [...cart]
    updatedCart[existingItemIndex] = {
      ...updatedCart[existingItemIndex],
      quantity,
    }
    return updatedCart
  }

  return cart
}

export function removeProductFromCart(cart: CartItem[], productId: number): CartItem[] {
  return cart.filter((item) => item.product.id !== productId)
}
