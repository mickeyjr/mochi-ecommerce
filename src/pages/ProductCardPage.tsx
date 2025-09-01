import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCardForm'
const apiUrl = import.meta.env.VITE_API_URL
const storeId = 'MX-ME-AP-01' // cambiar a futuro por una cookie

export default function CatalogPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/main-products/${storeId}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error al cargar productos:', err))
  }, [])

  return (
    <div className="min-h-screen bg-purple-100 flex flex-wrap justify-center items-start p-8">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}