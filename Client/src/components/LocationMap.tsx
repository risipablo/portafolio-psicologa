import { MapPin, Navigation } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import "../style/location.css"

export const LocationMap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      className="container-location"
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
        <h2>Ubicación</h2>
      </motion.div>

      <motion.p 
        className="description-location"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Te espero en mi consultorio ubicado en el corazón de Cipolletti. 
        Un espacio tranquilo y accesible para tu comodidad.
      </motion.p>

      <div className="location-content">
        <div className="location-info">
          <motion.div 
            className="info-card"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <MapPin className="info-icon" size={28} />
            <div className="info-text">
              <h3>Dirección</h3>
              <p>9 julio 782</p>
              <p>Cipolletti, Río Negro</p>
            </div>
          </motion.div>

          <motion.div 
            className="info-card"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <Navigation className="info-icon" size={28} />
            <div className="info-text">
              <h3>Cómo Llegar</h3>
              <p>A 2 cuadras de la Plaza El Paseo de la Familia</p>
              <p>Fácil acceso en transporte público</p>
            </div>
          </motion.div>

          {/* <motion.a 
             href="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=9+de+Julio+782,+Cipolletti,+Río+Negro,+Argentina"
            target="_blank"
            rel="noopener noreferrer"
            className="directions-button"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation size={20} />
            <span>Cómo Llegar en Google Maps</span>
          </motion.a> */}
        </div>

        <motion.div 
          className="location-map"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <iframe
            src="https://www.google.com/maps?q=9+de+Julio+782,+Cipolletti,+Río+Negro&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación del consultorio"
          ></iframe>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocationMap;