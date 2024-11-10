"use client";
import ProductoCard from "../componets/producto-card";
import React from "react";

function product(){

    return(
    
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductoCard nombre_producto="saasas" />
        <ProductoCard nombre_producto="Producto 2" />
        <ProductoCard nombre_producto="Producto 3" />
      </div>
    </div>
    
    )
}

export default  product