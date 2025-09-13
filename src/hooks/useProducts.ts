'use client';

import { useCallback, useEffect, useState } from "react";
import type { Product, ProductFilters, ProductsResponse } from "@/types/product";
import { getProducts } from "@/lib/services/productService";

export default function useProducts(initialFilters: ProductFilters = {}) {  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [mounted, setMounted] = useState(false);

  const fetchPlaces = async (newFilters?: ProductFilters) => {
    try {
      setLoading(true);
      setError(null);

      const { products, pagination } = await getProducts(newFilters) as ProductsResponse;
      setProducts(products);
      setPagination(pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching places');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!mounted){
      fetchPlaces(filters);
      setMounted(true);
      return;
    }
    
    //hacer fetch siempre que initialFilters y filters sean distintos
    if (JSON.stringify(initialFilters) !== JSON.stringify(filters)){
      setFilters(initialFilters);
      fetchPlaces(initialFilters);
    }
  }, [initialFilters]);

  const changePage = (page: number) => {
    fetchPlaces({ ...initialFilters, page });
  }

  const changeFilters = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...newFilters, page: 1 };
    fetchPlaces(updatedFilters);
  }

  return {
    products,
    loading,
    error,
    pagination,
    filters: initialFilters,
    changePage: changePage,
    changeFilters: changeFilters,
    refetch: () => fetchPlaces()
  };
}
