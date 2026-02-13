import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom"; // Importante para sacar el lightbox del flujo
import fotos from "../ts/astrologia";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "../../../style/slider.css";

export const AstrologiaSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerview] = useState(1);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    // 1. Manejo del scroll
    useEffect(() => {
        if (selectedImage !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto' };
    }, [selectedImage]);

    // 2. Responsividad
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setItemsPerview(4);
            else if (window.innerWidth >= 768) setItemsPerview(3);
            else if (window.innerWidth >= 480) setItemsPerview(2);
            else setItemsPerview(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, fotos.length - itemsPerView);
    
    const closeLightbox = useCallback(() => setSelectedImage(null), []);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) setSelectedImage((selectedImage + 1) % fotos.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) setSelectedImage((selectedImage - 1 + fotos.length) % fotos.length);
    };

    
    const lightboxJSX = selectedImage !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
            <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
                <X size={40} />
            </button>

            <button className="lightbox-nav lightbox-nav-left" onClick={prevImage}>
                <ChevronLeft size={50} />
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={fotos[selectedImage]} alt="Vista completa" />
                <div className="lightbox-counter">
                    {selectedImage + 1} / {fotos.length}
                </div>
            </div>

            <button className="lightbox-nav lightbox-nav-right" onClick={nextImage}>
                <ChevronRight size={50} />
            </button>
        </div>
    );

    return (
        <>
            <div className="featured-carousel-wrapper">
                <button 
                    onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))} 
                    disabled={currentIndex === 0}
                    className="featured-nav"
                >
                    <ChevronLeft />
                </button>

                <div className="featured-carousel">
                    <div 
                        className="featured-track"
                        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                    >
                        {fotos.map((foto, index) => (
                            <div 
                                key={index}
                                className="featured-card"
                                style={{ minWidth: `${100 / itemsPerView}%` }}
                            >
                                <img 
                                    src={foto} 
                                    alt={`Foto ${index}`}
                                    onClick={() => setSelectedImage(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={() => setCurrentIndex(prev => Math.min(prev + 1, maxIndex))} 
                    disabled={currentIndex === maxIndex}
                    className="featured-nav"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Renderizamos el Lightbox en el BODY, fuera de los efectos de Talleres */}
            {selectedImage !== null && createPortal(lightboxJSX, document.body)}
        </>
    );
};