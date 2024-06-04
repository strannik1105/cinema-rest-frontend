import React from "react";
import {useLogin} from "@refinedev/core";

export const Login = () => {
    const {mutate, isLoading} = useLogin();

    const onSubmit = (event: any) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target).entries());
        mutate(data);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                />

                {isLoading && <span>loading...</span>}
                <button
                    type="submit"
                    disabled={isLoading}
                >Submit
                </button>
            </form>
        </div>
    );
};
