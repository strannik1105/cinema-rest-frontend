import {FoodImage} from "@/pages/main/components/food_image";
import React from "react";


export const FoodList = (data: any) => {
    console.log(data)
    return (
        <>
            {data.data.map((el: any) => {
                return (
                    <div className="film animate__bounce animate__delay-2s">
                        <FoodImage sid={el.sid}/>
                        <div>
                            <h2>{el.name}</h2>
                            <p>{el.description}</p>
                            <p>{el.price}</p>
                            <p>{el.type_}</p>
                        </div>
                    </div>
                )
            })}

        </>


    )

}