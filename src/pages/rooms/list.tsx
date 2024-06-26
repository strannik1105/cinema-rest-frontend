import React, {useEffect, useState} from "react";
import {IResourceComponentsProps, useNavigation} from "@refinedev/core";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {Layer, Rect, Stage, Text} from "react-konva";
import axios from "axios";
import {EditNavButton} from "@/components/navButtons/editNavButton";
import Konva from "konva";
import Label = Konva.Label;

export const RoomsList: React.FC<IResourceComponentsProps> = () => {
    const {create} = useNavigation();

    const [rooms, setRooms] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/rooms/")
            .then(data => {
                data.data.forEach((el: any) => el["isDragging"] = false)
                setRooms(data.data)
            })
    }, [])

    const saveSubmit = () => {
        rooms.forEach((el: any) => {
            axios.patch("http://localhost:8001/api/v1/rooms/" + el.sid, el).then(() =>{
                 console.log("ГОЙДА!!!!!")
                console.log(rooms)
            })
        })
    }

    const onRoomDragStart = (e: any) => {
        console.log(e)
        const a = rooms.find((el: any) => el.sid == e.target.parent?.attrs.id)
        a.isDragging = true;
        setX(e.target.x())
        setY(e.target.y())
    }

    const [x, setX] = useState<any>()
    const [y, setY] = useState<any>()

    console.log(rooms)

    const onRoomDragEnd = (e: any) => {
        const a = rooms.find((el: any) => el.sid == e.target.parent?.attrs.id)
        a.isDragging = false;
        a.x = e.target.x() + 200;
        a.y = e.target.y() - 50;
        setRooms(rooms);
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

                <Stage width={900} height={700}>
                    <Layer>
                        {
                            rooms?.map((el: any) => {
                                return (
                                    <div
                                        id={el.sid}
                                        draggable
                                        onDragStart={(e) => {
                                            // @ts-ignore
                                            const a = rooms.find((el: any) => el.sid == e.target.attrs.id)
                                            a.isDragging = true;

                                        }}
                                        onDragEnd={(e) => {
                                            // @ts-ignore
                                            const a = rooms.find((el: any) => el.sid == e.target.attrs.id)
                                            // @ts-ignore
                                            a.x = e.evt.layerX - 15;
                                            // @ts-ignore
                                            a.y = e.evt.layerY - 30;
                                            a.isDragging = false;
                                            setRooms(rooms);
                                        }}
                                    >
                                        <Rect
                                            fillPriority={"asd"}
                                            text='123'
                                            draggable
                                            x={el.x}
                                            y={el.y}
                                            width={90}
                                            height={90}
                                            fill="#d92929"
                                            opacity={0.4}
                                            onDragStart={(e) => onRoomDragStart(e)}
                                            onDragEnd={(e) => onRoomDragEnd(e)}
                                        />
                                        <Text text={el.name} fontSize={15} x={el.x + 10}
                                              y={el.y + 25} width={100}
                                              height={100}

                                        />
                                    </div>

                                )
                            })
                        }
                    </Layer>
                </Stage>
                <EditNavButton
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