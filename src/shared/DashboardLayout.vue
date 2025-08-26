<template>
    <div class="dashboard-layout">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.dashboard-layout {
    padding: 20px 16px;
    border: 1px solid black;
    border-radius: 12px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
</style>
