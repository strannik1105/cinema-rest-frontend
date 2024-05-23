import {Refine} from "@refinedev/core";
import {RefineKbarProvider} from "@refinedev/kbar";
import routerBindings, {NavigateToResource} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {authProvider} from "./authProvider";
import {Layout} from "./components/layout";
import {ToastContainer} from "react-toastify";
import {MoviesList} from "@/pages/movies/list";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import {PrimeReactProvider} from "primereact/api";
import "./App.css";
import {MovieDetail} from "@/pages/movies/show";
import {RoomsList} from "@/pages/rooms/list";
import {RoomCreate} from "@/pages/rooms/create";
import {RoomDetail} from "@/pages/rooms/show";
import {RoomEdit} from "@/pages/rooms/edit";
import {MovieCreate} from "@/pages/movies/create";
import {MovieEdit} from "@/pages/movies/edit";
import {FoodList} from "@/pages/food/list";
import {FoodCreate} from "@/pages/food/create";
import {BookingList} from "@/pages/booking/list";
import {MainPage} from "@/pages/main";
import {Register} from "@/pages/register";
import {FoodDetail} from "@/pages/food/show";

function App() {
    return (
        <BrowserRouter>
            <PrimeReactProvider>
                <RefineKbarProvider>
                    <Refine
                        dataProvider={dataProvider("http://localhost:8000/api/v1")}
                        routerProvider={routerBindings}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                            projectId: "SWdJyF-os7bsK-LSkUKm",
                        }}
                        resources={[
                            {
                                name: "movies",
                                list: "/movies/",
                                show: "movies/show/:id",
                                create: "/movies/create",
                                edit: "/movies/edit/:id",
                                meta: {
                                    label: "Фильмы",
                                    icon: <i className="pi pi-video"/>,
                                    canDelete: true,
                                }
                            },
                            {
                                name: "food",
                                list: "/food/",
                                show: "food/show/:id",
                                create: "/food/create",
                                edit: "/food/edit/:id",
                                meta: {
                                    label: "Еда",
                                    icon: <i className="pi pi-apple"/>,
                                    canDelete: true,
                                }
                            },
                            {
                                name: "rooms",
                                list: "/rooms/",
                                show: "rooms/show/:id",
                                create: "/rooms/create",
                                edit: "/rooms/edit/:id",
                                meta: {
                                    label: "Комнаты",
                                    icon: <i className="pi pi-map-marker"/>,
                                    canDelete: true,
                                }
                            },
                            {
                                name: "booking",
                                list: "/booking/",
                                show: "booking/show/:id",
                                meta: {
                                    label: "Бронирование",
                                    icon: <i className="pi pi-address-book"/>,
                                    canDelete: true,
                                }
                            },
                        ]}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Layout>
                                        <ToastContainer/>
                                        <Outlet/>
                                    </Layout>
                                }>
                                <Route
                                    index
                                    element={<NavigateToResource resource="page"/>}/>

                                <Route path="movies">
                                    <Route index
                                           element={<MoviesList/>}/>
                                    <Route path="show/:id"
                                           element={<MovieDetail/>}/>
                                    <Route path="create"
                                           element={<MovieCreate/>}/>
                                    <Route path="edit/:id"
                                           element={<MovieEdit/>}/>
                                </Route>

                                <Route path="food">
                                    <Route index
                                           element={<FoodList/>}/>
                                    <Route path="create"
                                           element={<FoodCreate/>}/>
                                    <Route path="show/:id"
                                           element={<FoodDetail/>}/>

                                </Route>

                                <Route path="rooms">
                                    <Route index
                                           element={<RoomsList/>}/>
                                    <Route path="create"
                                           element={<RoomCreate/>}/>
                                    <Route path="show/:id"
                                           element={<RoomDetail/>}/>
                                    <Route path="edit/:id"
                                           element={<RoomEdit/>}/>
                                </Route>

                                <Route path="booking">
                                    <Route index
                                           element={<BookingList/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </Refine>
                </RefineKbarProvider>
            </PrimeReactProvider>
            <Routes>
                <Route path="index">
                    <Route index
                           element={<MainPage/>}/>
                </Route>
                 <Route path="register">
                    <Route index
                           element={<Register/>}/>
                </Route>
                <Route path="login">
                    <Route index
                           element={<Register/>}/>
                </Route>
            </Routes>

        </BrowserRouter>
    );
}

export default App;