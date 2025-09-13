'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

interface PaymentFormProps {
  clientSecret: string
}

function PaymentForm({ clientSecret }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { clearCart } = useCartStore()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
      },
    })

    if (error) {
      setError(error.message || 'Ocurrió un error con el pago')
      setLoading(false)
    } else {
      clearCart()
      router.push('/order-success')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de pago</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={!stripe || loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Procesando pago...' : 'Pagar ahora'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

interface CheckoutFormProps {
  stripePromise: Promise<any>
}

export default function CheckoutForm({ stripePromise }: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { items, total } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (items.length === 0) {
      router.push('/cart')
      return
    }

    const createPaymentIntent = async () => {
      try {
        const tax = total * 0.19
        const finalTotal = total + tax

        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: finalTotal,
            items: items.map(item => ({
              id: item.id,
              quantity: item.quantity,
              price: item.price
            }))
          }),
        })

        if (!response.ok) {
          throw new Error('Error al crear la intención de pago')
        }

        const { clientSecret } = await response.json()
        setClientSecret(clientSecret)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [items, total, isAuthenticated, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Preparando el pago...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">{error}</p>
        <Button 
          onClick={() => router.push('/cart')} 
          className="mt-4"
        >
          Volver al carrito
        </Button>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm clientSecret={clientSecret} />
    </Elements>
  )
}