import React, { useEffect, useState } from "react"
import ProductCard from "../components/ProductCardForm"

const apiUrl = import.meta.env.VITE_API_URL
const storeId = "MX-ME-AP-01"

export default function CatalogPage() {
  const [series, setSeries] = useState([])
  const [openSeries, setOpenSeries] = useState<{ [key: string]: boolean }>({})

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

        // Inicializamos todas las series como abiertas
        const initialOpen: { [key: string]: boolean } = {}
        ordered.forEach((serie: any) => {
          initialOpen[serie.Serie] = true
        })
        setOpenSeries(initialOpen)
      })
      .catch((err) => console.error("Error al cargar productos:", err))
  }, [])

  const toggleSerie = (serieName: string) => {
    setOpenSeries((prev) => ({
      ...prev,
      [serieName]: !prev[serieName],
    }))
  }

  return (
    <div className="min-h-screen bg-purple-100 p-8">
      {series.map((serie: any, i: number) => (
        <div key={`${serie.Serie}-${i}`} className="mb-10 w-full">
          {/* Nombre de la serie con ícono a la izquierda */}
          <div className="flex items-center mb-6 cursor-pointer" onClick={() => toggleSerie(serie.Serie)}>
            <span className="text-purple-900 mr-2 text-xl">
              {openSeries[serie.Serie] ? "▼" : "►"}
            </span>
            <h2 className="text-2xl font-bold text-purple-900">{serie.Serie}</h2>
          </div>

          {/* Productos */}
          {openSeries[serie.Serie] && (
            <div className="flex flex-wrap justify-start">
              {serie.productos.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
