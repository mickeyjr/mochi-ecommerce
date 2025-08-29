import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ProductCard({ product }) {
    const imageSrc = `data:${product.imagenes[0].ImagenMimeType};base64,${product.imagenes[0].ImagenBuffer}`;
    return (_jsxs("div", { className: "bg-white rounded-xl shadow-md overflow-hidden w-80 m-4", children: [_jsx("img", { src: imageSrc, alt: product.Nombre, className: "h-48 w-full object-cover" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-semibold text-purple-700", children: product.Nombre }), _jsx("p", { className: "text-gray-600", children: product.Descripcion }), _jsxs("p", { className: "text-sm text-gray-500 mt-2", children: ["C\u00F3digo de barras: ", product.CodigoBarras] })] })] }));
}
