import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../base-query-setup";

interface CreateUserBody {
    username?: string;
    email?: string;
    password?: string;

}
interface responseDetails {
    username: string;
    access?: string;
    refresh?: string;
    message?: string;
    email?: string;
    
}

export const AuthApi = createApi({
    reducerPath: "AuthApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ['AuthApi'],
    endpoints: (builder) => ({
        createUser: builder.mutation<responseDetails, CreateUserBody>({
            query: (body) => ({
                url: 'sign-up/',
                method: 'POST',
                body
            })
        }),
        loginUser: builder.mutation<responseDetails, CreateUserBody>({
            query: (body) => ({
                url: 'login/',
                method: 'POST',
                body
            })
        }),
        logoutUser: builder.mutation<responseDetails, void>({
            query: () => ({
                url: 'logout/',
                method: 'POST',
                body: {}
            })
        })
    })
});

export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation } = AuthApi