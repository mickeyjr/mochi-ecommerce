import React, { useEffect, useState } from "react"
import ProductCard from "../components/ProductCardForm"

const apiUrl = import.meta.env.VITE_API_URL
const storeId = "MX-ME-AP-01" // cambiar a futuro por cookie

export default function CatalogPage() {
  const [series, setSeries] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/main-products/${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        const ordered = [...data].sort((a, b) => {
          if (a.Serie === "Sin serie") return 1
          if (b.Serie === "Sin serie") return -1
          return 0
        })
        setSeries(ordered)
      })
      .catch((err) => console.error("Error al cargar productos:", err))
  }, [])

  return (
    <div className="min-h-screen bg-purple-100 p-8">
      {series.map((serie: any, i: number) => (
        <div key={`${serie.Serie}-${i}`} className="mb-10 w-full">
          {/* Nombre de la serie */}
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            {serie.Serie}
          </h2>

          {/* Productos */}
          <div className="flex flex-wrap justify-start">
            {serie.productos.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
