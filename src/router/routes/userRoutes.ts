import type {RouteRecordRaw} from "vue-router";

export const userRoutes: Array<RouteRecordRaw> = [
    {
        name: 'user.index',
        path: '/user',
        component: () => import('@/views/UserView.vue'),
    },
    {
        name: 'user.add',
        path: '/user/add',
        component: () => import('@/views/UserView.vue')
    },
    {
        name: 'user.delete',
        path: '/user/delete',
        component: () => import('@/views/UserView.vue')
    },
]
