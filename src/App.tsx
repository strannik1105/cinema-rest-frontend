import {Refine} from "@refinedev/core";
import {RefineKbarProvider} from "@refinedev/kbar";
import routerBindings, {NavigateToResource} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
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
import {FoodDetail} from "@/pages/food/show";
import {WaitersList} from "@/pages/waiters/list";
import {WaiterCreate} from "@/pages/waiters/create";
import {WaiterDetail} from "@/pages/waiters/show";
import {WaiterEdit} from "@/pages/waiters/edit";
import {CookList} from "@/pages/cook/list";
import {CookEdit} from "@/pages/cook/edit";
import {CookCreate} from "@/pages/cook/create";
import {CookDetail} from "@/pages/cook/show";
import {Register} from "@/pages/main/components/register";
import {Booking} from "@/pages/main/components/booking";
import {FoodEdit} from "@/pages/food/edit";
import {BookingDetail} from "@/pages/booking/show";
import {BookingEdit} from "@/pages/booking/edit";
import { Check } from "./pages/main/components/check";
import {BList} from "@/pages/main/components/list_booking";

function App() {
    return (
        <BrowserRouter>
            <PrimeReactProvider>
                <RefineKbarProvider>
                    <Refine
                        dataProvider={dataProvider("http://localhost:8001/api/v1")}
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
                                name: "food_images",
                                show: "/food_images/:id",
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
                                edit: "booking/edit/:id",
                                meta: {
                                    label: "Бронирование",
                                    icon: <i className="pi pi-address-book"/>,
                                    canDelete: true,
                                }
                            },
                            {
                                name: "waiter",
                                list: "/waiter/",
                                show: "waiter/show/:id",
                                create: "waiter/create",
                                edit: "waiter/edit/:id",
                                meta: {
                                    label: "Официанты",
                                    icon: <i className="pi pi-hourglass"/>,
                                    canDelete: true,
                                }
                            },
                            {
                                name: "cook",
                                list: "/cook/",
                                show: "cook/show/:id",
                                create: "cook/create",
                                edit: "cook/edit/:id",
                                meta: {
                                    label: "Повара",
                                    icon: <i className="pi pi-star"/>,
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

                                <Route path="waiter">
                                    <Route index
                                           element={<WaitersList/>}/>
                                    <Route path="create"
                                           element={<WaiterCreate/>}/>
                                    <Route path="show/:id"
                                           element={<WaiterDetail/>}/>
                                    <Route path="edit/:id"
                                           element={<WaiterEdit/>}/>
                                </Route>

                                <Route path="cook">
                                    <Route index
                                           element={<CookList/>}/>
                                    <Route path="create"
                                           element={<CookCreate/>}/>
                                    <Route path="show/:id"
                                           element={<CookDetail/>}/>
                                    <Route path="edit/:id"
                                           element={<CookEdit/>}/>
                                </Route>

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
                                    <Route path="edit/:id"
                                           element={<FoodEdit/>}/>
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
                                    <Route path="show/:id"
                                           element={<BookingDetail/>}/>
                                    <Route path="edit/:id"
                                           element={<BookingEdit/>}/>
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
                <Route path="/register">
                    <Route index
                           element={<Register/>}/>
                </Route>
                 <Route path="/booking_rooms">
                    <Route index
                           element={<Booking/>}/>
                </Route>
                <Route path="/check">
                    <Route index
                           element={<Check/>}/>

                </Route>

                <Route path="/blist">
                    <Route index
                           element={<BList/>}/>

                </Route>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
