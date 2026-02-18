import { useState, type ChangeEvent, type FormEvent, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import "../style/contac.css"
import axios from 'axios';
import { toast } from 'react-hot-toast';
import type { IContact } from '../interface/type';


const serverFront = "https://portafolio-psicologa.onrender.com"


const api = axios.create({
  baseURL: serverFront,
  timeout:3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const ContactForm = () => {
  const [formData, setFormData] = useState<IContact>({
    name: '',
    lastname: '',
    email: '',
    message: '',
    cellphone: ''
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastname.trim()) newErrors.lastname = 'El apellido es requerido';
    if (!formData.cellphone.trim()) newErrors.cellphone = 'El celular es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.message.trim()) newErrors.message = 'La consulta es requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    toast.promise(
      api.post('/send-email', {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        message: formData.message,
        cellphone: formData.cellphone
      }),
      {
        loading: 'Enviando consulta...',
        success: 'Consulta enviada con éxito. ¡Gracias por contactarme!',
        error: 'Error al enviar la consulta. Por favor, intentá nuevamente.'
      }
    ).then(() => {
      setFormData({
        name: '',
        lastname: '',
        cellphone: '',
        email: '',
        message: ''
      });
      setErrors({});
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }

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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido *</label>
            <input
              type="text"
              id="apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              placeholder="Tu apellido"
              className={errors.lastname ? 'error' : ''}
            />
            {errors.lastname && <span className="error-message">{errors.lastname}</span>}
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
            name="cellphone"
            value={formData.cellphone}
            onChange={handleChange}
            required
            placeholder="+54 9 11 1234-5678"
            className={errors.cellphone ? 'error' : ''}
          />
          {errors.cellphone && <span className="error-message">{errors.cellphone}</span>}
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
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
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
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Contame sobre tu consulta o motivo de contacto..."
            rows={6}
            className={errors.message ? 'error' : ''}
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </motion.div>

        <motion.button 
          type="submit" 
          className="submit-button"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          disabled={isLoading}
        >
          <Send size={20} />
          <span>{isLoading ? 'Enviando...' : 'Enviar Consulta'}</span>
        </motion.button>
      </motion.form>
    </motion.div>
  );
};