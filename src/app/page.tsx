import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Shield, Truck, CreditCard } from "lucide-react"
import { HeroSection } from "@/components/HeroSection"
import { CategorySection } from "@/components/CategorySection"
import FeaturedProducts from "@/components/products/FeaturedProducts"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Call to Action Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Nueva tienda online
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text">
            ComputerShop
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encuentra las mejores computadoras, laptops y accesorios tecnológicos
            con precios competitivos y envío gratuito
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="text-lg px-8">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Explorar Productos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Categories Section */}
        <div className="mb-16">
          <CategorySection />
        </div>

        {/*Featured Products Section */}
        <div className="mb-16">
          <FeaturedProducts />
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-lg font-semibold mb-2">Compra Segura</h3>
              <p className="text-muted-foreground text-sm">
                Pagos seguros con encriptación SSL
              </p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">Envío Gratis</h3>
              <p className="text-muted-foreground text-sm">
                En compras superiores a $200.000
              </p>
            </div>
            <div className="text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">Múltiples Pagos</h3>
              <p className="text-muted-foreground text-sm">
                Tarjetas de crédito y débito
              </p>
            </div>
            <div className="text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg font-semibold mb-2">Fácil Compra</h3>
              <p className="text-muted-foreground text-sm">
                Proceso de compra simplificado
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}