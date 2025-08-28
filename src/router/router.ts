import { createRouter, createWebHistory } from 'vue-router';
import ConnectWallet from '../pages/ConnectWallet.vue';
import SendTransactionPage from '../pages/SendTransactionPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const routes = [
    {
        path: '/',
        component: ConnectWallet
    },
    {
        path: '/dashboard',
        component: DashboardPage
    },
    {
        path: '/send',
        component: SendTransactionPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
