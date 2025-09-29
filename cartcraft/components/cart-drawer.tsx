"use client";

import { useState } from "react";
import { Plus, Minus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/lib/api";
import { getCartProductIds, type CartItem } from "@/lib/cart-storage";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const { toast } = useToast();

  const [lastRemovedItem, setLastRemovedItem] = useState<{
    id: number;
    quantity: number;
  } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )
    : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleRemoveItem = (productId: number) => {
    const item = Array.isArray(cartItems)
      ? cartItems.find((item) => item.product.id === productId)
      : null;
    if (item) {
      setLastRemovedItem({ id: productId, quantity: item.quantity });
    }
    onRemoveItem(productId);

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      action: (
        <Button variant="outline" size="sm" onClick={handleUndoRemove}>
          Undo
        </Button>
      ),
    });
  };

  const handleUndoRemove = () => {
    if (lastRemovedItem) {
      onUpdateQuantity(lastRemovedItem.id, lastRemovedItem.quantity);
      setLastRemovedItem(null);
    }
  };

  const handleQuantityChange = (productId: number, change: number) => {
    const currentItem = Array.isArray(cartItems)
      ? cartItems.find((item) => item.product.id === productId)
      : null;
    const currentQuantity = currentItem?.quantity || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    onUpdateQuantity(productId, newQuantity);
  };

  const handleCheckout = async () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) return;

    try {
      setIsCheckingOut(true);
      const productIds = getCartProductIds(cartItems);

      const order = await createOrder(productIds);

      // Clear the entire cart at once
      onClearCart();

      toast({
        title: "Order placed successfully!",
        description: `Order #${
          order.id
        } has been created. Total: $${order.totalAmount.toFixed(2)}`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {safeCartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start shopping to add items
                </p>
                <Button onClick={onClose}>Browse Products</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {safeCartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <img
                      src={item.product.imageUrl || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.product.brand}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item.product.id, -1)
                        }
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Badge
                        variant="secondary"
                        className="min-w-[2rem] justify-center"
                      >
                        {item.quantity}
                      </Badge>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.product.id, 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {safeCartItems.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full bg-transparent"
                >
                  Continue Shopping
                </Button>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
