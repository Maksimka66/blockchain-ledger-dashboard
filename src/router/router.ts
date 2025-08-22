import { createRouter, createWebHistory } from 'vue-router';
import ConnectWallet from '../pages/ConnectWallet.vue';
import MainPage from '../pages/MainPage.vue';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/dashboard',
        component: ConnectWallet
    },
    {
        path: '/send',
        component: ConnectWallet
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
