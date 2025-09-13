import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      <div
        className="relative h-[70vh] flex items-center justify-start bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601523180855-5e6a74eb49f5?auto=format&fit=crop&w=1920&h=1080')" }}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-lg space-y-6 text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Tecnología de Alto Rendimiento</h1>
            <p className="text-lg md:text-xl">
              Descubre nuestra selección premium de componentes y accesorios para potenciar tu experiencia informática.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/products">Ver Productos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
