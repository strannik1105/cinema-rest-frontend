import "./style.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Header} from "@/pages/main/components/header";
import {Main} from "@/pages/main/components/main";
import {Register} from "@/pages/main/components/register";
import {Booking} from "@/pages/main/components/booking";


export const MainPage = () => {
    return (
        <>
            <Header/>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/booking_rooms" element={<Booking/>}/>
                </Routes>
            </main>
        </>
    )
}