"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X, Filter } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import type { ProductFilters } from "@/types/product"
import { DualSlider } from "../ui/dual-slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters?: () => void;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: ProductFiltersProps) {
  const categories = [
    { id: "accessories", label: "Accesorios" },
    { id: "laptops", label: "Laptops" },
    { id: "desktop", label: "Computadoras" },
    { id: "monitors", label: "Monitores" },
    { id: "components", label: "Componentes" },
  ]

  const brands = [
    { id: "apple", label: "Apple" },
    { id: "dell", label: "Dell" },
    { id: "hp", label: "HP" },
    { id: "lenovo", label: "Lenovo" },
    { id: "asus", label: "Asus" },
    { id: "razer", label: "Razer" },
    { id: "lg", label: "LG" },
    { id: "samsung", label: "Samsung" },
    { id: "sony", label: "Sony" },
    { id: "amd", label: "AMD" },
    { id: "intel", label: "Intel" },
    { id: "nvidia", label: "NVIDIA" },
    { id: "msi", label: "MSI" },
    { id: "logitech", label: "Logitech" },
    { id: "corsair", label: "Corsair" },
  ]

  return (
    <div className="space-y-4 lg:space-y-0">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="pb-4 text-left">
              <SheetTitle>Filtrar por:</SheetTitle>
            </SheetHeader>

            <div className="space-y-6">
              <FilterContent
                categories={categories}
                brands={brands}
                filters={filters}
                onFiltersChange={onFiltersChange}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filtros</CardTitle>
              {!!onClearFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpiar todo
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FilterContent
              categories={categories}
              brands={brands}
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


interface FilterContentProps {
  categories?: { id: string; label: string }[]
  brands?: { id: string; label: string }[]
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
}

function FilterContent({
  categories,
  brands,
  filters,
  onFiltersChange
}: FilterContentProps) {
  const maxPrice = 49999
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || maxPrice])
  const onCategoryChange = (categoryId: string, checked: boolean) => {
    const categorySplit = filters.category?.split(',') || []
    const newCategories = checked
      ? [...categorySplit, categoryId]
      : categorySplit.filter((c) => c !== categoryId)

    onFiltersChange({
      ...filters,
      category: newCategories.join(','),
    })
  }

  const onBrandChange = (brandId: string, checked: boolean) => {
    const brandSplit = filters.brand?.split(',') || []
    const newBrands = checked
      ? [...brandSplit, brandId]
      : brandSplit.filter((b) => b !== brandId)

    onFiltersChange({
      ...filters,
      brand: newBrands.join(','),
    })
  }

  const [priceRangeTimeout, setPriceRangeTimeout] = useState<NodeJS.Timeout | null>(null);
  const onPriceChange = (value: number[]) => {
    setPriceRange(value)

    if (priceRangeTimeout) {
      clearTimeout(priceRangeTimeout);
    }

    const timeout = setTimeout(() => {
      onFiltersChange({
        ...filters,
        minPrice: value[0],
        maxPrice: value[1],
      })
    }, 500);

    setPriceRangeTimeout(timeout);
  }

  return (
    <>
      {/* Categories */}
      {categories && (
        <div className="space-y-3">
          <h3 className="font-medium">Categoría</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={!!filters.category && filters.category?.split(',').includes(category.id)}
                  onCheckedChange={(checked) => onCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {brands && (
        <div className="space-y-3">
          <h3 className="font-medium">Marca</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={!!filters.brand && filters.brand?.split(',').includes(brand.id)}
                  onCheckedChange={(checked) => onBrandChange(brand.id, checked as boolean)}
                />
                <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal cursor-pointer">
                  {brand.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="font-medium">Rango de Precio</h3>
        <div className="px-2">
          <DualSlider
            value={priceRange}
            onValueChange={onPriceChange}
            max={maxPrice}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </>
  )
}
