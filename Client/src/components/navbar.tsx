import { useState } from "react"
import logo from "../assets/svg/logo.svg"
import { NavLink } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import "../style/navbar.css"

export const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false)
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenu(!isMenu)
    }

    const closeMenu = () => {
        setIsMenu(false)
        setIsSubmenuOpen(false)
    }

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen)
    }

    

    return(
        <div className="container-navbar">
            {/* Overlay oscuro */}
            {isMenu && <div className="overlay" onClick={closeMenu}></div>}
            
            <div className="navbar">

                <div className="logo-container">
                    <NavLink to="/">
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>

                <div className={`menu ${isMenu ? 'open' : ''}`}>
                    <HashLink smooth to="/#sobre-mi"onClick={closeMenu} className="menu-item">
                        Sobre Mi
                    </HashLink> 
                    
                    <div className={`menu-item-with-submenu ${isSubmenuOpen ? 'open' : ''}`}>
                        <button 
                            className="menu-item submenu-trigger"
                            onClick={toggleSubmenu}
                        >
                            Especializaciones
                            <span className="arrow-icon">›</span>
                        </button>
                        
                        <div className={`submenu ${isSubmenuOpen ? 'open' : ''}`}>
                            <NavLink to="/psicoterapia" onClick={closeMenu} className="submenu-item">
                                Psicoterapia
                            </NavLink>
                            <NavLink to="/accesorios" onClick={closeMenu} className="submenu-item">
                                Accesorios
                            </NavLink>
                            <NavLink to="/psicoterapia-integrativa" onClick={closeMenu} className="submenu-item">
                                Psicoterapia Integrativa
                            </NavLink>
                            <NavLink to="/talleres" onClick={closeMenu} className="submenu-item">
                                Talleres
                            </NavLink>
                            <NavLink to="/biosalud-integrativa" onClick={closeMenu} className="submenu-item">
                                Biosalud Integrativa
                            </NavLink>
                            <NavLink to="/formaciones" onClick={closeMenu} className="submenu-item">
                                Formaciones
                            </NavLink>
                        </div>
                    </div>

                    <HashLink smooth to="/#preguntas" onClick={closeMenu} className="menu-item">
                        Preguntas Frecuentes
                    </HashLink>
                    <HashLink smooth to="/#ubicacion" onClick={closeMenu} className="menu-item">
                        Ubicación
                    </HashLink>
                    <HashLink smooth to="/#contacto" onClick={closeMenu} className="menu-item">
                        Contacto
                    </HashLink>
                </div>

                <div className={`menu-icon ${isMenu ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>
        </div>
    )
}