import type {RouteRecordRaw} from "vue-router";

export const dashboardRoutes: Array<RouteRecordRaw> = [
    {
        name: 'dashboard.index',
        path: '/',
        alias: '/dashboard',
        component: () => import('@/views/Dashboard.vue')
    },
]
