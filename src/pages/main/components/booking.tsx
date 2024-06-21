import {Layer, Rect, Stage, Text} from "react-konva";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {RoomModal} from "@/pages/main/components/room_modal";
import {Dialog} from "primereact/dialog";
import {Link} from "react-router-dom";
import {Header} from "@/pages/main/components/header";


export const Booking = () => {

    const [rooms, setRooms] = useState<any>();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/rooms/")
            .then(data => {
                setRooms(data.data)
            })
    }, [])

    const [roomId, setRoomId] = useState<string>("");


    const onClick = (el: any) => {
        setRoomId(el.target.parent.attrs.id);
        setVisible(true);
    }

    return (
        <div className="site_content">
            <Header/>
            <main className="main">
                <div className="booking_container">
                    <h2>Забронируйте комнату прямо сейчас</h2>
                    <Stage width={600} height={600}>
                        <Layer>
                            <Text fontSize={15}/>
                            {
                                rooms?.map((el: any) => {
                                    return (
                                        <div onClick={onClick} id={el.sid}>
                                            <Rect
                                                fillPriority={"asd"}
                                                x={el.x}
                                                y={el.y}
                                                width={90}
                                                height={90}
                                                fill="#d92929"
                                                opacity={0.4}
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
                </div>
                <Dialog visible={visible} style={{width: '50vw'}} onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
                    <RoomModal id={roomId}/>
                </Dialog>
            </main>
            <footer className="footer">
                <p>Адрес: ул Красная 135</p>
                <p>Номер телефона: 89186968405</p>
            </footer>
        </div>

    )
}