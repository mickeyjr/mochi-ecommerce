import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCardForm';
const apiUrl = import.meta.env.VITE_API_URL;
const storeId = 'MX-ME-AP-01'; // cambiar a futuro por una cookie
export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}/main-products/${storeId}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error al cargar productos:', err));
    }, []);
    return (_jsx("div", { className: "min-h-screen bg-purple-100 flex flex-wrap justify-center items-start p-8", children: products.map((product) => (_jsx(ProductCard, { product: product }, product._id))) }));
}
