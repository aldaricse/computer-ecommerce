'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/helpers'

interface CartItemSummaryProps {
  item: {
    name: string
    price: number
    image?: string
    quantity: number
  }
}

export default function CartItemSummary({ item }: CartItemSummaryProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative size-10 flex-shrink-0">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Sin imagen</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatPrice(item.price)} x {item.quantity || 1}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}