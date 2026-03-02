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
import { ServiceDetail } from "../components/servicios/serviceDetail"


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
               
                <Route path="/talleres" element={<Talleres/>}/>
                <Route path="/:id" element={<ServiceDetail/>}/>
                <Route path="/section/:id" element={<ServiceDetail/>} />
            </Routes>

            <ScrollTop/>
            <Instagram/>
            <Whatsapp/>
        </BrowserRouter>

    )
}