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
interface categoryDetails {
    id: number;
    name: string;
}

interface ExpenseBody { 
id?: number,
  amount?: string,
  description?: string,
  date?: string,
  category?: {
    id?: number,
    name?: string
  },
  category_name?: string

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
        }),
        getCategory: builder.query<categoryDetails, void>({
            query: () => ({
                url: 'categories/',
                method: 'GET',
            })
        }),
        createExpense: builder.mutation<ExpenseBody, ExpenseBody>({
            query: (body) => ({
                url: 'expenses/create/',
                method: 'POST',
                body
            })
        }),
        getExpenses: builder.query<ExpenseBody[], void>({
            query: () => ({
                url: 'expenses/',
                method: 'GET',  
            })
        }),
    })
});

export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation,
    useGetUserDetailsQuery, useGetCategoryQuery, useCreateExpenseMutation, useGetExpensesQuery
} = AuthApi