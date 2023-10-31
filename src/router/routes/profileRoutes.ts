import type {RouteRecordRaw} from "vue-router";

export const profileRoutes: Array<RouteRecordRaw> = [
    {
        name: 'profile.index',
        path: '/user',
        component: () => import('@/views/ProfileView.vue')
    },
    {
        name: 'profile.add',
        path: '/user/add',
        component: () => import('@/views/ProfileView.vue')
    },
    {
        name: 'profile.delete',
        path: '/user/delete',
        component: () => import('@/views/ProfileView.vue')
    },
]
