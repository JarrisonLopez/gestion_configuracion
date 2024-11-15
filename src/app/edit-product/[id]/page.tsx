'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Trash2, ArrowLeft } from 'lucide-react'
import Swal from 'sweetalert2'

interface ProductData {
  name: string;
  description: string;
  price: string;
  quantity: string;
}

export default function EditProduct() {
  const router = useRouter()
  const { id } = useParams()!
  
  const [formData, setFormData] = useState<ProductData>({
    name: id as string || "",
    description: '',
    price: '',
    quantity: ''
  })
  
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product data')
        }
        const data = await response.json()
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          quantity: data.quantity.toString()
        })
      } catch (error) {
        console.error('Error fetching product data:', error)
        setError("Error al cargar los datos del producto")
        
      } finally {
        setIsLoading(false)
      }
    }


    
    fetchProductData()
  }, [id])
  
  
  
  if (error){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    )
  }


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
        const response = await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          throw new Error('Fallo al actualizar el producto')
        }

        
        Swal.fire("Producto actualizado con éxito!", "", "success");
        router.push('/products/admin');



      } catch (error) {
        console.error("Fallo al actualizar el producto:", error)
        
        Swal.fire("Error al actualizar el producto. Por favor, intente de nuevo.", "", "error");
      }
    }
  }

  const handleDelete = () => {
    Swal.fire({
      title: "desea eliminar la publicación?",
      showCancelButton: true,
      confirmButtonText: "eliminar",
    }).then(async (result) => {
      
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar el producto');
          }
          Swal.fire("Producto eliminado exitosamente", "", "success");
          router.push('/products/admin');
          
         
          
        } catch (error) {
          console.error('Fallo al eliminar el producto:', error.message);
          Swal.fire("Fallo al eliminar el producto", "", "error");
        }
      }
    });
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
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

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border-2 border-gray-200 relative">
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Eliminar producto"
        >
          <Trash2 size={24} />
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Editar Producto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700">Nombre</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-red-500' : ''}
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
              className={errors.description ? 'border-red-500' : ''}
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
              className={errors.price ? 'border-red-500' : ''}
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
              className={errors.quantity ? 'border-red-500' : ''}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
            Actualizar Producto
          </Button>
        </form>
      </div>
    </div>
  )
}