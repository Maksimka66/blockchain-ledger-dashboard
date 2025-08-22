<template>
    <nav class="navbar">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/send" class="nav-link">Send Transaction</router-link>
    </nav>
</template>

<script setup lang="ts"></script>

<style>
.navbar {
    margin: 0 auto;
    padding: 8px;
    border-radius: 12px;
    background-color: brown;
    max-width: 250px;
    display: flex;
    column-gap: 16px;
    justify-content: center;
    align-items: center;
}

.nav-link {
    color: #000000;
}
</style>
