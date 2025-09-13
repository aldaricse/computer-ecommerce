'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/stores/cartStore'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/helpers'

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image?: string
    quantity: number
    stock: number
  }
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16 flex-shrink-0">
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

          <div className="flex-1 flex flex-col lg:flex-row lg:justify-between space-y-2">
            <div className="min-w-0 space-y-2">
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.price)} c/u
              </p>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="size-3" />
                </Button>

                <span className="min-w-[2rem] text-center text-sm">
                  {item.quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="size-3" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-medium text-sm min-w-[4rem]">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>


        </div>
      </CardContent>
    </Card>
  )
}