import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCardForm";
const apiUrl = import.meta.env.VITE_API_URL;
const storeId = "MX-ME-AP-01";
export default function CatalogPage() {
    const [series, setSeries] = useState([]);
    const [openSeries, setOpenSeries] = useState({});
    useEffect(() => {
        fetch(`${apiUrl}/main-products/${storeId}`)
            .then((res) => res.json())
            .then((data) => {
            const ordered = [...data].sort((a, b) => {
                if (a.Serie === "Sin serie")
                    return 1;
                if (b.Serie === "Sin serie")
                    return -1;
                return 0;
            });
            setSeries(ordered);
            // Inicializamos todas las series como abiertas
            const initialOpen = {};
            ordered.forEach((serie) => {
                initialOpen[serie.Serie] = true;
            });
            setOpenSeries(initialOpen);
        })
            .catch((err) => console.error("Error al cargar productos:", err));
    }, []);
    const toggleSerie = (serieName) => {
        setOpenSeries((prev) => ({
            ...prev,
            [serieName]: !prev[serieName],
        }));
    };
    return (_jsx("div", { className: "min-h-screen bg-purple-100 p-8", children: series.map((serie, i) => (_jsxs("div", { className: "mb-10 w-full", children: [_jsxs("div", { className: "flex items-center mb-6 cursor-pointer", onClick: () => toggleSerie(serie.Serie), children: [_jsx("span", { className: "text-purple-900 mr-2 text-xl", children: openSeries[serie.Serie] ? "▼" : "►" }), _jsx("h2", { className: "text-2xl font-bold text-purple-900", children: serie.Serie })] }), openSeries[serie.Serie] && (_jsx("div", { className: "flex flex-wrap justify-start", children: serie.productos.map((product) => (_jsx(ProductCard, { product: product }, product._id))) }))] }, `${serie.Serie}-${i}`))) }));
}
