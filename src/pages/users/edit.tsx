import {useParams} from "react-router-dom";
import {useForm, useNavigation} from "@refinedev/core";
import {IFood} from "@/interfaces/food";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {Button} from "primereact/button";
import React, {useState} from "react";
import {Dropdown} from "primereact/dropdown";


export const UserEdit = () => {
    const params = useParams();

    const {
        queryResult, onFinish
    } = useForm<any>({
        resource: "users",
        action: "edit",
        redirect: "list",
        id: params.id
    });

    const {list} = useNavigation();

    const record = queryResult?.data?.data;

    const onSubmit = (event: any) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target).entries());

        onFinish({
                name: data.name,
                email: data.email,
                role: selectedCity.code,
                old_password: null,
                new_password: null
            }
        );
    };

    const [selectedCity, setSelectedCity] = useState<any>();

    const roles = [
        {name: 'Админ', code: 'ADMIN'},
        {name: 'Пользователь', code: 'USER'},
        {name: 'Сотрудник', code: 'WORKER'},
    ];

    if (record) {
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
                    <p className="text-field">
                        <label htmlFor="name">Логин</label>
                        <input type="text" id="name" name="name" defaultValue={record?.name}/>
                    </p>
                    <p className="text-field">
                        <label htmlFor="email">Логин</label>
                        <input type="text" id="email" name="email" defaultValue={record?.email}/>
                    </p>
                    <p className="text-field">
                        <label htmlFor="email">Роль</label>
                        <Dropdown id="role" name="role" value={selectedCity}
                                  onChange={(e) => setSelectedCity(e.value)} options={roles}
                                  optionLabel="name"
                                  placeholder="Select a City" className="w-full md:w-14rem"/>
                    </p>

                    <Button label="Изменить запись"/>
                </form>
            </Card>
        );
    }
    return <Card title="Редактирование записи"></Card>

}