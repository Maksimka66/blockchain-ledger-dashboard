import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';

import App from './App.vue';
import router from './router/router';
import { restoreWalletState } from './services/useWallet';
import './style.css';

const toastStyles = {
    position: 'bottom-center',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
};

createApp(App).use(createPinia()).use(Toast, toastStyles).use(router).mount('#app');

restoreWalletState();
