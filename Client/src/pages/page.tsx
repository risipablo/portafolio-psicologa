import { BrowserRouter } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { Header } from "../components/header"
import { AboutMe } from "../components/aboutme"
import { ServiceGrid } from "../components/servicesgrid"
import { FAQ } from "../components/faq"
import { Consultorio } from "../components/carousel"
import LocationMap from "../components/locationmap"
import { ContactForm } from "../components/contact"
import Footer from "../components/footer"
import { ScrollTop } from "../utils/scrolltop"
import { Whatsapp } from "../utils/whatsapp"
import { Instagram } from "../utils/instagram"


export const Page = () => {

    return(
        <BrowserRouter>
            <Navbar/>
            <Header/>
            <AboutMe/>
            <ServiceGrid/>
            <FAQ/>
            <Consultorio/>
            <LocationMap/>
            <ContactForm/>
            <Footer/>
            <ScrollTop/>
            <Instagram/>
            <Whatsapp/>
        </BrowserRouter>

    )
}