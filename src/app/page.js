import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { UserCircle, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-[50%] flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
        <Link href="/products/admin" className="block flex-1">
          <Card className="w-full aspect-square flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <Users className="w-1/3 h-1/3 text-primary mb-6" />
              <span className="text-3xl font-semibold">Admin</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/products/user" className="block flex-1">
          <Card className="w-full aspect-square flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <UserCircle className="w-1/3 h-1/3 text-primary mb-6" />
              <span className="text-3xl font-semibold">Usuario</span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}