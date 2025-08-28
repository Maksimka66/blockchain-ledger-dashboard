<template>
    <Modal v-model="appStore().isWindowOpen">
        <Loader>
            <div class="layout">
                <div class="icon-layout">
                    <WalletIcon size="64" stroke-color="#0000FF" />
                </div>
                <div class="text-layout">
                    <h2 class="text-content title">Connect Wallet</h2>
                    <p class="text-content">
                        Connect your MetaMask wallet to access the Blockchain Ledger Dashboard
                    </p>
                </div>
                <div class="connection-layout">
                    <Button
                        :width="16"
                        :height="4"
                        @click="connectWallet"
                        class="blue-background-btn"
                    >
                        <template #icon><WalletIcon stroke-color="#FFFFFF" size="48" /></template>
                        Connect MetaMask
                    </Button>
                    <p class="secure-info"><ShieldIcon />Your connection is secure and encrypted</p>
                </div>
            </div>
        </Loader>
    </Modal>
</template>

<script setup lang="ts">
import ShieldIcon from '../components/Icons/ShieldIcon.vue';
import WalletIcon from '../components/Icons/WalletIcon.vue';
import Button from '../shared/Button.vue';
import Modal from '../shared/Modal.vue';
import Loader from '../shared/Loader.vue';
import { connectWalletService, getAllTransactionsService } from '../services/useWallet';
import { appStore } from '../stores/appStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const connectWallet = async () => {
    const res = await connectWalletService();

    // const trans = await getAllTransactionsService();

    // console.log(trans);

    if (res) {
        router.push('/dashboard');
    }
};
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 36px;
}

.icon-layout {
    margin: 0 auto;
    border-radius: 10px;
    background-color: rgb(231, 235, 238);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-layout {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
}

.text-content {
    font-weight: 400;
    font-size: 18px;
    text-align: left;
    width: 100%;
    font-family: 'Sora';
}

.title {
    font-weight: 500;
    font-size: 36px;
}

.connection-layout {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
}

.secure-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #e4e1e14d;
    border-radius: 24px;
    padding: 8px;
    gap: 16px;
}
</style>
