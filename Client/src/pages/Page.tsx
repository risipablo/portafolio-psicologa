import { BrowserRouter } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { Header } from "../components/header"
import { AboutMe } from "../components/aboutme"
import { ServiceGrid } from "../components/servicesGrid"
import { FAQ } from "../components/faq"
import { Consultorio } from "../components/carousel"
import LocationMap from "../components/locationMap"
import { ContactForm } from "../components/contact"
import Footer from "../components/footer"
import { ScrollTop } from "../utils/scrolltop"


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
        </BrowserRouter>

    )
}