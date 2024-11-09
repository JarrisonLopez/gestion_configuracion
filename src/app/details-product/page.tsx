'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface ProductData {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductDetails() {
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data - replace this with your actual API call
        const mockData: ProductData = {
          name: "Producto de Ejemplo",
          description: "Esta es una descripción detallada del producto de ejemplo.",
          price: 99.99,
          quantity: 50
        }
        
        setProduct(mockData)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los datos del producto')
        setLoading(false)
      }
    }

    fetchProduct()
  }, [])

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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