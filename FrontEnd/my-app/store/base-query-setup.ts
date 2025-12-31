import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "./store";

interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string
}

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await rawBaseQuery('/refresh', api, extraOptions);
        if (refreshResult.data) {
            const { accessToken, refreshToken } = refreshResult.data as RefreshTokenResponse;
            api.dispatch({ type: 'user/setAccessToken', payload: accessToken });
            api.dispatch({ type: 'user/setRefreshToken', payload: refreshToken });
            result = await rawBaseQuery(args, api, extraOptions);
        }
    }
    return result;
};

