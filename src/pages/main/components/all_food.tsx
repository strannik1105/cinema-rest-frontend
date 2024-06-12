import React, {useEffect, useState} from "react";
import axios from "axios";
import {Header} from "@/pages/main/components/header";
import {FoodImage} from "@/pages/main/components/food_image";


export const AllFoods = () => {
    const [foods, setFoods] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/food/")
            .then(data => setFoods(data.data))
    }, []);

    if (foods) {
        return (
            <div className="site_content">
                <Header/>
                <h1>Все блюда</h1>
                <div className="films">
                    {foods.map((el: any) => {
                        return (
                            <div className="film animate__bounce animate__delay-2s">
                                <FoodImage sid={el.sid}/>
                                <div>
                                    <h2>{el.name}</h2>
                                    <p>{el.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    return <> <Header/></>
}