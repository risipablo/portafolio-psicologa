import { Instagram } from "@mui/icons-material"
import '../style/insta.css'

export const Insta = () => {
    return(
        <div className="container-insta">
            <div className="insta-content">
                <Instagram className="insta-icon" />
                <div className="insta-text">
                    <h3>Sígueme en Instagram</h3>
                    <p>No te pierdas mis reels, consejos semanales sobre bienestar emocional, ejercicios prácticos y reflexiones que te ayudarán en tu camino de autoconocimiento y crecimiento personal.</p>
                </div>
            </div>
            <a href="https://instagram.com/tu-usuario" className="insta-button" target="_blank" rel="noopener noreferrer">
                Ver Más
            </a>
        </div>
    )
}