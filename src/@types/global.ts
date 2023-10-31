export type SidebarItem = {
    name: string,
    route: string,
    icon: string
    isAuth: boolean,
    hasChild: boolean,
    children?: Array<ChildrenSidebarItem>
}

export type ChildrenSidebarItem = {
    name: string,
    route: string,
    isAuth: boolean,
}

export type Paginate = {
    currentPage: number,
    limit: number,
    total: null | number,
    sort?: 'ASC' | 'DESC'
}

// import
