"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, LogOut, Menu, Package, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuthStore } from "@/stores/authStore"
import { useRouter, useSearchParams } from "next/navigation"
import { logoutUser } from "@/lib/services/AuthService"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartOverlay } from "./cart/CardOverlay"
import { cleanObject } from "@/lib/utils"
export function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleLogout = async () => {
    await logoutUser()
    logout()
    router.push('/')
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      const objSearchParams = Object.fromEntries(searchParams.entries());
      const { _rsc, ...filters } = cleanObject({
        ...objSearchParams,
        search: value
      });
      
      const newSearchParams = new URLSearchParams(filters as Record<string, string>);
      router.push(`/products?${newSearchParams.toString()}`);
    }, 500);
    
    setSearchTimeout(timeout);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium">
                Home
              </Link>
              <Link href="/products" className="text-lg font-medium">
                All Products
              </Link>
              <Link href="/products/men" className="text-lg font-medium">
                Men
              </Link>
              <Link href="/products/women" className="text-lg font-medium">
                Women
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About
              </Link>
              <Link href="/contact" className="text-lg font-medium">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="ml-4 md:ml-0 flex items-center gap-2">
          <span className="text-xl font-bold">ComputerShop</span>
        </Link>

        <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary">
            Inicio
          </Link>
          <Link href="/products" className="font-medium transition-colors hover:text-primary">
            Catalogo
          </Link>
          <Link href="/products?category=laptops" className="font-medium transition-colors hover:text-primary">
            Laptops
          </Link>
          <Link href="/products?category=desktop" className="font-medium transition-colors hover:text-primary">
            Computadoras
          </Link>
          <Link href="/products?category=accessories" className="font-medium transition-colors hover:text-primary">
            Accesorios
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen ? (
            <div className="fixed left-0 top-0 h-16 w-full lg:w-auto px-4 lg:px-0 lg:relative lg:left-auto flex items-center z-10 bg-background">
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="w-full lg:w-[200px]"
                value={search}
                onChange={handleChangeSearch}
                autoFocus
              />
              <Button variant="ghost" size="icon" className="absolute right-4 lg:right-0" onClick={() => setIsSearchOpen(false)}>
                <ChevronRight />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <CartOverlay />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                isAuthenticated ? (
                  <>
                    <DropdownMenuLabel>
                      <span className="text-sm text-muted-foreground">
                        Hola, {user?.name}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/orders')}>
                      <Package className="size-4" />
                      Mis pedidos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="size-4" />
                      Cerrar sesion
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => router.push('/auth/login')}>
                      Iniciar Sesión
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/auth/register')}>
                      Registrarse
                    </DropdownMenuItem>
                  </>
                )
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
