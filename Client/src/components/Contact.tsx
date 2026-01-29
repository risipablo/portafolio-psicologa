import { useState, type ChangeEvent, type FormEvent, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import "../style/contac.css"

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    email: '',
    consulta: ''
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Formulario enviado con éxito!');
    
    setFormData({
      nombre: '',
      apellido: '',
      celular: '',
      email: '',
      consulta: ''
    });
  };

  return (
    <motion.div 
      className="container-contact"
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
        <h2>Contacto</h2>
      </motion.div>

      <motion.p 
        className="description-contact"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        ¿Tenés alguna consulta o querés agendar una sesión? Completá el formulario y me pondré en contacto con vos a la brevedad.
      </motion.p>

      <motion.form 
        className="contact-form" 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className="form-row"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido *</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              placeholder="Tu apellido"
            />
          </div>
        </motion.div>

        <motion.div 
          className="form-group"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label htmlFor="celular">Celular *</label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            placeholder="+54 9 11 1234-5678"
          />
        </motion.div>

        <motion.div 
          className="form-group"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </motion.div>

        <motion.div 
          className="form-group"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <label htmlFor="consulta">Consulta *</label>
          <textarea
            id="consulta"
            name="consulta"
            value={formData.consulta}
            onChange={handleChange}
            required
            placeholder="Contame sobre tu consulta o motivo de contacto..."
            rows={6}
          ></textarea>
        </motion.div>

        <motion.button 
          type="submit" 
          className="submit-button"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send size={20} />
          <span>Enviar Consulta</span>
        </motion.button>
      </motion.form>
    </motion.div>
  );
};