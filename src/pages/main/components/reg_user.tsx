import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Header} from "@/pages/main/components/header";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";


export const RegUser = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const loginUser = async () => {
        return axios.post(`http://localhost:8001/api/v1/users/`, {name: username, email: email, password: password})
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        localStorage.setItem("user", username);
        const a = await loginUser()
        console.log(a.data)
        localStorage.setItem("booking_access_token", a.data.access_token)
        localStorage.setItem("user_role", a.data.user_role)
        localStorage.setItem("username", username)
        localStorage.setItem("user_sid", a.data.user_sid)
        navigate("/booking_rooms")
    }

    return (
        <>
            <Header/>
            <main className="main">
                <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                    <label htmlFor="name">Логин</label>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="name">Email</label>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="genre">Пароль</label>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <Button label="Зарегистрироваться"/>
                </form>
                <h2>Есть аккаунта? <Link to="/main_login">Войти</Link></h2>
            </main>
        </>

    )
}