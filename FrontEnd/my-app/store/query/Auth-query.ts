import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../base-query-setup";
import { JSX } from "react/jsx-runtime";
import { get } from "http";

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
  map(
    arg0: (category: {
      id: string;
      name: string;
      limit: string;
      color: string;
    }) => JSX.Element
  ): import("react").ReactNode;
  id: number;
  name: string;
}

interface ExpenseBody {
  id?: number;
  amount?: string;
  description?: string;
  date?: string;
  category?: {
    id?: number;
    name?: string;
  };
  category_name?: string;
 
}

interface CategoryBody {
  name?: string;
  color?: string;
  limit?: string;
}
interface IncomeBody {
  id?: number;
  amount: string;
  source: string;
  date: string;
   remaining_balance?: string;
}
export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["AuthApi"],
  endpoints: (builder) => ({
    createUser: builder.mutation<responseDetails, CreateUserBody>({
      query: (body) => ({
        url: "sign-up/",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<responseDetails, CreateUserBody>({
      query: (body) => ({
        url: "login/",
        method: "POST",
        body,
      }),
    }),
    logoutUser: builder.mutation<responseDetails, CreateUserBody>({
      query: (body) => ({
        url: "logout/",
        method: "POST",
        body,
      }),
    }),
    getUserDetails: builder.query<responseDetails, void>({
      query: () => ({
        url: "me/",
        method: "GET",
      }),
    }),
    getCategory: builder.query<categoryDetails, void>({
      query: () => ({
        url: "categories/",
        method: "GET",
      }),
    }),
    createExpense: builder.mutation<ExpenseBody, ExpenseBody>({
      query: (body) => ({
        url: "expenses/create/",
        method: "POST",
        body,
      }),
    }),
    getExpenses: builder.query<ExpenseBody[], void>({
      query: () => ({
        url: "expenses/",
        method: "GET",
      }),
    }),
    createCategory: builder.mutation<CategoryBody, CategoryBody>({
      query: (body) => ({
        url: "categories/create/",
        method: "POST",
        body,
      }),
    }),
    createIncome: builder.mutation<IncomeBody, IncomeBody>({
      query: (body) => ({
        url: "incomes/create/",
        method: "POST",
        body,
      }),
    }),
    getIncomes: builder.query<IncomeBody[], void>({
      query: () => ({
        url: "incomes/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserDetailsQuery,
  useGetCategoryQuery,
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useCreateCategoryMutation,
  useCreateIncomeMutation,
  useGetIncomesQuery
} = AuthApi;
