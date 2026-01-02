import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../base-query-setup";

interface CreateUserBody {
    username?: string;
    email?: string;
    password?: string;
    refresh?: string;

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
        logoutUser: builder.mutation<responseDetails, CreateUserBody>({
            query: (body) => ({
                url: 'logout/',
                method: 'POST',
                body
            })
        }),
        getUserDetails: builder.query<responseDetails, void>({
            query: () => ({
                url: 'me/',
                method: 'GET',
            })
        })
    })
});

export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation,
    useGetUserDetailsQuery
} = AuthApi