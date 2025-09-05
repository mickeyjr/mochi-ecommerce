import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CatalogPage from './pages/ProductCardPage';
//
function Navbar() {
    return (_jsxs("nav", { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(90deg, #8e2de2, #4a00e0)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1.5rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
        }, children: [_jsx("div", { style: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                }, children: _jsx("img", { src: "/mochi_transparent.png", alt: "Mochi Logo", style: { height: '30px', width: '30px' } }) }), _jsx("h1", { style: { margin: 0, fontFamily: 'Arial, sans-serif', fontWeight: '600' }, children: "Mochi Store" })] }));
}
function Footer() {
    return (_jsxs("footer", { style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(90deg, #7b2ff7, #a727f7)',
            color: '#fff',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'center',
            padding: '0 30px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            boxShadow: '0 -2px 15px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            zIndex: 1000,
        }, children: [_jsx("div", { style: { textAlign: 'left', lineHeight: '1.4' }, children: _jsxs("a", { href: "https://maps.app.goo.gl/iK5RJiwv3roN3Vxf9", target: "_blank", rel: "noopener noreferrer", style: { color: '#fff', textDecoration: 'none' }, children: ["\uD83D\uDCCD Apaxco Centro", _jsx("br", {}), "Calle Abasolo #19"] }) }), _jsxs("div", { style: { textAlign: 'center', fontWeight: '500' }, children: ["\u00A9 ", new Date().getFullYear(), " Mochi Store"] }), _jsx("div", {})] }));
}
export default function App() {
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            //backgroundImage: 'url(/ruta/a/tu/imagen.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }, children: [_jsx(Navbar, {}), _jsx("main", { style: {
                    flex: 1,
                    paddingTop: '60px',
                    paddingBottom: '70px',
                }, children: _jsx(CatalogPage, {}) }), _jsx("div", { style: {
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    zIndex: 1100,
                }, children: _jsx("a", { href: "https://wa.me/527791107375", target: "_blank", rel: "noopener noreferrer", children: _jsx("div", { style: {
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            border: '2px solid #000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 8px rgba(95, 82, 82, 0.3)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }, onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.1)', onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)', children: _jsx("img", { src: "/whatsapp.png", alt: "WhatsApp", style: {
                                maxWidth: '70%',
                                maxHeight: '70%',
                                objectFit: 'contain',
                            } }) }) }) }), _jsx(Footer, {})] }));
}
