import '../style/service.css'
import image1 from "../assets/images/tratamiento.jpeg"
import image2 from "../assets/images/asesorias.jpeg"
import image3 from "../assets/images/Formaciones.jpeg"
// import image4 from "../assets/images/talleres.jpeg"
import image5 from "../assets/images/programas.jpeg"
import image6 from "../assets/images/piscoint.jpeg"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const ServiceGrid = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const services = [
        {id:1, title:"Psicoterapia", image:image1},
        {id:2, title:"Asesorias", image:image2},
        {id:3, title:"Formaciones", image:image5},
        {id:4, title:"Talleres", image:image3},
        {id:5, title:"BioSalud Integrativa", image:image5},
        {id:6, title:"Psicoterapia Integrativa", image:image6},
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

            <div className='service-grid'>
                {services.map((service, index) => (
                    <motion.div 
                        key={index}
                        className="icon-card"
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.12,
                            ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.05 }}
                        >
                        <img src={service.image} alt={service.title} />
                        <h3>{service.title}</h3>
                    </motion.div>
                ))}
            </div>

        </motion.div>
    )
}