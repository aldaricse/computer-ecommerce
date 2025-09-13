'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatPrice } from '@/lib/helpers'

interface Order {
  id: string
  total: number
  status: string
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      image?: string
    }
  }>
}

interface OrderCardProps {
  order: Order
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

const statusLabels = {
  PENDING: 'Pendiente',
  PROCESSING: 'Procesando',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

export default function OrderCard({ order }: OrderCardProps) {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Orden #{order.id.slice(-8)}</CardTitle>
            <CardDescription>
              {formatDate(order.createdAt)} • {totalItems} productos
            </CardDescription>
          </div>
          <Badge 
            className={statusColors[order.status as keyof typeof statusColors]}
          >
            {statusLabels[order.status as keyof typeof statusLabels]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="truncate">
                {item.quantity}x {item.product.name}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          
          {order.items.length > 2 && (
            <p className="text-sm text-muted-foreground">
              +{order.items.length - 2} productos más
            </p>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <p className="font-medium">Total: {formatPrice(order.total)}</p>
          </div>
          
          <Link href={`/orders/${order.id}`}>
            <Button variant="outline" size="sm">
              Ver detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}