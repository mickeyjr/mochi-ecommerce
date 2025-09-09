import React from 'react'

type Product = {
  Nombre: string
  Descripcion: string
  CodigoBarras: string
  imagenes: {
    ImagenMimeType: string
    ImagenBuffer: string
    UrlImage: string
  }[]
}

export default function ProductCard({ product }: { product: Product }) {
  const hasImage = Array.isArray(product.imagenes) && product.imagenes.length > 0
  const imageSrc = hasImage

    ? `${product.imagenes[0].UrlImage}`
    : "https://via.placeholder.com/300x200?text=Sin+imagen"

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 m-4">
      <img src={imageSrc} alt={product.Nombre} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-purple-700">{product.Nombre}</h2>
        <p className="text-gray-600">{product.Descripcion}</p>
        <p className="text-sm text-gray-500 mt-2">
          Código de barras: {product.CodigoBarras}
        </p>
      </div>
    </div>
  )
}
