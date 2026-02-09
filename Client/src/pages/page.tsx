import { BrowserRouter, Route, Routes } from "react-router-dom"
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
import { Talleres } from "../components/servicios/talleres"


export const Page = () => {

    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header/>
                        <AboutMe/>
                        <ServiceGrid/>
                        <FAQ/>
                        <Consultorio/>
                        <LocationMap/>
                        <ContactForm/>
                        <Footer/>
                    </>
                }/>
                <Route path="/section/:id"/>
                <Route path="/talleres" element={<Talleres/>}/>
            </Routes>

            <ScrollTop/>
            <Instagram/>
            <Whatsapp/>
        </BrowserRouter>

    )
}