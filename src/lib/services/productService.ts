import { ProductFilters } from "@/types/product"
import { buildQueryString } from "../utils";

export const getProducts = async (filters: ProductFilters = {}) => {
  try {
    const queryString = buildQueryString(filters);
    const response = await fetch('/api/products' + queryString);
    if (!response.ok) {
      throw new Error('Error al cargar productos')
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Error desconocido')
  }
}