<template>
    <ul class="transactions-list">
        <li class="transactions-header">
            <p class="transactions-cell">Token</p>
            <p class="transactions-cell">Amount</p>
        </li>

        <li class="transactions-row" v-for="value in paged" :key="value.id">
            <div class="assets-layout">
                <p class="ETH">ETH</p>
                <p class="amount">Ethereum</p>
            </div>
            <p class="amount">{{ value.amount }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { appStore } from '../stores/appStore';

const paged = computed(() => appStore().pagedResentTransactions);
</script>

<style scoped>
.transactions-list {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    list-style: none;
    padding: 0;
    margin: 0;
}

.transactions-header {
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 16px;
    background: #f9fafb;
    padding: 12px 16px;
    font-weight: 500;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
}

.transactions-row {
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 16px;
    padding: 12px 16px;
    border-bottom: 1px solid #f3f4f6;
}

.ETH {
    font-size: 32px;
    font-weight: 500;
}

.amount {
    font-size: 16px;
    font-weight: 500;
}

.transactions-row:last-child {
    border-bottom: none;
}

.transactions-row:hover {
    background: #f9fafb;
}

.assets-layout {
}

.transactions-cell {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
