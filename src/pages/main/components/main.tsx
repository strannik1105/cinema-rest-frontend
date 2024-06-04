import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import {foods, movies} from "@/pages/main/movies";

export const Main = () => {


    return (
        <div className="main__container">

            <Carousel>
                <Carousel.Item>
                    <img
                        src="https://cinema.moscow/system/uploads/slide/image/10686/slide_slide_%D0%94%D0%B2%D0%B0_%D1%82%D0%B0%D1%80%D1%82%D0%B0%D1%80%D0%B0_4.jpg"
                        alt=""/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="https://cinema.moscow/system/uploads/slide/image/10685/slide_slide_%D0%90%D1%81%D1%81%D0%BE%D1%80%D1%82%D0%B8_%D1%81%D1%8B%D1%80%D0%BE%D0%B2_2.jpg"
                        alt=""/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="https://cinema.moscow/system/uploads/slide/image/10690/slide_slide_DSC_1848.jpg"
                        alt=""/>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h1 id="movie">Список фильмов</h1>
            <div className="films">
                {movies.map(el => {
                    return (
                        <div className="film animate__bounce animate__delay-2s">
                            <img src={el.img} alt=""/>
                            <div>
                                <h2>{el.name}</h2>
                                <p>{el.description}</p>
                            </div>
                        </div>
                    )
                })}

                <div className="more_films">
                    Все фильмы
                </div>
            </div>

            <h1 id="food">Список блюд</h1>
            <div className="films">
                <div className="films__container">
                    {foods.map(el => {
                    return (
                        <div className="food">
                            <img src={el.img} alt=""/>
                            <div>
                                <h2>{el.name}</h2>
                                <p>{el.description}</p>
                                <p className="price">{el.price}</p>
                            </div>
                        </div>
                    )
                })}
                </div>

                <div className="more_films">
                    Все блюда
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