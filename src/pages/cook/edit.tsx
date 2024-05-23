import React from "react";
import {IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {useParams} from "react-router-dom";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {ICook} from "@/interfaces/cook";


export const CookEdit: React.FC<IResourceComponentsProps> = () => {
    const params = useParams();

    const {
        queryResult, onFinish
    } = useForm<ICook>({
        resource: "cook",
        action: "edit",
        redirect: "list",
        id: params.id
    });

    const {list, create} = useNavigation();

    const record = queryResult?.data?.data;

    const onSubmit = (event: any) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target).entries());

        onFinish({
                name: data.name,
                surname: data.surname,
            }
        );
    };

    if (record) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Редактирование записи</span>
                        <div className="flex gap-3">
                            <AddNavButton handleClick={() => create("cook")}/>
                            <ListNavButton handleClick={() => list("cook")}/>
                        </div>
                    </div>
                }
            >
                <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                    <label htmlFor="name">Имя</label>
                    <input type="text" id="name" name="name" defaultValue={record?.name}/>

                    <label htmlFor="surname">Фамилия</label>
                    <textarea
                        id="surname"
                        name="surname"
                        defaultValue={record?.surname}
                    />

                    <button type="submit">Submit</button>
                </form>
            </Card>
        );
    }
    return <Card title="Редактирование записи"></Card>
}