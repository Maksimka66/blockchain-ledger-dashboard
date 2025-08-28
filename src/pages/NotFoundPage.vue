<template>
    <div class="not-found">
        <h2>404 — Страница не найдена</h2>
        <p>Кажется, ты заблудился. Вернуться <router-link to="/">домой</router-link>?</p>
    </div>
</template>

<script setup></script>

<style scoped>
.not-found {
    text-align: center;
    padding: 60px;
    color: #2c3e50;
}
</style>
