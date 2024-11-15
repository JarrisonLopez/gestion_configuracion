'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

interface ProductData {
  name: string
  description: string
  price: number
  quantity: number
}

export default function ProductDetails() {
  const { id } = useParams()!
  const router = useRouter()

  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)

        if (!response.ok) {
          throw new Error("Error al obtener los datos del producto")
        }

        const data: ProductData = await response.json()
        setProduct(data)
      } catch (err) {
        setError("Error al cargar los datos del producto")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold">Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold">No se encontró información del producto</p>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 text-black hover:bg-gray-200"
        onClick={() => router.back()}
        aria-label="Volver a la página anterior"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Detalles del Producto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 font-semibold">Nombre</Label>
            <p className="mt-1">{product.name}</p>
          </div>
          <div>
            <Label className="text-gray-700 font-semibold">Descripción</Label>
            <p className="mt-1">{product.description}</p>
          </div>
          <div>
            <Label className="text-gray-700 font-semibold">Precio</Label>
            <p className="mt-1">${product.price.toFixed(2)}</p>
          </div>
          <div>
            <Label className="text-gray-700 font-semibold">Cantidad</Label>
            <p className="mt-1">{product.quantity}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}