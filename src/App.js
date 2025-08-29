import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CatalogPage from './pages/ProductCardPage'; // o el nombre correcto del archivo
function Navbar() {
    return (_jsxs("nav", { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: '#333',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            zIndex: 1000,
        }, children: [_jsx("img", { src: "/mochi_transparent.png", alt: "Mochi Logo", style: { height: '40px', marginRight: '1rem' } }), _jsx("h1", { style: { margin: 0 }, children: "Mochi E-Commerce" })] }));
}
function Footer() {
    return (_jsx("footer", { style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50px',
            backgroundColor: '#f1f1f1',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }, children: _jsxs("p", { style: { margin: 0 }, children: ["\u00A9 ", new Date().getFullYear(), " Mochi Store"] }) }));
}
export default function App() {
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundImage: 'url(/ruta/a/tu/imagen.jpg)', // ← tu fondo aquí
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }, children: [_jsx(Navbar, {}), _jsx("main", { style: {
                    flex: 1,
                    paddingTop: '60px', // altura del navbar
                    paddingBottom: '50px', // altura del footer
                }, children: _jsx(CatalogPage, {}) }), _jsx(Footer, {})] }));
}
