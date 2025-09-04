import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCardForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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
            data.forEach((b) => console.log(b._id, b.Imagen ? "Web OK" : "Web missing", b.ImageApp ? "App OK" : "App missing"));
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
    // Arreglo aquí: usar Mimetype o MimetypeApp según corresponda
    const getImageSrc = (banner, isMobile) => {
        const buffer = isMobile ? banner.ImageApp : banner.Imagen;
        const mimetype = isMobile ? banner.MimetypeApp : banner.Mimetype;
        if (!buffer) {
            console.warn(`No hay imagen para ${isMobile ? "App" : "Web"}:`, banner);
            return "";
        }
        return `data:${mimetype || "image/jpeg"};base64,${arrayBufferToBase64(buffer)}`;
    };
    return (_jsxs("div", { className: "min-h-screen bg-purple-100 p-8", children: [banners.length > 0 && (_jsx("div", { className: "mb-10", children: _jsx(Swiper, { modules: [Navigation, Pagination], navigation: true, pagination: { clickable: true }, loop: true, autoHeight: true, className: "rounded-2xl shadow-lg", children: banners.map((banner) => (_jsxs(SwiperSlide, { children: [_jsx("div", { className: "hidden md:block w-full", style: { maxHeight: 400, overflow: "hidden" }, children: banner.Imagen ? (_jsx("img", { src: getImageSrc(banner, false), alt: "Banner Web", className: "w-full h-full object-contain rounded-2xl" })) : (_jsx("div", { className: "w-full h-40 bg-gray-200 flex items-center justify-center", children: _jsx("span", { className: "text-gray-500", children: "Sin imagen web" }) })) }), _jsx("div", { className: "block md:hidden w-full", style: { maxHeight: 300, overflow: "hidden" }, children: banner.ImageApp?.data?.length > 0 ? (_jsx("img", { src: getImageSrc(banner, true), alt: "Banner App", className: "w-full h-full object-contain rounded-2xl" })) : (_jsx("div", { className: "w-full h-40 bg-gray-200 flex items-center justify-center", children: _jsx("span", { className: "text-gray-500", children: "Banner App" }) })) })] }, banner._id))) }) })), series.map((serie, i) => (_jsxs("div", { className: "mb-10 w-full", children: [_jsxs("div", { className: "flex items-center mb-6 cursor-pointer", onClick: () => toggleSerie(serie.Serie), children: [_jsx("span", { className: "text-purple-900 mr-2 text-xl", children: openSeries[serie.Serie] ? "▼" : "►" }), _jsx("h2", { className: "text-2xl font-bold text-purple-900", children: serie.Serie })] }), openSeries[serie.Serie] && (_jsx("div", { className: "flex flex-wrap justify-start", children: serie.productos.map((product) => (_jsx(ProductCard, { product: product }, product._id))) }))] }, `${serie.Serie}-${i}`)))] }));
}
