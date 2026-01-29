import { useState, type SetStateAction, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import '../style/consultorio.css';
import consul1 from "../assets/images/consul1.png"
import consul2 from "../assets/images/consul2.png"

export const Consultorio = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = [
    // 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
    // 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800',
    // 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800',
    consul1,
    consul2
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  return (
    <motion.div 
      className="container-consultorio"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="title-about"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Mi Consultorio</h2>
      </motion.div>

      <motion.p 
        className="description-consultorio"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Un espacio diseñado para tu bienestar y comodidad. Aquí encontrarás un ambiente cálido, 
        acogedor y profesional donde poder explorar, sanar y crecer en un entorno de confianza y tranquilidad.
      </motion.p>

      <motion.div 
        className="carousel-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.button 
          onClick={prevSlide} 
          className="carousel-button carousel-button-left"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={32} />
        </motion.button>

        <div className="carousel-image-container">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={image} 
                alt={`Consultorio ${index + 1}`} 
                className="carousel-image"
              />
            </motion.div>
          ))}
        </div>

        <motion.button 
          onClick={nextSlide} 
          className="carousel-button carousel-button-right"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={32} />
        </motion.button>

        <div className="carousel-dots">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};