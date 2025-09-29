"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Star,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CartDrawer from "@/components/cart-drawer";
import Link from "next/link";
import { getPaginatedProducts, type Product } from "@/lib/api";
import {
  getCartFromStorage,
  saveCartToStorage,
  addProductToCart,
  updateProductQuantityInCart,
  removeProductFromCart,
  type CartItem,
} from "@/lib/cart-storage";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "All",
  "Electronics",
  "Accessories",
  "Food",
  "Beauty",
  "Appliances",
];

export default function ProductListingPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getCartFromStorage();
    console.log("Loading cart from storage:", savedCart);
    setCartItems(savedCart);
    setIsCartLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isCartLoaded) {
      console.log("Saving cart to storage:", cartItems);
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isCartLoaded]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Starting initial product fetch");

        const fetchedProducts = await getPaginatedProducts(12, 0);
        setProducts(fetchedProducts);
        setHasMore(fetchedProducts.length === 12);

        const hasMockProduct = fetchedProducts.some(
          (p) => p.brand === "TechPro" && p.name === "Smartphone X1"
        );
        setUsingMockData(hasMockProduct);

        console.log(
          "Products loaded successfully:",
          fetchedProducts.length,
          "products"
        );
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error in fetchProducts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      console.log("Loading more products, current count:", products.length);

      const moreProducts = await getPaginatedProducts(12, products.length);
      if (moreProducts.length === 0) {
        setHasMore(false);
        console.log("No more products to load");
      } else {
        setProducts((prev) => [...prev, ...moreProducts]);
        setHasMore(moreProducts.length === 12);
        console.log("Loaded", moreProducts.length, "more products");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load more products",
        variant: "destructive",
      });
      console.error("Error loading more products:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => addProductToCart(prev, product));

    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) =>
      updateProductQuantityInCart(prev, productId, quantity)
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => removeProductFromCart(prev, productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    if (!Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-600"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/">
                <h1 className="text-2xl font-semibold">CartCraft</h1>
              </Link>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {usingMockData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Currently using demo data. To connect to your real API at
              localhost:8000, make sure your API server is running and
              accessible.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <section className="py-16 px-4 text-center bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Shopping Experience
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Discover curated products that elevate your lifestyle
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  {product.stock < 20 && (
                    <Badge
                      className="absolute top-4 left-4"
                      variant="destructive"
                    >
                      Low Stock
                    </Badge>
                  )}
                  {product.discountPercentage && (
                    <Badge
                      className="absolute top-4 right-4"
                      variant="secondary"
                    >
                      -{product.discountPercentage}%
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.brand}
                </p>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} in stock
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={() => addToCart(product.id)}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMoreProducts}
              disabled={loadingMore}
              variant="outline"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Products"
              )}
            </Button>
          </div>
        )}
      </div>

      {getTotalItems() > 0 && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            size="lg"
            onClick={() => setIsCartOpen(true)}
            className="rounded-full shadow-lg"
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            {getTotalItems()} items
          </Button>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
}