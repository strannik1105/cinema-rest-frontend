import {useEffect, useState} from "react";
import axios from "axios";


export const FoodImage = (sid: any) => {
    const [movieImage, setMovieImage] = useState<any>();

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/v1/food_images/" + sid.sid)
            .then(resp => {
                setMovieImage(resp.data)
            })

    }, [])

    let imageFile = "";

    if (movieImage !== undefined) {
        if (movieImage.length > 0)
            imageFile = movieImage[0].file
    }

    return <img src={imageFile} alt=""/>
}
