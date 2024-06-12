import "./style.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Header} from "@/pages/main/components/header";
import {Main} from "@/pages/main/components/main";
import {Booking} from "@/pages/main/components/booking";
import {MainLogin} from "@/pages/main/components/register";


export const MainPage = () => {
    return (
        <div className="site_content">
            <Header/>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/register" element={<MainLogin/>}/>
                    <Route path="/booking_rooms" element={<Booking/>}/>
                </Routes>
            </main>
        </div>
    )
}