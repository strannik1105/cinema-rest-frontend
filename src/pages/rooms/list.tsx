import React, {useEffect, useState} from "react";
import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import {IRoom} from "@/interfaces/room";
import {IMovie} from "@/interfaces/movie";
import {DeleteIcon, EditIcon, ShowIcon} from "@/components/actions/common";
import {ColumnMeta} from "@/interfaces/common";
import {Card} from "primereact/card";
import {DatatableView} from "@/components/datatableView";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {Layer, Rect, Stage, Text} from "react-konva";
import axios from "axios";

export const RoomsList: React.FC<IResourceComponentsProps> = () => {
    const {mutate} = useDelete();

    const {edit, show, create} = useNavigation();

    const actionBodyTemplate = (rowData: IMovie) => {
        return (
            <>
                <EditIcon
                    icon="pi pi-pencil"
                    onClick={() => edit("rooms", rowData.sid)}
                />

                <ShowIcon
                    icon="pi pi-eye"
                    onClick={() => show("rooms", rowData.sid)}
                />
                <DeleteIcon
                    className="bg-red-500 text-0"
                    icon="pi pi-trash"
                    onClick={(event) => {
                        confirmPopup({
                            target: event.currentTarget,
                            message: 'Удалить этот фильм?',
                            icon: 'pi pi-info-circle',
                            defaultFocus: 'reject',
                            acceptClassName: 'p-button-danger',
                            accept: () => mutate({resource: "rooms", id: rowData.sid})
                        })
                    }}
                />
            </>
        );
    }

    const columns: ColumnMeta[] = [
        {field: "name", header: "Название", filter: true},
        {field: "description", header: "Описание", filter: false, sortable: false},
        {field: "cost_per_hour", header: "Цена в час", filter: true},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    const [rooms, setRooms] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/rooms/")
            .then(data => {
                data.data.forEach((el: any) => el["isDragging"] = false)
                setRooms(data.data)
            })
    }, [])

    const saveSubmit = () => {
        console.log(rooms)
        rooms.forEach((el: any) => {
            axios.patch("http://localhost:8001/api/v1/rooms/" + el.sid, el).then(() => console.log("ГОЙДА!!!!!"))
        })
    }

    if (rooms) {

        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Список комнат</span>
                        <AddNavButton
                            handleClick={() => create("rooms")}
                        />
                    </div>
                }

            >

                <Stage width={500} height={500}>
                    <Layer>
                        <Text fontSize={15}/>
                        {
                            rooms?.map((el: any) => {
                                return (
                                    <div id={el.sid}>
                                        <Rect
                                            text='container'
                                            draggable
                                            x={el.x}
                                            y={el.y}
                                            width={100}
                                            height={100}
                                            fill="red"
                                            shadowBlur={10}
                                            onDragStart={(e) => {
                                                const a = rooms.find((el: any) => el.sid == e.target.parent?.attrs.id)
                                                a.isDragging = true;

                                            }}
                                            onDragEnd={(e) => {
                                                const a = rooms.find((el: any) => el.sid == e.target.parent?.attrs.id)
                                                a.isDragging = false;
                                                a.x = e.target.x();
                                                a.y = e.target.y();
                                                setRooms(rooms);
                                            }}
                                        />
                                        <Text text={el.name} fontSize={15} x={el.x + 10}
                                              y={el.y + 25} width={100}
                                              height={100}/>
                                    </div>

                                )
                            })
                        }
                    </Layer>
                </Stage>
                 <AddNavButton
                    handleClick={() => saveSubmit()}
                />
            </Card>

        )
    }
    return <Card
        className="shadow-1"
        title={
            <div className="flex justify-content-between align-items-center justify-content-center">
                <span className="text-3xl p-card-title">Список комнат</span>
                <AddNavButton
                    handleClick={() => create("rooms")}
                />
            </div>
        }

    />
}