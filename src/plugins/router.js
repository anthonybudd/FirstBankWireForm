import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/default/Default.vue'),
            children: [
                {
                    path: '',
                    name: 'Wire',
                    component: () => import('@/views/Wire.vue'),
                },
            ],
        },
    ]
});
