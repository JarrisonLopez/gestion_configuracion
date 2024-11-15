'use client'

import ProductoCard from "../../componets/producto-card"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Product() {
  interface product {name:string, price:number, _id: string}

  const { user } = useParams()!
  const [productos, setProductos] = useState<product[]>([])
  const [filteredProductos, setFilteredProductos] = useState<product[]>([])
  const [nameFilter, setNameFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProductos(data)
        setFilteredProductos(data)
      } catch (error) {
        console.error("Error al obtener productos:", error)
      }
    }

    fetchProductos()
  }, [])

  useEffect(() => {
    const filtered = productos.filter((producto:product) => {
      const nameMatch = producto.name.toLowerCase().includes(nameFilter.toLowerCase())
      const priceMatch =
        (!minPrice || producto.price >= parseFloat(minPrice)) &&
        (!maxPrice || producto.price <= parseFloat(maxPrice))
      return nameMatch && priceMatch
    })
    setFilteredProductos(filtered)
  }, [nameFilter, minPrice, maxPrice, productos])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="nameFilter" className="mb-2 block">Nombre del producto</Label>
          <Input
            id="nameFilter"
            type="text"
            placeholder="Filtrar por nombre"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="minPrice" className="mb-2 block">Precio mínimo</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="maxPrice" className="mb-2 block">Precio máximo</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        {user === 'admin' && (
          <div className="ml-auto">
            <Link href="/new-product">
              <Button variant="secondary" className="bg-black text-white hover:bg-gray-800">
                Crear
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProductos.map((producto: product) => (
          <ProductoCard key={producto._id} nombre_producto={producto.name} id={producto._id} user={user as string} />
        ))}
      </div>
    </div>
  )
}