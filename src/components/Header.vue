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
                </div>
                <Button :width="50" :height="16" class="disconnect">
                    <template #icon><DisconnectIcon /></template>
                    Disconnect
                </Button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Button from '../shared/Button.vue';
import LogoIcon from './Icons/LogoIcon.vue';
import DisconnectIcon from './Icons/DisconnectIcon.vue';
import CopyIcon from './Icons/CopyIcon.vue';
import { appStore } from '../stores/appStore';

const copyText = async (e: Event) => {
    try {
        const target = e.target as HTMLElement;
        const copiedAddress = target.previousElementSibling?.textContent;

        if (copiedAddress) {
            await navigator.clipboard.writeText(copiedAddress);
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped>
.header-app {
    margin-bottom: 48px;
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
}

.address-info-layout {
    column-gap: 16px;
    background-color: rgb(183, 190, 190);
    border-radius: 24px;
    padding: 4px 16px;
}

.address-info-layout::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: green;
    border-radius: 50%;
}

.address-info {
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80px;
}
</style>
