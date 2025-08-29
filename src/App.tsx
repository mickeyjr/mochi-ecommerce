import React from 'react';
import CatalogPage from './pages/ProductCardPage'; // o el nombre correcto del archivo

function Navbar() {
  return (
    <nav
      style={{
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
      }}
    >
      <img
        src="/mochi_transparent.png"
        alt="Mochi Logo"
        style={{ height: '40px', marginRight: '1rem' }}
      />
      <h1 style={{ margin: 0 }}>Mochi E-Commerce</h1>
    </nav>
  );
}
function Footer() {
  return (
    <footer
      style={{
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
      }}
    >
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Mochi Store</p>
    </footer>
  );
}

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: 'url(/ruta/a/tu/imagen.jpg)', // ← tu fondo aquí
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          paddingTop: '60px', // altura del navbar
          paddingBottom: '50px', // altura del footer
        }}
      >
        <CatalogPage />
      </main>
      <Footer />
    </div>
  );
}