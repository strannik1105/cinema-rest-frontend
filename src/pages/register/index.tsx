import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from 'primereact/password';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const onSubmit = (event: any) => {
        event.preventDefault();

        if (username === "root" && password === "qqq") {
            axios.post(`http://localhost:8000/api/v1/auth/login/${username}`,
                {username: username, password: password},
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(data => navigate('/index'))
        }

        }

        return (
            <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                <label htmlFor="name">Name</label>
                <InputText value={username} onChange={(e) => setUsername(e.target.value)}/>


                <label htmlFor="genre">Password</label>
                <Password value={password} onChange={(e) => setPassword(e.target.value)}/>


                <button type="submit">Submit</button>
            </form>
        )
    };
