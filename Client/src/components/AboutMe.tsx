import "../style/aboutMe.css"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import image1 from "../../src/assets/images/sr4.jpeg"

export const AboutMe = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return(
        <motion.div 
            className="container-about"
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
                <h2> SOBRE MÍ </h2>
            </motion.div>

            <div className="img-sr">
                <motion.img 
                    src={image1} 
                    alt="foto profesional"
                    initial={{ opacity: 0, x: -80 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
                    transition={{ duration: 1, delay: 0.2 }} 
                />
            </div>

            <div className="text-about">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Soy Sabrina Ramos Licenciada en Psicología graduada en Universidad Nacional del Comahue, con más de 15 años de experiencia.  Especializada en Abordajes Integrativos de la salud mental, combinando modelos psicológicos basados en evidencia con terapias complementarias que potencian el bienestar emocional.
                    
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    
                    Mi enfoque busca acompañarte en tu proceso personal, respetando tu singularidad y brindando herramientas para afrontar los desafíos de la vida.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                >
                    Creo en la importancia de generar un espacio seguro, cálido y profesional, donde puedas explorar tus emociones, pensamientos y conductas, favoreciendo el equilibrio y el crecimiento personal.
                    Mi compromiso es ofrecerte un acompañamiento que integre distintas perspectivas para que encuentres recursos que se adapten a tus necesidades y objetivos.
                </motion.p>

                
            </div>
        </motion.div>
    )
}