import React from 'react'

type Product = {
  Nombre: string
  Descripcion: string
  CodigoBarras: string
  imagenes: {
    ImagenMimeType: string
    ImagenBuffer: string
  }[]
}

export default function ProductCard({ product }: { product: Product }) {
  const imageSrc = `data:${product.imagenes[0].ImagenMimeType};base64,${product.imagenes[0].ImagenBuffer}`

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 m-4">
      <img src={imageSrc} alt={product.Nombre} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-purple-700">{product.Nombre}</h2>
        <p className="text-gray-600">{product.Descripcion}</p>
        <p className="text-sm text-gray-500 mt-2">Código de barras: {product.CodigoBarras}</p>
      </div>
    </div>
  )
}