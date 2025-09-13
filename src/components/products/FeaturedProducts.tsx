'use client'

import useProducts from "@/hooks/useProducts";
import { ProductFilters } from "@/types/product";
import ProductGrid from "./ProductGrid";

export default function FeaturedProducts() {
  const filters: ProductFilters = {
    limit: 4,
    orderBy: 'createdAt',
    order: 'desc'
  }
  const { products, loading } = useProducts(filters);
  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pensados para ti</h2>
      </div>
      {
        loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-96 bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) :
          <>
            <ProductGrid
              products={products}
            />
          </>
      }
    </section>
  )
}
