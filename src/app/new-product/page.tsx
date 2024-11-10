"use client";

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'Este campo es obligatorio'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        if (!response.ok) {
          throw new Error('Error al añadir el producto')
        }
        const data = await response.json()
        console.log('Datos del formulario:', data)
        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: ''
        })
        setErrors({})
        alert('Producto añadido con éxito!')
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border-2 border-black">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Nuevo Producto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700">Nombre</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-700">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full mt-1 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div>
            <Label htmlFor="price" className="text-gray-700">Precio</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full mt-1 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div>
            <Label htmlFor="quantity" className="text-gray-700">Cantidad</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              className={`w-full mt-1 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
            Añadir Producto
          </Button>
        </form>
      </div>
    </div>
  )
}