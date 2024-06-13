import React, {useState} from "react";
import {HttpError, IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {IWaiter, IWaiterForm} from "@/interfaces/waiters";
import {Card} from "primereact/card";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";


export const WaiterCreate: React.FC<IResourceComponentsProps> = () => {
    const {onFinish} = useForm<IWaiter, HttpError, IWaiterForm>({
        resource: "waiter",
        action: "create",
        redirect: "list",
    });

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");

    const {list} = useNavigation();

    const onSubmit = (event: any) => {
        event.preventDefault();
        onFinish({
            name: name,
            surname: surname,
        });
    }

    return (
        <Card
            className="shadow-1"
            title={
                <div className="flex justify-content-between align-items-center justify-content-center">
                    <span className="text-3xl p-card-title">Добавление записи</span>
                    <div className="flex gap-3">
                        <ListNavButton handleClick={() => list("waiter")}/>
                    </div>

                </div>
            }
        >
            <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                <label htmlFor="name">Имя</label>
                <InputText value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="description">Фамилия</label>
                <InputText value={surname} onChange={(e) => setSurname(e.target.value)}/>

                <Button label="Добавить запись"/>
            </form>
        </Card>
    )
}