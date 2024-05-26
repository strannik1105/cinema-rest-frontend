import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from 'primereact/password';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Header} from "@/pages/main/components/header";
import {Button} from "primereact/button";

export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const onSubmit = (event: any) => {
        event.preventDefault();
        localStorage.setItem("user", username);

        axios.post(`http://localhost:8000/api/v1/auth/login/root`,
            {username: "root", password: "qqq"},
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(data => navigate('/booking_rooms'))

    }

    return (
        <>
            <Header/>
            <main className="main">
                <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                    <label htmlFor="name">Логин</label>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="genre">Пароль</label>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <Button label="Войти/зарегистироваться"/>
                </form>
            </main>
        </>

    )
};
