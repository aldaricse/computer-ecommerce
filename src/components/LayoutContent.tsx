"use client"

import type React from "react"

import { Header } from "./Header"
import { Footer } from "./Footer"
import { ProductAddedModal } from "./products/ProductAddedModal"
import { useCartStore } from "@/stores/cartStore"
import { useEffect } from "react"

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { lastProductId, clearLastProductId } = useCartStore()

  useEffect(() => {
    clearLastProductId()
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <ProductAddedModal
        isOpen={!!lastProductId}
        onClose={() => clearLastProductId()}
        productId={lastProductId}
      />
    </>
  )
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <LayoutInner>
      {children}
    </LayoutInner>
  )
}

export { LayoutContent }
