import perfil from "../assets/images/IMG-20251018-WA0010.jpg" 
import "../style/header.css"
import { motion } from "framer-motion"

export const Header = () => {
    return(
        <div className="container-header">

            <motion.div 
                className="container-image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 0.6,
                    ease: "easeOut"
                }}
            >
                <motion.img 
                    src={perfil} 
                    alt="foto-perfil"
                    whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                    }}
                />
            </motion.div>
            
            <motion.div 
                className="info-text"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                    duration: 0.6,
                    delay: 0.2,
                    ease: "easeOut"
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.5,
                        delay: 0.4
                    }}
                >
                    SABRINA RAMOS
                </motion.h2>
                
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.5,
                        delay: 0.6
                    }}
                >
                        LICENCIADA EN PSICOLOGÍA
                </motion.h3>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.5,
                        delay: 0.6
                    }}
                >
                    Acompañamiento profesional para tu bienestar
                </motion.h3>
            </motion.div>
        </div>
    )
}