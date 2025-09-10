import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCardForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const apiUrl = import.meta.env.VITE_API_URL;
const storeId = "MX-ME-AP-01";
export default function CatalogPage() {
    const [series, setSeries] = useState([]);
    const [openSeries, setOpenSeries] = useState({});
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        // Cargar productos
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
            const initialOpen = {};
            ordered.forEach((serie) => {
                initialOpen[serie.Serie] = true;
            });
            setOpenSeries(initialOpen);
        })
            .catch((err) => console.error("Error al cargar productos:", err));
        // Cargar banners
        fetch(`${apiUrl}/get-banners`)
            .then((res) => res.json())
            .then((data) => {
            data.forEach((b) => console.log(b));
            setBanners(data);
        })
            .catch((err) => console.error("Error al cargar banners:", err));
    }, []);
    const toggleSerie = (serieName) => {
        setOpenSeries((prev) => ({
            ...prev,
            [serieName]: !prev[serieName],
        }));
    };
    // Convertir ArrayBuffer / Buffer de Mongo a base64
    const arrayBufferToBase64 = (input) => {
        if (!input)
            return "";
        let bytes;
        if (input.data && Array.isArray(input.data)) {
            bytes = new Uint8Array(input.data);
        }
        else if (input instanceof ArrayBuffer) {
            bytes = new Uint8Array(input);
        }
        else if (input instanceof Uint8Array) {
            bytes = input;
        }
        else {
            console.warn("Tipo de buffer desconocido", input);
            return "";
        }
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    return (_jsxs("div", { className: "min-h-screen bg-purple-100 p-8", children: [banners.length > 0 && (_jsx("div", { className: "mb-10", children: _jsx(Swiper, { modules: [Navigation, Pagination, Autoplay], navigation: true, pagination: { clickable: true }, loop: true, autoplay: { delay: 5000, disableOnInteraction: false }, autoHeight: true, className: "rounded-2xl shadow-lg", children: banners.map((banner) => (_jsxs(SwiperSlide, { children: [_jsx("div", { className: "hidden md:block w-full", style: { maxHeight: 400, overflow: "hidden" }, children: banner.ImagenUrl ? (_jsx("img", { src: banner.ImagenUrl, alt: "Banner Web", className: "w-full h-full object-contain rounded-2xl" })) : (_jsx("div", { className: "w-full h-40 bg-gray-200 flex items-center justify-center", children: _jsx("span", { className: "text-gray-500", children: "Sin imagen web" }) })) }), _jsx("div", { className: "block md:hidden w-full", style: { maxHeight: 300, overflow: "hidden" }, children: banner.ImageUrlApp ? (_jsx("img", { src: banner.ImageUrlApp, alt: "Banner App", className: "w-full h-full object-contain rounded-2xl" })) : (_jsx("div", { className: "w-full h-40 bg-gray-200 flex items-center justify-center", children: _jsx("span", { className: "text-gray-500", children: "Banner App" }) })) })] }, banner._id))) }) })), _jsx("div", { className: "flex flex-wrap gap-4 mb-8", children: series.map((serie, i) => (_jsx("a", { onClick: (e) => {
                        e.preventDefault();
                        document.getElementById(`serie-${serie.Serie}`)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }, href: `#serie-${serie.Serie}`, className: "px-3 py-1 bg-purple-200 text-purple-900 rounded hover:bg-purple-300 transition cursor-pointer", children: serie.Serie }, `link-${serie.Serie}-${i}`))) }), series.map((serie, i) => (_jsxs("div", { id: `serie-${serie.Serie}`, className: "mb-10 w-full scroll-mt-20", children: [_jsxs("div", { className: "flex items-center mb-6 cursor-pointer", onClick: () => toggleSerie(serie.Serie), children: [_jsx("span", { className: "text-purple-900 mr-2 text-xl", children: openSeries[serie.Serie] ? "▼" : "►" }), _jsx("h2", { className: "text-2xl font-bold text-purple-900", children: serie.Serie })] }), openSeries[serie.Serie] && (_jsx("div", { className: "flex flex-wrap justify-start", children: serie.productos.map((product) => (_jsx(ProductCard, { product: product }, product._id))) }))] }, `${serie.Serie}-${i}`))), _jsx("div", { className: "flex flex-wrap gap-4 mb-8", children: series.map((serie, i) => (_jsx("a", { onClick: (e) => {
                        e.preventDefault();
                        document.getElementById(`serie-${serie.Serie}`)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }, href: `#serie-${serie.Serie}`, className: "px-3 py-1 bg-purple-200 text-purple-900 rounded hover:bg-purple-300 transition cursor-pointer", children: serie.Serie }, `link-${serie.Serie}-${i}`))) })] }));
}
