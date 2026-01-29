import { BrowserRouter } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Header } from "../components/Header"
import { AboutMe } from "../components/AboutMe"
import { ServiceGrid } from "../components/ServicesGrid"
import { FAQ } from "../components/Faq"
import { Consultorio } from "../components/Carousel"
import LocationMap from "../components/LocationMap"
import { ContactForm } from "../components/Contact"
import Footer from "../components/Footer"
import { ScrollTop } from "../utils/ScrollTop"


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