<template>
    <nav class="navbar">
        <router-link to="/dashboard" :class="['nav-link', { active: isActive('/dashboard') }]"
            >Dashboard</router-link
        >
        <router-link to="/send" :class="['nav-link', { active: isActive('/send') }]"
            >Send Transaction</router-link
        >
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<style>
.navbar {
    margin: 0 auto;
    margin-bottom: 48px;
    padding: 4px 12px;
    border-radius: 24px;
    border: 1px solid black;
    background-color: #ffffff;
    max-width: 290px;
    display: flex;
    column-gap: 16px;
    justify-content: center;
    align-items: center;
}

.nav-link {
    color: #374151;
    border-radius: 24px;
    padding: 0 8px;
    transition:
        background-color 0.3s ease,
        color 0.3s ease,
        transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        border 0.3s ease;
}

.nav-link:hover {
    color: #007bff;
}

.active {
    background-color: #007bff;
    color: #ffffff;
    font-weight: bold;
}
.active:hover {
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
}

.nav-link:active {
    border: 1px solid red;
}
</style>
