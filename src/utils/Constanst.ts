import type {Paginate} from "@/@types/global";

/*
* API
* */
export const API_URL: string = import.meta.env.VITE_MY_VAR || '';
export const API_PORT: string = import.meta.env.VITE_MY_VAR;

/*
* App
* */
export const APP_NAME: string = 'boilerplate'

export const APP_PAGINATE: Paginate = {
    currentPage: 1,
    limit: 10,
    total: null,
    sort: 'DESC'
}
