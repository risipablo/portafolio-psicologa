import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Servicios_Data } from "../../data/servicios"
import { motion } from "framer-motion";
import "../../style/astrologia.css"

export const ServiceDetail = () => {

    const {id} = useParams<{id:string}>()
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const service = Servicios_Data[id as keyof typeof Servicios_Data]
    if(!service) return <p> Servicio no encontrado </p>

    const Icon = service.icon

    return(
        <div className="talleres-container">
            <motion.div 
                className="talleres-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                
            </motion.div>

            <motion.section 
                className="taller-card"
                initial="hidden"
            >
                <div className="taller-header">
                    <span className="taller-icon">
                        <Icon />
                    </span>
                    <h2>{service.title1} </h2>
                    
                </div>

                <div className="taller-header">
                <h3 >{service.title2}</h3>
                </div>
                    
                <p 
                    className="taller-description"
                >
                    <p>{service.text1}</p>
                </p>

                <p 
                    className="taller-description"
                >
                    {service.text2}
                </p>

                <p 
                    className="taller-description"
                >
                    {service.text3}
                </p>
                
            </motion.section>
                

            {
            service.services2.map((item,idx) => (
                <section 
                className="taller-card"
                key={idx}> 

                    <div className="taller-header">
                        <span className="taller-icon">
                            <Icon />
                        </span>
                        <h2>{item.title1} </h2>
                    </div>

                    
                    <div className="taller-header">
                    <h3 >{item.title2}</h3>
                    </div>
                
                    <p 
                        className="taller-description"
                    >
                        <p>{item.text1b}</p>
                    </p>

                </section>
            ))
            }

        </div>
    )
}