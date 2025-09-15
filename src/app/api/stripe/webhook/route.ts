import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const userId = paymentIntent.metadata.userId
        
        if (!userId) {
          console.error('❌ No userId in metadata')
          return NextResponse.json({ error: 'No userId provided' }, { status: 400 })
        }

        // Verificar si existe el usuario
        const user = await prisma.user.findUnique({
          where: { id: userId }
        })

        if (!user) {
          console.error('❌ User not found:', userId)
          return NextResponse.json({ error: 'User not found' }, { status: 400 })
        }

        const items = JSON.parse(paymentIntent.metadata.items)
        console.log('Processing payment intent:', paymentIntent.id)

        // ✅ Usar transacción para operación atómica
        try {
          await prisma.$transaction(async (tx) => {
            // Verificar dentro de la transacción
            const existingSale = await tx.sale.findFirst({
              where: { stripePaymentId: paymentIntent.id }
            })

            if (existingSale) {
              console.log('Payment already processed in transaction:', paymentIntent.id)
              return // Salir de la transacción sin error
            }

            // Crear orden
            const order = await tx.order.create({
              data: {
                userId,
                total: paymentIntent.amount / 100,
                status: 'PROCESSING'
              }
            })

            // Crear sale
            await tx.sale.create({
              data: {
                orderId: order.id,
                userId,
                stripePaymentId: paymentIntent.id,
                paymentStatus: 'COMPLETED',
              }
            })

            // Crear order items y actualizar stock
            for (const item of items) {
              await tx.orderItem.create({
                data: {
                  orderId: order.id,
                  productId: item.id,
                  quantity: item.quantity,
                  price: item.price
                }
              })

              await tx.product.update({
                where: { id: item.id },
                data: {
                  stock: {
                    decrement: item.quantity
                  }
                }
              })
            }

            console.log('Payment succeeded and order created:', order.id)
          })
        } catch (transactionError) {
          // Si la transacción falla, probablemente por duplicación
          console.log('Transaction failed, likely duplicate:', paymentIntent.id)
          return NextResponse.json({ received: true })
        }

        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}