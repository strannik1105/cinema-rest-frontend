import {useEffect, useState} from "react";
import axios from "axios";


export const MovieImage = (sid: any) => {
    const [movieImage, setMovieImage] = useState<any>();

    useEffect(() => {
        axios.get("http://127.0.0.1:8001/api/v1/movies_images/" + sid.sid)
            .then(resp => setMovieImage(resp.data))
    }, [])

    if (movieImage)
        return <img src={movieImage[0].file} alt={movieImage.name}/>
    return <img src="" alt=""/>
}
