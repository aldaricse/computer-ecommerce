'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProductFilters } from '@/components/products/ProductFilters'
import ProductGrid from '@/components/products/ProductGrid'
import useProducts from '@/hooks/useProducts';
import { Pagination } from '@/components/Pagination';
import { useCallback } from 'react';
import { cleanObject } from '@/lib/utils';
import { ProductSort } from '@/components/products/ProductSort';

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const objSearchParams = Object.fromEntries(searchParams.entries());
  const { _rsc, ...rest } = cleanObject(objSearchParams);
  const { products, loading, pagination, changePage, filters, changeFilters } = useProducts(rest);

  const handleFiltersChange = useCallback((newFilters: Partial<typeof filters>) => {
    const { _rsc, page, ...rest } = cleanObject(newFilters);
    changeFilters(rest);

    const newSearchParams = new URLSearchParams(rest as Record<string, string>);
    router.push(`${pathname}/?${newSearchParams.toString()}`);
  }, [rest]);

  const handlePagesChange = useCallback((page: number) => {
    changePage(page);

    const newFilters = { ...rest, page: page.toString() };
    const newSearchParams = new URLSearchParams(newFilters as Record<string, string>);
    router.push(`${pathname}/?${newSearchParams.toString()}`);
  }, [rest]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 hidden">
          <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
          <p className="text-muted-foreground">
            Encuentra las mejores computadoras y accesorios tecnológicos
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex justify-between lg:inline gap-2 lg:w-[18rem] lg:flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
            <div className='lg:hidden'>
              <ProductSort
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                Mostrando {products.length} de {pagination.total} productos
              </div>
              <ProductSort
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
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

                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePagesChange}
                    loading={loading}
                  />
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}