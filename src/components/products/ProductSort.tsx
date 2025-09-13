"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductFilters } from "@/types/product";
import { ArrowUpDown } from "lucide-react";

interface ProductSortProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export function ProductSort({
  filters,
  onFiltersChange
}: ProductSortProps) {
  const sortBy = !!filters.orderBy && !!filters.order ? `${filters.orderBy},${filters.order}` : 'createdAt,desc'
  const sortOptions = [
    { value: "createdAt,desc", label: "Más Recientes" },
    { value: "price,asc", label: "Precio más bajo" },
    { value: "price,desc", label: "Precio más alto" },
    { value: "name,asc", label: "Nombre A-Z" },
    { value: "name,desc", label: "Nombre Z-A" },
  ]

  const onSortChange = (value: string) => {
    const valueSplit = value.split(',')
    onFiltersChange({
      ...filters,
      orderBy: valueSplit[0],
      order: valueSplit[1],
    })
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden lg:block text-sm font-medium">Ordenar por:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <ArrowUpDown size={16}/>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
