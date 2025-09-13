'use client'

import { getStripe } from '@/lib/stripe'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import CartSummary from '@/components/cart/CartSummary'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
  const stripePromise = getStripe()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CheckoutForm stripePromise={stripePromise} />
          </div>

          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}