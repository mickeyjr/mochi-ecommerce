type Product = {
    Nombre: string;
    Descripcion: string;
    CodigoBarras: string;
    imagenes: {
        ImagenMimeType: string;
        ImagenBuffer: string;
    }[];
};
export default function ProductCard({ product }: {
    product: Product;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ProductCardForm.d.ts.map