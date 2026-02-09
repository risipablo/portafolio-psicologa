import { AstrologiaSlider } from "./slider/astrologiaSlider"
import { motion } from "framer-motion";
import { Sparkles, Heart, Users, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import "../../style/astrologia.css";

export const Talleres = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    
    const isInView1 = useInView(ref1, { once: true, margin: "-100px" });
    const isInView2 = useInView(ref2, { once: true, margin: "-100px" });
    const isInView3 = useInView(ref3, { once: true, margin: "-100px" });

    // const containerVariants = {
    //     hidden: { opacity: 0, y: 30 },
    //     visible: {
    //         opacity: 1,
    //         y: 0,
    //         transition: { duration: 0.6, ease: "easeOut" }
    //     }
    // };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
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
                ref={ref1}
                // variants={containerVariants}
                initial="hidden"
                animate={isInView1 ? "visible" : "hidden"}
            >
                <div className="taller-header">
                    <Sparkles className="taller-icon" />
                    <h2>Astrología y Flores de Bach</h2>
                </div>

                <motion.p 
                    className="taller-description"
                    variants={itemVariants}
                >
                    Este taller ofrece un espacio amoroso y cálido, donde el autoconocimiento es el protagonista. 
                    Durante el encuentro, aprenderás sobre la influencia de los astros en tu vida y cómo las Flores 
                    de Bach pueden ayudarte a equilibrar tus emociones. No requiere que tengas conocimientos previos. 
                    Es un momento para disfrutar y conectar.
                </motion.p>

                <motion.div 
                    className="taller-benefits"
                    variants={itemVariants}
                >
                    <h3>¿Qué te llevás del taller?</h3>
                    <ul>
                        <li>
                            <ArrowRight size={18} />
                            <span>Información básica sobre tu carta natal (SOL, LUNA, ASCENDENTE)</span>
                        </li>
                        <li>
                            <ArrowRight size={18} />
                            <span>Un frasco de Flores de Bach personalizado para trabajar tus emociones</span>
                        </li>
                        <li>
                            <ArrowRight size={18} />
                            <span>Información completa sobre Flores de Bach y Astrología</span>
                        </li>
                    </ul>
                </motion.div>

                <AstrologiaSlider />
            </motion.section>

            <motion.section 
                className="taller-card"
                ref={ref2}
                // variants={containerVariants}
                initial="hidden"
                animate={isInView2 ? "visible" : "hidden"}
            >
                <div className="taller-header">
                    <Heart className="taller-icon" />
                    <h2>Biodescodificación y Flores de Bach</h2>
                </div>

                <motion.p 
                    className="taller-description"
                    variants={itemVariants}
                >
                    Este Taller Vivencial combina dos herramientas poderosas: la Biodescodificación y las Flores de Bach. 
                    Juntas, nos ayudan a desbloquear emociones, liberar cargas y sanar desde la raíz. 🌸✨
                </motion.p>

                <motion.div 
                    className="taller-benefits"
                    variants={itemVariants}
                >
                    <h3>¿Qué trabajamos?</h3>
                    <ul>
                        <li>
                            <ArrowRight size={18} />
                            <span>Identificación de bloqueos emocionales y su raíz</span>
                        </li>
                        <li>
                            <ArrowRight size={18} />
                            <span>Herramientas para la sanación emocional y mental</span>
                        </li>
                        <li>
                            <ArrowRight size={18} />
                            <span>Ejercicios con Hipnosis Ericksoniana</span>
                        </li>
                        <li>
                            <ArrowRight size={18} />
                            <span>Acompañamiento personalizado con esencias de Bach</span>
                        </li>
                    </ul>
                </motion.div>
            </motion.section>

            <motion.section 
                className="taller-card"
                ref={ref3}
                // variants={containerVariants}
                initial="hidden"
                animate={isInView3 ? "visible" : "hidden"}
            >
                <div className="taller-header">
                    <Users className="taller-icon" />
                    <h2>Aprendiendo los Órdenes del Amor</h2>
                </div>

                <motion.p 
                    className="taller-subtitle"
                    variants={itemVariants}
                >
                    Fundamentos de las constelaciones familiares
                </motion.p>

                <motion.p 
                    className="taller-description"
                    variants={itemVariants}
                >
                    En este encuentro aprenderemos sobre los Órdenes del Amor de Bert Hellinger. 
                    Podremos mirar desde otro lugar, soltar cargas que no nos corresponden, y honrar 
                    con respeto nuestra historia familiar.
                </motion.p>

                <motion.div 
                    className="taller-benefits"
                    variants={itemVariants}
                >
                    <h3>Trabajaremos sobre:</h3>
                    <ul>
                        <li>
                            <ArrowRight size={18} />
                            <span>Equilibrio entre el dar y tomar</span>
                        </li>
                        <li>
                            <ArrowRight size={18} />
                            <span>Pertenencia</span>
                        </li>
                        <li>
                            <ArrowRight size={18} />
                            <span>Jerarquía</span>
                        </li>
                    </ul>
                </motion.div>

                <motion.div 
                    className="taller-quote"
                    variants={itemVariants}
                >
                    <p>
                        El amor fluye cuando hay orden, cuando cada un@ ocupa su lugar, 
                        cuando tod@s son incluidos y cuando hay equilibrio en los vínculos.
                    </p>
                </motion.div>
            </motion.section>
        </div>
    );
};