import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

export default function ProductoCard({ nombre_producto = "Producto Ejemplo" ,id}: { nombre_producto: string,id:string }) {
  // La URL ahora apunta a la ruta específica que has solicitado
  const url = `/details-product/${encodeURIComponent(id)}`

  return (
    <Link href={url} className="block w-full max-w-sm mx-auto">
      <Card className="h-40 transition-all duration-300 hover:shadow-lg hover:scale-105">
        <CardContent className="flex items-center justify-center h-full p-6">
          <h2 className="text-xl font-semibold text-center">{nombre_producto}</h2>
        </CardContent>
      </Card>
      <span className="sr-only">Ver detalles de {nombre_producto}</span>
    </Link>
  )
}