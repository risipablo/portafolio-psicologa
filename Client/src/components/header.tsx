import perfil from "../assets/images/IMG-20251018-WA0010.jpg";
import "../style/header.css";
import { motion } from "framer-motion";

export const Header = () => {
    // Imagen
    const imageVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    
    const textContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    
    const letterVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 12
            },
            
        }
    };

    // Subtítulos
    const h3Variants = {
        hidden: { opacity: 0, y: 20, scale: 0.85 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 18
            }
        }
    };
    const h3Variants2 = {
        hidden: { opacity: 0, y: 20, scale: 0.85 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 30,
                damping: 18
            }
        }
    };

    const text = "SABRINA RAMOS";
    const letters = text.split("");

    // Duración automática del h2
    const h2Duration = letters.length * 0.05;

    return (
        <div className="container-header">
            {/* Imagen */}
            <motion.div
                className="container-image"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                variants={imageVariants as any}
                initial="hidden"
                animate="visible"
            >
                <motion.img
                    src={perfil}
                    alt="foto-perfil"
                    whileHover={{
                        scale: 1.05,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.5 }
                    }}
                />
            </motion.div>

            
            <div className="info">
                
                <motion.h2
                    style={{ display: "flex", overflow: "hidden" }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    variants={textContainerVariants as any}
                    initial="hidden"
                    animate="visible"
                >
                    {letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            variants={letterVariants as any}
                            style={{
                                display: "inline-block",
                                marginRight: letter === " " ? "0.3em" : "0"
                            }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.h2>


                <div className="sub-titles">
                    <motion.h3
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        variants={h3Variants as any}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: h2Duration + 0.6 }}
                    >
                        LICENCIADA EN PSICOLOGÍA
                    </motion.h3>

                    <motion.h3
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        variants={h3Variants2 as any}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: h2Duration + 0.9 }}
                    >
                        Acompañamiento profesional para tu bienestar
                    </motion.h3>
                </div>
            </div>
        </div>
    );
};
