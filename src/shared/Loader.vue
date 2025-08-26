<template>
    <div v-if="appStore().isLoading" class="loader-container">
        <div class="loader" />
    </div>
    <slot v-else></slot>
</template>

<script setup lang="ts">
import { appStore } from '../stores/appStore';
</script>

<style>
.loader-container {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.loader {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 16px solid #ff6b08;
    border-top-color: #18b432;
    animation: test 0.8s linear infinite;
}

@keyframes test {
    100% {
        transform: rotate(360deg);
    }
}
</style>
