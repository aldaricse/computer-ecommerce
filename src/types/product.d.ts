export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  brand?: string
  stock: number
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
  order?: string;
  _rsc?: string; // Next.js specific flag to indicate RSC requests
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}