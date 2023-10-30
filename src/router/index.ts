import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'dashboard.index',
            path: '/',
            alias: '/dashboard',
            component: () => import('@/views/Dashboard.vue')
        },

        // 404 page
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            // component: NotFound,
        }
    ]
})

export default router
