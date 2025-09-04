import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCardForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const apiUrl = import.meta.env.VITE_API_URL;
const storeId = "MX-ME-AP-01";

export default function CatalogPage() {
  const [series, setSeries] = useState<any[]>([]);
  const [openSeries, setOpenSeries] = useState<{ [key: string]: boolean }>({});
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    // Cargar productos
    fetch(`${apiUrl}/main-products/${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        const ordered = [...data].sort((a, b) => {
          if (a.Serie === "Sin serie") return 1;
          if (b.Serie === "Sin serie") return -1;
          return 0;
        });
        setSeries(ordered);
        const initialOpen: { [key: string]: boolean } = {};
        ordered.forEach((serie: any) => {
          initialOpen[serie.Serie] = true;
        });
        setOpenSeries(initialOpen);
      })
      .catch((err) => console.error("Error al cargar productos:", err));

    // Cargar banners
    fetch(`${apiUrl}/get-banners`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((b: any) =>
          console.log(
            b._id,
            b.Imagen ? "Web OK" : "Web missing",
            b.ImageApp ? "App OK" : "App missing"
          )
        );
        setBanners(data);
      })
      .catch((err) => console.error("Error al cargar banners:", err));
  }, []);

  const toggleSerie = (serieName: string) => {
    setOpenSeries((prev) => ({
      ...prev,
      [serieName]: !prev[serieName],
    }));
  };

  // Convertir ArrayBuffer / Buffer de Mongo a base64
  const arrayBufferToBase64 = (input: any) => {
    if (!input) return "";
    let bytes: Uint8Array;

    if (input.data && Array.isArray(input.data)) {
      bytes = new Uint8Array(input.data);
    } else if (input instanceof ArrayBuffer) {
      bytes = new Uint8Array(input);
    } else if (input instanceof Uint8Array) {
      bytes = input;
    } else {
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
  const getImageSrc = (banner: any, isMobile: boolean) => {
    const buffer = isMobile ? banner.ImageApp : banner.Imagen;
    const mimetype = isMobile ? banner.MimetypeApp : banner.Mimetype;

    if (!buffer) {
      console.warn(`No hay imagen para ${isMobile ? "App" : "Web"}:`, banner);
      return "";
    }

    return `data:${mimetype || "image/jpeg"};base64,${arrayBufferToBase64(buffer)}`;
  };

  return (
    <div className="min-h-screen bg-purple-100 p-8">
      {/* Slider de banners */}
      {banners.length > 0 && (
        <div className="mb-10">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            autoHeight
            className="rounded-2xl shadow-lg"
          >
            {banners.map((banner: any) => (
              <SwiperSlide key={banner._id}>
                {/* Web */}
                <div
                  className="hidden md:block w-full"
                  style={{ maxHeight: 400, overflow: "hidden" }}
                >
                  {banner.Imagen ? (
                    <img
                      src={getImageSrc(banner, false)}
                      alt="Banner Web"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Sin imagen web</span>
                    </div>
                  )}
                </div>

                {/* App/Mobile */}
                <div
                  className="block md:hidden w-full"
                  style={{ maxHeight: 300, overflow: "hidden" }}
                >
                  {banner.ImageApp?.data?.length > 0 ? (
                    <img
                      src={getImageSrc(banner, true)}
                      alt="Banner App"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Banner App</span>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Productos por serie */}
      {series.map((serie: any, i: number) => (
        <div key={`${serie.Serie}-${i}`} className="mb-10 w-full">
          <div
            className="flex items-center mb-6 cursor-pointer"
            onClick={() => toggleSerie(serie.Serie)}
          >
            <span className="text-purple-900 mr-2 text-xl">
              {openSeries[serie.Serie] ? "▼" : "►"}
            </span>
            <h2 className="text-2xl font-bold text-purple-900">{serie.Serie}</h2>
          </div>

          {openSeries[serie.Serie] && (
            <div className="flex flex-wrap justify-start">
              {serie.productos.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
