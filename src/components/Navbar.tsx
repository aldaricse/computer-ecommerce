'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { ShoppingCart, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    logout()
    router.push('/')
  }

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          ComputerShop
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/products"
            className="text-foreground hover:text-primary transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/products?category=laptops"
            className="text-foreground hover:text-primary transition-colors"
          >
            Laptops
          </Link>
          <Link
            href="/products?category=desktop"
            className="text-foreground hover:text-primary transition-colors"
          >
            PCs de Escritorio
          </Link>
          <Link
            href="/products?category=accessories"
            className="text-foreground hover:text-primary transition-colors"
          >
            Accesorios
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Link href="/orders">
                <Button variant="ghost" size="sm">
                  Mis pedidos
                </Button>
              </Link>

              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Hola, {user?.name}
                </span>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button>
                  Registrarse
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}