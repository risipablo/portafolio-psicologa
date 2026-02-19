import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import "../style/faq.css"

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "¿Cómo es la primera sesión?",
      answer: "La primera sesión es un espacio de encuentro donde nos conocemos y podrás contar qué te trae a terapia y qué esperás del proceso. La psicología integrativa entiende a cada persona como un todo, por lo que en esta entrevista inicial exploramos aspectos emocionales, cognitivos, corporales y del contexto personal para comprender tu situación de manera amplia. Es un momento para que puedas hacer todas las preguntas que necesites y evaluar si te sentís cómod@ con el enfoque y la manera de trabajar."
    },
    {
      question: "¿Cuánto dura el tratamiento?",
      answer: "La duración del tratamiento es única para cada persona, ya que depende de tus necesidades, objetivos y proceso personal. Algunas personas encuentran alivio en pocas sesiones, mientras que otras necesitan un tiempo más prolongado. Lo importante es que avancemos a tu ritmo, respetando tus tiempos y evaluando juntos el progreso en cada etapa."
    },
    {
      question: "¿Ofrecés sesiones online?",
      answer: "Sí, ofrezco sesiones online a través de plataformas seguras como Zoom o Google Meet. Esta modalidad te permite acceder a terapia desde la comodidad de tu hogar, sin importar donde te encuentres. Las sesiones virtuales mantienen la misma calidad, confidencialidad y profesionalismo que las presenciales."
    },
    {
      question: "¿Qué métodos terapéuticos utilizás?",
      answer: "Trabajo desde un Enfoque Integrativo que combina diferentes herramientas terapéuticas según tus necesidades. Integro la Psicología tradicional con técnicas complementarias como la Biodescodificación, Terapia Floral, Astrología Psicológica, Constelaciones Familiares, Programación Neurolingüística, entre otras."
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      className="container-faq"
      id='preguntas'
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
        <h2>Preguntas Frecuentes</h2>
      </motion.div>

      <motion.p 
        className="description-faq"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Aquí encontrarás respuestas a las consultas más comunes sobre el proceso terapéutico. 
        Si tienes otras preguntas, no dudes en contactarme.
      </motion.p>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.button 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              whileTap={{ scale: 0.98 }}
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown 
                  className="faq-icon"
                  size={24}
                />
              </motion.div>
            </motion.button>
            
            <motion.div 
              className="faq-answer"
              initial={false}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p>{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};