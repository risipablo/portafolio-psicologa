import { useParams } from "react-router-dom"
import { useEffect } from "react"
import {Servicios_Data} from "../../data/servicios"
import { Servicios_Meta } from "../../data/servicios";
import { motion } from "framer-motion";
import "../../style/astrologia.css"
import { SliderMaster } from "./slider/sliderMaster";
import { Helmet } from "react-helmet-async";

export const ServiceDetail = () => {

    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const service = Servicios_Data[id as keyof typeof Servicios_Data]

    if (!service) return <p>Servicio no encontrado</p>

    const Icon = service.icon

    
    const isBiosalud = (srv: unknown): srv is typeof Servicios_Data["biosalud-integrativa"] => {
        return srv !== null && typeof srv === 'object' && 'title3' in srv && 'title4' in srv
    }

    
    const isAsesorias = (srv: unknown): srv is typeof Servicios_Data["asesorias"] => {
        return srv !== null && typeof srv === 'object' && 'text3' in srv && 'text4' in srv && 'list2' in srv
    }

    
    const isPsicologiaIntegrativa = (srv: unknown): srv is typeof Servicios_Data["psicoterapia-integrativa"] => {
        return srv !== null && typeof srv === 'object' && 'text6b' in srv && 'list2' in srv && !('title2' in srv)
    }

    const isFormacion = (srv: unknown): srv is typeof Servicios_Data['supervisiones'] => {
        return srv !== null && typeof srv === 'object' && 'listTitle' in srv && 'list1' in srv && !('title2' in srv)
    }

    const meta = Servicios_Meta[id as keyof typeof Servicios_Meta]

    return (
        
        <div className="talleres-container">
            <Helmet>
                <title>{meta?.title ?? "Servicios"}</title>
                <meta name="description" content={meta?.description ?? ""} />
            </Helmet>
            
            <motion.div
                className="talleres-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Hero content si es necesario */}
            </motion.div>

            {/* Sección Principal */}
            <motion.section
                className="taller-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="taller-header">
                    <span className="taller-icon">
                        <Icon />
                    </span>
                    <h2>{service.title1}</h2>
                </div>

                {('title2' in service && service.title2) && (
                    <div className="taller-subtitle-group">
                        <h3>{service.title2}</h3>
                    </div>
                )}

                {isPsicologiaIntegrativa(service) ? (
                    <>
                        {service.text1 && <p className="taller-description">{service.text1}</p>}
                        {service.text2 && <p className="taller-description">{service.text2}</p>}
                        
                        {/* Lista con técnicas integradas */}
                        {'list1' in service && service.list1 && (
                            <ul className="taller-list">
                                {service.list1.split('🔸').filter(Boolean).map((item, idx) => (
                                    <li key={idx}>
                                        <span className="list-icon">🔸</span>
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Textos de integración */}
                        {service.text3 && <p className="taller-description">{service.text3}</p>}
                        {service.text4 && <p className="taller-description">{service.text4}</p>}
                        {service.text5 && <p className="taller-description">{service.text5}</p>}

                        {/* Sección de beneficios */}
                        {service.text6b && (
                            <div className="taller-section">
                                <h4 className="benefits-title">{service.text6b}</h4>
                                {service.list2 && (
                                    <ul className="taller-list">
                                        {service.list2.split('✅').filter(Boolean).map((item, idx) => (
                                            <li key={idx}>
                                                <span className="list-icon">✅</span>
                                                {item.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Texto final */}
                        {service.text7 && <p className="taller-description taller-highlight">{service.text7}</p>}
                    </>
                ) : isAsesorias(service) ? (
                    <>
                        {service.text1 && <p className="taller-description">{service.text1}</p>}
                        {service.text2 && <p className="taller-description">{service.text2}</p>}

                        {service.text3 && <p className="taller-description">{service.text3}</p>}
                        {service.text4 && <p className="taller-description">{service.text4}</p>}

                        {'list1' in service && service.list1 && (
                            <ul className="taller-list">
                                {service.list1.split('🔸').filter(Boolean).map((item, idx) => (
                                    <li key={idx}>
                                        <span className="list-icon">🔸</span>
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {service.text5 && <p className="taller-description">{service.text5}</p>}

                        {'list2' in service && service.list2 && (
                            
                            <ul className="taller-list">
                                {service.listTitle && <p className="taller-description">{service.listTitle}</p>}
                                {service.list2.split('✅').filter(Boolean).map((item, idx) => (
                                    <li key={idx}>
                                        <span className="list-icon">✅</span>
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {'list3' in service && service.list3 && (
                            <ul className="taller-list">
                                {service.listTileB && <p className="taller-description">{service.listTileB}</p>}
                                
                                <>
                                 {service.listTitleC && <p className="titlec">→ {service.listTitleC}</p>}
                                {service.list3.split('✅').filter(Boolean).map((item, idx) => (
                                    <li key={idx}>
                                        <span className="list-icon">✅</span>
                                        
                                        {item.trim()}
                                    </li>
                                ))}
                                </>
                                
                            </ul>
                        )}


                        {service.text6 && <p className="taller-description">{service.text6}</p>}
                        {service.text7 && <p className="taller-description taller-highlight">{service.text7}</p>}
                        {'text8' in service && service.text8 && <p className="taller-description">{service.text8}</p>}
                    </>
                ) : isBiosalud(service) ? (
                    <>
                        {/* Sección Propuesta */}
                        {service.title3 && (
                            <div className="taller-section">
                                <h4>{service.title3}</h4>
                                {service.text1 && <p className="taller-description">{service.text1}</p>}
                                {service.text2 && <p className="taller-description">{service.text2}</p>}
                            </div>
                        )}

                        {/* Sección ¿En qué consiste? */}
                        {service.title4 && (
                            <div className="taller-section">
                                <h4>{service.title4}</h4>
                                {service.text3 && <p className="taller-description">{service.text3}</p>}
                            </div>
                        )}

                        {/* Sección Técnicas */}
                        {service.title5 && (
                            <div className="taller-section">
                                <h4>{service.title5}</h4>
                                {'list1' in service && service.list1 && (
                                    <ul className="taller-list">
                                        {service.list1.split('🔸').filter(item => item.trim()).map((item, idx) => (
                                            <li key={idx}>
                                                <span className="list-icon">🔸</span>
                                                {item.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Sección Enfoque incluye */}
                        {service.title6 && (
                            <div className="taller-section">
                                <h4>{service.title6}</h4>
                                {'list2' in service && service.list2 && (
                                    <ul className="taller-list">
                                        {service.list2.split('.').filter(item => item.trim()).map((item, idx) => (
                                            <li key={idx}>
                                                <span className="list-icon">→</span>
                                                {item.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {service.text6 && <p className="taller-description taller-highlight">{service.text6}</p>}
                        {service.text7 && <p className="taller-description">{service.text7}</p>}
                    </>
                ) : isFormacion(service) ? (
                    <>
                        {/* Renderizado específico para Formaciones */}
                        {service.text1 && <p className="taller-description">{service.text1}</p>}
                        {service.text2 && <p className="taller-description">{service.text2}</p>}
                        {service.text3 && <p className="taller-description">{service.text3}</p>}
                        {service.text4 && <p className="taller-description">{service.text4}</p>}
                        
                        {/* Título de los tres pilares */}
                        {service.listTitle && (
                            <div className="taller-section">
                                <h4 className="benefits-title">{service.listTitle}</h4>
                            </div>
                        )}
                        
                        {/* Lista de los tres pilares */}
                        {'list1' in service && service.list1 && (
                            <ul className="taller-list">
                                {service.list1.split('🔸').filter(Boolean).map((item, idx) => (
                                    <li key={idx}>
                                        <span className="list-icon">🔸</span>
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        
                        
                    </>
                ) : (
                    <>
                        {/* Renderizado estándar para otros servicios */}
                        {service.text1 && <p className="taller-description">{service.text1}</p>}
                        {service.text2 && <p className="taller-description">{service.text2}</p>}
                        

                        {'list1' in service && typeof service.list1 === 'string' && service.list1 && (
                            <ul className="taller-list">
                                {service.list1.split('🔸').filter(Boolean).map((item: string, idx: number) => (
                                    <li key={idx}>
                                        <span className="list-icon">🔸</span>
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        )}


                        {service.text3 && <p className="taller-description">{service.text3}</p>}
                        {'text4' in service && typeof service.text4 === 'string' && service.text4 && (
                            <p className="taller-description">{service.text4}</p>
                        )}
                        {'text5' in service && typeof service.text5 === 'string' && service.text5 && (
                            <p className="taller-description">{service.text5}</p>
                        )}

                        {'list2' in service && typeof service.list2 === 'string' && service.list2 && (
                            <ul className="taller-list">
                                {service.list2.split('✅').filter(Boolean).map((item: string, idx: number) => (
                                    <li key={idx}>
                                        <span className="list-icon">✅</span>
                                        {item.trim()}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {'text6' in service && typeof service.text6 === 'string' && service.text6 && (
                            <p className="taller-description">{service.text6}</p>
                        )}
                        {'text7' in service && typeof service.text7 === 'string' && service.text7 && (
                            <p className="taller-description">{service.text7}</p>
                        )}
                    </>
                )}
            </motion.section>

            {/* Servicios secundarios */}
            {'services2' in service && service.services2.map((item, idx) => (
                <motion.section
                    className="taller-card"
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="taller-header">
                        <span className="taller-icon">
                            <Icon />
                        </span>
                        <h2>{item.title1}</h2>
                    </div>
                    {item.title2 && (
                        <div className="taller-subtitle-group">
                            <h3>{item.title2}</h3>
                        </div>
                    )}
                    {item.text1b && (
                        <p className="taller-description">
                            {item.text1b}
                        </p>
                    )}
                    <SliderMaster />
                </motion.section>
            ))}
        </div>
    )
}