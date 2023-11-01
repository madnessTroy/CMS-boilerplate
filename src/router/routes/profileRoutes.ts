import type {RouteRecordRaw} from "vue-router";

export const profileRoutes: Array<RouteRecordRaw> = [
    {
        name: 'profile.index',
        path: '/user',
        component: () => import('@/views/ProfileView.vue'),
        meta: {
            icon: 'badge',
            title: 'profile'
        },
        children: [
            {
                name: 'profile.add',
                path: '/user/add',
                component: () => import('@/views/ProfileView.vue'),
                meta: {
                    title: 'add'
                }
            },
            {
                name: 'profile.delete',
                path: '/user/delete',
                component: () => import('@/views/ProfileView.vue'),
                meta: {
                    title: 'delete'
                }
            },
        ]
    },
]
