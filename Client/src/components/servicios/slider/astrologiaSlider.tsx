
import { useEffect, useState } from "react";
import fotos from "../ts/astrologia";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../style/slider.css"

export const AstrologiaSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemsPerView, setItemsPerview] = useState(1)
    
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 1024) {
            setItemsPerview(4);
          } else if (window.innerWidth >= 768) {
            setItemsPerview(3);
          } else if (window.innerWidth >= 480) {
            setItemsPerview(2);
          } else {
            setItemsPerview(1);
          }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const maxIndex = Math.max(0, fotos.length - itemsPerView);

      const next = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      };
    
      const prev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      };

      return (
        <section className="featured-section">
          <div className="featured-container">
            
            <div className="featured-carousel-wrapper">
              <button 
                onClick={prev} 
                disabled={currentIndex === 0}
                className="featured-nav featured-nav-left"
                aria-label="Anterior"
              >
                <ChevronLeft />
              </button>
    
              <div className="featured-carousel">
                <div 
                  className="featured-track"
                  style={{ 
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {fotos.map((foto, index) => (
                    <div 
                      className="featured-card"
                      style={{ minWidth: `${100 / itemsPerView}%` }}
                    >
                        <img key={index} src={foto} alt={`foto-${index}`} />

                    </div>
                  ))}
                </div>
              </div>
    
              <button 
                onClick={next} 
                disabled={currentIndex === maxIndex}
                className="featured-nav featured-nav-right"
                aria-label="Siguiente"
              >
                <ChevronRight />
              </button>
            </div>
    
    
          </div>
        </section>
      );
}