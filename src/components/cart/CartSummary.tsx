'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import CartItemSummary from './CartItemSummary'
import { formatPrice } from '@/lib/helpers'

interface CartSummaryProps {
  onCheckout?: () => void;
  showCart?: boolean
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
  const { items, total, getTotalItems } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (onCheckout) {
      onCheckout()
    } else {
      router.push('/checkout')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <CartItemSummary key={item.id} item={item} />
        ))}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({getTotalItems()} productos)</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full"
          size="lg"
          disabled={items.length === 0}
        >
          {isAuthenticated ? 'Proceder al pago' : 'Iniciar sesión para comprar'}
        </Button>
      </CardContent>
    </Card>
  )
}