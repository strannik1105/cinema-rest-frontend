import React, {useState} from "react";
import {Card} from "primereact/card";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {useNavigation} from "@refinedev/core";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export const UserCreate = () => {
    const [username, serUsername] = useState<any>();
    const [password, setPassword] = useState<any>();
    const [email, setEmail] = useState<any>();
    const [role, setRole] = useState<any>();

    const roles = [
        {name: 'Админ', code: 'ADMIN'},
        {name: 'Пользователь', code: 'USER'},
        {name: 'Сотрудник', code: 'WORKER'},
    ];

    const {list} = useNavigation();
    const navigate = useNavigate();

    const onSubmit = (event: any) => {
        event.preventDefault();

        axios.post("http://127.0.0.1:8001/api/v1/users/", {
            name: username,
            password: password,
            email: email,
            role: role.code
        })
         navigate("/users/")
    }

    return (
        <Card
            className="shadow-1"
            title={
                <div className="flex justify-content-between align-items-center justify-content-center">
                    <span className="text-3xl p-card-title">Редактирование записи</span>
                    <div className="flex gap-3">
                        <ListNavButton handleClick={() => list("users")}/>
                    </div>
                </div>
            }
        >
            <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                <label htmlFor="name">Имя пользователя</label>
                <InputText value={username} onChange={(e) => serUsername(e.target.value)}/>

                <label htmlFor="description">Пароль</label>
                <InputText value={password} onChange={(e) => setPassword(e.target.value)}/>

                <label htmlFor="price">Email</label>
                <InputText value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="email">Роль</label>
                <Dropdown id="role" name="role" value={role}
                          onChange={(e) => setRole(e.value)} options={roles}
                          optionLabel="name"
                          placeholder="Выберите роль" className="w-full md:w-14rem"/>


                <Button label="Добавить запись"/>

            </form>

        </Card>
    )
}