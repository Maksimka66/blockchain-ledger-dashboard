<template>
    <header class="header-app">
        <div class="layout">
            <div class="layout header-item">
                <LogoIcon />
                <div class="layout header-app-info">
                    <h1 class="main-title">Blockchain Ledger</h1>
                    <p class="dashboard-info">Corporate dashboard</p>
                </div>
            </div>
            <div class="layout address-container">
                <div class="layout address-info-layout">
                    <p class="address-info">
                        {{ appStore().userAddress }}
                    </p>
                    <Button :width="16" :height="16" @click="copyText"
                        ><template #icon><CopyIcon /></template
                    ></Button>

                    <transition name="mini-toast-fade">
                        <div v-if="copyToast.visible" class="copy-toast">Copied</div>
                    </transition>
                </div>
                <Button :width="50" :height="16" class="disconnect" @click="openConfirmModal">
                    <template #icon><DisconnectIcon /></template>
                    Disconnect
                </Button>
            </div>
        </div>
        <Modal v-model="appStore().isWindowOpen">
            <div class="confirm-layout">
                <p class="confirm-text">Are you sure you want to disconnect from your wallet?</p>
                <div class="buttons-layout">
                    <Button class="confirm" @click="confirmDisconnect">Yes</Button>
                    <Button class="reject" @click="rejectDisconnect">No</Button>
                </div>
            </div>
        </Modal>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

import Button from '../shared/Button.vue';
import LogoIcon from './Icons/LogoIcon.vue';
import DisconnectIcon from './Icons/DisconnectIcon.vue';
import CopyIcon from './Icons/CopyIcon.vue';
import { appStore } from '../stores/appStore';
import { disconnectWalletService } from '../services/useWallet';
import Modal from '../shared/Modal.vue';

const router = useRouter();

const copyToast = reactive({
    visible: false,
    timer: 0 as unknown as number
});

const openConfirmModal = () => {
    appStore().isWindowOpen = true;
};

const confirmDisconnect = async () => {
    try {
        await disconnectWalletService();
        appStore().userAddress = '';
        router.push('/');
    } catch (e) {
        console.log(e);
    }
};

const rejectDisconnect = () => {
    appStore().isWindowOpen = false;
};

const copyText = async () => {
    try {
        await navigator.clipboard.writeText(appStore().userAddress);

        copyToast.visible = true;
        clearTimeout(copyToast.timer);

        copyToast.timer = setTimeout(() => (copyToast.visible = false), 1200);
    } catch (err) {
        console.log(err);
    }
};
</script>

<style scoped>
.header-app {
    padding: 24px 32px;
    border-top: 2px solid rgb(15, 15, 15);
    box-shadow: 0 10px 24px -12px rgba(0, 0, 0, 0.35);
}

.layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.main-title {
    font-size: 30px;
}

.dashboard-info {
    font-size: 16px;
}

.header-item {
    align-items: center;
    column-gap: 16px;
}

.header-app-info {
    flex-direction: column;
    justify-content: center;
    align-items: start;
}

.address-container {
    column-gap: 16px;
    position: relative;
}

.address-info-layout {
    column-gap: 16px;
    background-color: rgb(183, 190, 190);
    border-radius: 24px;
    padding: 4px 16px;
    position: relative;
}

.address-info-layout::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: green;
    border-radius: 50%;
}

.confirm-layout {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.confirm-text {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 24px;
    text-align: center;
}

.buttons-layout {
    display: flex;
    justify-content: space-between;
}

.address-info {
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80px;
}

.copy-toast {
    position: absolute;
    top: calc(100% + 6px);
    right: 12px;
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #065f46;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.mini-toast-fade-enter-active,
.mini-toast-fade-leave-active {
    transition: all 0.18s ease;
}
.mini-toast-fade-enter-from,
.mini-toast-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
