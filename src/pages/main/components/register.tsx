import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from 'primereact/password';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Header} from "@/pages/main/components/header";
import {Button} from "primereact/button";

export const MainLogin = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const loginUser = async () => {
        return axios.post(`http://localhost:8001/api/v1/auth/token?username=${username}&password=${password}`)
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
        <div className="site_content">
            <Header/>
            <main className="main">
                <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                    <label htmlFor="name">Логин</label>
                    <InputText className="w-12rem" value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="genre">Пароль</label>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <Button className="w-12rem" label="Войти"/>
                </form>
                <h2>Нет аккаунта? <Link to="/main_reg">Зарегистрироваться</Link></h2>
            </main>
            <footer className="footer">
                <p>Адрес: ул Красная 135</p>
                <p>Номер телефона: 89186968405</p>
            </footer>
        </div>

    )
};
