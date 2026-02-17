import { useState, type ChangeEvent, type FormEvent, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import "../style/contac.css"
import axios from 'axios';
import { toast } from 'react-hot-toast';

const serverFront = "https://portafolio-psicologa.onrender.com"

const api = axios.create({
  baseURL: serverFront,
  timeout:3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

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
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.celular.trim()) newErrors.celular = 'El celular es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.consulta.trim()) newErrors.consulta = 'La consulta es requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try{
       toast.promise(
        api.post('/send-email', {
          name: formData.nombre,
          lastname: formData.apellido,
          email: formData.email,
          message: formData.consulta,
          cellphone: formData.celular

        }),{
          loading: 'Enviando consulta...',
          success: 'Consulta enviada con éxito. ¡Gracias por contactarme!',
          error: 'Error al enviar la consulta. Por favor, intentá nuevamente.'
        }
      )

      setFormData({
        nombre: '',
        apellido: '',
        celular: '',
        email: '',
        consulta: ''
      })
      setErrors({});
    
    }catch(error){
      console.error('Error al enviar la consulta:', error);
    }finally{
      setIsLoading(false);
    }  
 
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
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className={errors.nombre ? 'error' : ''}
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
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
              className={errors.apellido ? 'error' : ''}
            />
            {errors.apellido && <span className="error-message">{errors.apellido}</span>}
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
            className={errors.celular ? 'error' : ''}
          />
          {errors.celular && <span className="error-message">{errors.celular}</span>}
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
            name="consulta"
            value={formData.consulta}
            onChange={handleChange}
            required
            placeholder="Contame sobre tu consulta o motivo de contacto..."
            rows={6}
            className={errors.consulta ? 'error' : ''}
          ></textarea>
          {errors.consulta && <span className="error-message">{errors.consulta}</span>}
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