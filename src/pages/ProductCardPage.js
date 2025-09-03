import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCardForm";
const apiUrl = import.meta.env.VITE_API_URL;
const storeId = "MX-ME-AP-01"; // cambiar a futuro por cookie
export default function CatalogPage() {
    const [series, setSeries] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}/main-products/${storeId}`)
            .then((res) => res.json())
            .then((data) => {
            // 🔽 ordenar: primero todo lo que NO es "Sin serie", al final los que sí
            const ordered = [...data].sort((a, b) => {
                if (a.Serie === "Sin serie")
                    return 1;
                if (b.Serie === "Sin serie")
                    return -1;
                return 0;
            });
            setSeries(ordered);
        })
            .catch((err) => console.error("Error al cargar productos:", err));
    }, []);
    return (_jsx("div", { className: "min-h-screen bg-purple-100 p-8", children: series.map((serie, i) => (_jsxs("div", { className: "mb-10 w-full", children: [_jsx("h2", { className: "text-2xl font-bold text-purple-900 mb-6", children: serie.Serie }), _jsx("div", { className: "flex flex-wrap justify-start", children: serie.productos.map((product) => (_jsx(ProductCard, { product: product }, product._id))) })] }, `${serie.Serie}-${i}`))) }));
}
