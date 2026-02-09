
import { useState } from "react"
import logo from "../assets/svg/logo.svg"
import { NavLink } from "react-router-dom"
import "../style/navbar.css"
// import logo2 from "../assets/images/logo.png"

export const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false)

    const toggleMenu = () => {
        setIsMenu(!isMenu)
    }

    const closeMenu = () => {
        setIsMenu(false)
    }



    return(
        <div className="container-navbar">
            <div className="navbar">

                <div className="logo-container">
                    <NavLink to="/">
                    <img src={logo} alt="logo" />
                    </NavLink>
                    
                </div>

                <div className={`menu ${isMenu ? 'open' : ''}`}>
                    <NavLink to="/sobre-mi" onClick={closeMenu} className="active">
                        Sobre Mi
                    </NavLink> 
                    <NavLink to="/articulos"onClick={closeMenu}  className="active">
                        Preguntas Frecuentes
                    </NavLink>
                    <NavLink to="/contacto"onClick={closeMenu}  className="active">
                        Ubicación
                    </NavLink>

                    <NavLink to="/contacto"onClick={closeMenu}  className="active">
                        Contacto
                    </NavLink>

                    <div className="user-mobile">
                        User
                    </div>

                </div>

                <div className="user-container">
                    User
                </div>

                <div className="menu-icon" onClick={toggleMenu} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>
        </div>
    )
}