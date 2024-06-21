import React, {useEffect, useState} from "react";
import axios from "axios";
import {MovieImage} from "@/pages/main/components/movie_image";
import {Link} from "react-router-dom";
import {FoodImage} from "@/pages/main/components/food_image";
import {Carousel} from "primereact/carousel";

export const Main = () => {

    const ProductService = {
        getProductsData() {
            return [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'public/1%20(1).jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1010',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'public/2%20(1).jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
                {
                    id: '1020',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'public/3%20(1).jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
            ]
        },
        getProductsMini() {
            return Promise.resolve(this.getProductsData().slice(0, 3));
        },
    }

    const [films, setFilms] = useState<any>();
    const [foods, setFoods] = useState<any>();

    const productTemplate = (product: any) => {
        return (
            <div>
                <img src={product.image} alt={product.name} className="h-screen"/>
            </div>
        );
    };


    const [products, setProducts] = useState<any>([]);
    useEffect(() => {
        ProductService.getProductsMini().then((data) => setProducts(data.slice(0, 3)));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/movies/")
            .then(data => setFilms(data.data.slice(0, 3)))
        axios.get("http://localhost:8001/api/v1/food/")
            .then(data => setFoods(data.data.slice(0, 3)))
    }, []);

    const a = localStorage.getItem("user")

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    return (
        <div className="main__container">
            <div className="sksk">
                <Carousel value={products} numScroll={1} numVisible={1} className="h-2rem"
                      responsiveOptions={responsiveOptions} itemTemplate={productTemplate}/>
            </div>


            <h1 id="movie">Список фильмов</h1>
            <div className="films">
                {films ? films.map((el: any) => {
                    return (
                        <div className="film animate__bounce animate__delay-2s">
                            <MovieImage sid={el.sid}/>
                            <div>
                                <h2>{el.name}</h2>
                                <p>{el.description}</p>
                                <p>Жанр: {el.genre}</p>
                                <p>Год: {el.year}</p>
                                <p>Длительность: {el.duration} минут</p>
                                <Link to={a ? "/booking_rooms" : "/main_login"}>Бронировать</Link>
                            </div>
                        </div>
                    )
                }) : <></>}

                <div className="more_films">
                    <Link to="/all_movies">Все фильмы</Link>
                </div>
            </div>

            <h1 id="food">Список блюд</h1>
            <div className="films">
                <div className="films__container">
                    {foods ? foods.map((el: any) => {
                        return (
                            <div className="food">
                                <FoodImage sid={el.sid}/>
                                <div>
                                    <h2>{el.name}</h2>
                                    <p>{el.description}</p>
                                    <p className="price">{el.price}</p>
                                </div>
                            </div>
                        )
                    }) : <></>}
                </div>

                <div className="more_films">
                    <Link to="/all_foods">Все блюда</Link>
                </div>
            </div>


            <h1 id="about">О нас</h1>
            <p>
                Добро пожаловать в уникальный мир кино-ресторана, где каждый визит превращается в захватывающее
                кинематографическое приключение! У нас вы сможете не только насладиться изысканной кухней и
                изысканными напитками, но и окунуться в атмосферу настоящего кино, где каждый уголок заведения
                пронизан волшебством большого экрана. Наша команда готова угодить самым взыскательным гурманам и
                киноманам, создавая неповторимые впечатления и запоминающиеся моменты. Приходите к нам, чтобы
                прочувствовать весь магический мир кино в каждом бите и вкусе!
            </p>
        </div>
    )

}