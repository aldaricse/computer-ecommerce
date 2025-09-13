"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/stores/cartStore"

interface ProductAddedModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string | null
}

export function ProductAddedModal({
  isOpen,
  onClose,
  productId
}: ProductAddedModalProps) {
  const { items: cartItems, updateQuantity, removeItem: removeFromCart } = useCartStore()
  const product = cartItems.find((item) => item.id === productId)
  if (!product) return null

  const cartItem = cartItems.find((item) => item.id === product.id)
  const quantity = cartItem?.quantity || 0

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            ¡Producto agregado al carrito!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Details */}
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              <span className="text-sm text-muted-foreground">
                Stock: {product.stock}
              </span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Cantidad en carrito:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => handleQuantityChange(quantity + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Seguir comprando
            </Button>
            <Button asChild className="flex-1">
              <Link href="/cart" onClick={onClose}>
                Ver carrito
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
