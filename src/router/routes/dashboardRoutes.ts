import type {RouteRecordRaw} from "vue-router";

export const dashboardRoutes: Array<RouteRecordRaw> = [
    {
        name: 'dashboard.index',
        path: '/dashboard',
        alias: '/',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            title: 'dashboard',
            icon: 'dashboard'
        }
    },
]
