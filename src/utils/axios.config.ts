import axios, { AxiosInstance } from 'axios';
import { logout } from '@/store/slices/authSlice';
import { store } from '@//store';

const createUserApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_USER_API,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.warn("⚠ Token hết hạn! Tự động logout...");

                document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                store.dispatch(logout());
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

const createMovieApiInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_MOVIE_API,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '15000', 10),
    });
};

export const userApiInstance = createUserApiInstance();
export const movieApiInstance = createMovieApiInstance();

movieApiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

movieApiInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);