'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/helpers'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      category: product.category,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <span className="text-muted-foreground">Sin imagen</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-md lg:text-lg line-clamp-2">{product.name}</CardTitle>
          </div>

          {product.brand && (
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          )}

          <div className='hidden lg:block'>
            <CardDescription className="line-clamp-3">
              {product.description}
            </CardDescription>
          </div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-center">
            <span className="text-lg lg:text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              Stock: {product.stock}
            </span>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full mt-4"
        >
          {
            product.stock === 0 ? 'Agotado' :
              <>
                <ShoppingCart className="size-4 lg:mr-2" />
                <>
                  Agregar
                  <span className='hidden lg:block'>&nbsp;al carrito</span>
                </>
              </>
          }
        </Button>
      </CardContent>
    </Card>
  )
}