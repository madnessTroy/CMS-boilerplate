import {createRouter, createWebHistory} from 'vue-router'
import {dashboardRoutes} from "@/router/routes/dashboardRoutes";
import {userRoutes} from "@/router/routes/userRoutes";
import {profileRoutes} from "@/router/routes/profileRoutes";

const routes = [
    ...dashboardRoutes,

    ...userRoutes,

    ...profileRoutes,

    {
        name: '404',
        path: '/:catchAll(.*)*',
        component: () => import('@/views/404.vue'),
        meta: {
            title: 'Not Found'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export {router, routes}

