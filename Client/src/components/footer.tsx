
import { Instagram, MapPin, Phone } from 'lucide-react';
import "../style/footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Sabrina Ramos</h3>
          <p>Licenciada en Psicologia</p>
        </div>

        <div className="footer-social">
          <a 
            href="https://wa.me/2994654519" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link whatsapp"
            aria-label="WhatsApp"
          >
            <Phone size={24} />
          </a>

          <a 
            href="https://www.instagram.com/psicologaintegral_sabrinaramos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link instagram"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>

          <a 
            href="https://maps.google.com/?q=Cipolletti,Rio+Negro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link location"
            aria-label="Ubicación"
          >
            <MapPin size={24} />
          </a>
        </div>

        <div className="footer-location">
          <MapPin size={18} />
          <span>Cipolletti, Río Negro, Argentina</span>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p className="footer-rights">
          © {new Date().getFullYear()} Sabrina Ramos. Todos los derechos reservados.
        </p>
        <p className="footer-credits">
          Creado por <a href="https://tu-portfolio.com" target="_blank" rel="noopener noreferrer">Tu Nombre</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
