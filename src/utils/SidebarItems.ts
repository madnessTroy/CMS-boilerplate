import type {SidebarItem} from "@/@types/global";

export const SidebarItems: Array<SidebarItem> = [
    {
        name: 'Dashboard',
        route: 'dashboard.index',
        icon: 'dashboard',
        isAuth: true,
        hasChild: false
    },
    {
        name: 'User',
        route: 'user.index',
        icon: 'groups',
        isAuth: true,
        hasChild: true,
        children: [
            {
                name: 'Add',
                route: 'user.add',
                isAuth: true,
            },
            {
                name: 'Delete',
                route: 'user.delete',
                isAuth: true,
            }
        ]
    },
]
