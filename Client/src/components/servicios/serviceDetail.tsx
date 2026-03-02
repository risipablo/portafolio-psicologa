import { useParams } from "react-router-dom"
import { Servicios_Data } from "../../data/servicios"
// import { useRef } from "react"
import { motion } from "framer-motion";
import "../../style/astrologia.css"

export const ServiceDetail = () => {

    const {id} = useParams<{id:string}>()
    const service = Servicios_Data[id as keyof typeof Servicios_Data]
    if(!service) return <p> Servicio no encontrado </p>

    const Icon = service.icon

    // const ref1 = useRef(null);
    // const ref2 = useRef(null);
    // const ref3 = useRef(null);

    // const isInView1 = useInView(ref1, { once: true, margin: "-100px" });
    // const isInView2 = useInView(ref2, { once: true, margin: "-100px" });
    // const isInView3 = useInView(ref3, { once: true, margin: "-100px" });

    // const itemVariants = {
    //     hidden: { opacity: 0, x: -20 },
    //     visible: {
    //         opacity: 1,
    //         x: 0,
    //         transition: { duration: 0.5 }
    //     }
    // };

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
                // ref={ref1}
                initial="hidden"
                // animate={isInView1 ? "visible" : "hidden"}
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
                    // variants={itemVariants}
                >
                    <p>{service.text1}</p>
                </p>


                <p 
                    className="taller-description"
                    // variants={itemVariants}
                >
                    {service.text2}
                </p>
                

                <p 
                    className="taller-description"
                    // variants={itemVariants}
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
                        <h3 >{service.title2}</h3>
                        </div>
                    
                        <p 
                    className="taller-description"
                    // variants={itemVariants}
                >
                    <p>{service.text1}</p>
                </p>

                    </section>
                ))
            }

                

        </div>
    )
}