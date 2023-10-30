export type Route = {
    name: string,
    path: string,
    alias: string,
    component: function
}

export type Paginate = {
    currentPage: number,
    limit: number,
    total: null | number,
    sort?: 'ASC' | 'DESC'
}
