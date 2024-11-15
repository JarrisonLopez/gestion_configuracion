import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

export default function ProductoCard({ nombre_producto = "Producto Ejemplo" ,id,user}: { nombre_producto: string,id:string ,user:string}) {
  let url:string;
  let data:string;

  if(user==="user"){
    url = `/details-product/${encodeURIComponent(id)}`
    data = "Ver detalles de "
  }
  else{
    url = `/edit-product/${encodeURIComponent(id)}`
    data = "editar "
  }
  return (
    <Link href={url} className="block w-full max-w-sm mx-auto">
      <Card className="h-40 transition-all duration-300 hover:shadow-lg hover:scale-105">
        <CardContent className="flex items-center justify-center h-full p-6">
          <h2 className="text-xl font-semibold text-center">{nombre_producto}</h2>
        </CardContent>
      </Card>
      <span className="sr-only">{data} {nombre_producto}</span>
    </Link>
  )
}