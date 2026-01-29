import '../style/service.css'
import { Brain, Heart, Users,BookOpenText , Cloud, TrendingUp } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const ServiceGrid = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const services = [
        { Icon: Brain, title: "Tratamiento" },
        { Icon: Cloud, title: "Asesorias" },
        { Icon: BookOpenText, title: "Formaciones" },
        { Icon: Users, title: "Talleres" },
        { Icon: Heart, title: "Programas" },
        { Icon: TrendingUp, title: "" }
    ];
    

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
                <h2> ATENCION Y ESPECIALIZACIONES </h2>
            </motion.div>

            <div className='icon-grid'>
                {services.map((service, index) => (
                    <motion.div 
                        key={index}
                        className='icon-card'
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ 
                            duration: 0.5, 
                            delay: 0.3 + (index * 0.1) 
                        }}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <service.Icon className='icon' />
                        <h3>{service.title}</h3>
                    </motion.div>
                ))}
            </div>

        </motion.div>
    )
}