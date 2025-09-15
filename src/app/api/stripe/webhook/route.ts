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
      case 'payment_intent.succeeded': {
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
        console.log('🚀 Processing payment intent:', paymentIntent.id)

        try {
          // Crear order con stripePaymentId para prevenir duplicados
          const order = await prisma.order.create({
            data: {
              userId,
              total: paymentIntent.amount / 100,
              status: 'PROCESSING',
            }
          })

          // Crear sale
          await prisma.sale.create({
            data: {
              orderId: order.id,
              userId,
              stripePaymentId: paymentIntent.id,
              paymentStatus: 'COMPLETED',
            }
          })

          // Crear order items y actualizar stock
          for (const item of items) {
            await prisma.orderItem.create({
              data: {
                orderId: order.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price
              }
            })

            await prisma.product.update({
              where: { id: item.id },
              data: {
                stock: {
                  decrement: item.quantity
                }
              }
            })
          }

          console.log('✅ Payment succeeded and order created:', order.id)
          
        } catch (dbError: any) {
          // Detectar duplicados
          if (dbError.code === 'P2002') {
            console.log('🔄 Duplicate detected:', paymentIntent.id)
            return NextResponse.json({ received: true })
          }
          throw dbError
        }
        
        break  // ✅ Este break está dentro del case
      }
      
      default: {
        console.log(`Unhandled event type ${event.type}`)
        break
      }
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