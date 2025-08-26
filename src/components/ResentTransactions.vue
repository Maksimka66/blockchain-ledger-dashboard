<template>
    <ul class="transactions-list">
        <!-- Header -->
        <li class="transactions-header">
            <p class="transactions-cell">Transaction ID</p>
            <p class="transactions-cell">Type</p>
            <p class="transactions-cell">Timestamp</p>
            <p class="transactions-cell">Status</p>
            <p class="transactions-cell">Block</p>
        </li>

        <!-- Rows -->
        <li class="transactions-row" v-for="value in paged" :key="value.id">
            <p class="transactions-cell transaction-id">{{ value.id }}</p>
            <p class="transactions-cell">
                <span class="type-badge">{{ value.type }}</span>
            </p>
            <p class="transactions-cell">{{ value.timestamp }}</p>
            <p class="transactions-cell">
                <span :class="getStatusClass(value.status)">{{ value.status }}</span>
            </p>
            <p class="transactions-cell">{{ value.block }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { appStore } from '../stores/appStore';

const store = appStore();
const paged = computed(() => store.pagedResentTransactions);

const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case 'validated':
        case 'valid':
            return 'status-badge status-valid';
        case 'success':
            return 'status-badge status-success';
        case 'pending':
        case 'in progress':
            return 'status-badge status-pending';
        case 'invalid':
        case 'failed':
            return 'status-badge status-invalid';
        default:
            return 'status-badge status-default';
    }
};
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
    grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
    gap: 16px;
    background: #f9fafb;
    padding: 12px 16px;
    font-weight: 500;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
}

.transactions-row {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
    gap: 16px;
    padding: 12px 16px;
    border-bottom: 1px solid #f3f4f6;
}

.transactions-row:last-child {
    border-bottom: none;
}

.transactions-row:hover {
    background: #f9fafb;
}

.transactions-cell {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.transaction-id {
    color: #2563eb;
    font-weight: 500;
}

.status-badge {
    display: inline-block;
    padding: 2px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid;
}

.status-valid {
    background-color: #ecfdf5;
    color: #047857;
    border-color: #a7f3d0;
}

.status-pending {
    background-color: #fffbeb;
    color: #b45309;
    border-color: #fde68a;
}

.status-invalid {
    background-color: #fef2f2;
    color: #b91c1c;
    border-color: #fca5a5;
}

.status-success {
    background-color: #eefdf3;
    color: #047857;
    border-color: #a7f3d0;
}

.status-default {
    background-color: #f3f4f6;
    color: #6b7280;
    border-color: #d1d5db;
}

/* Type badge (gray) */
.type-badge {
    display: inline-block;
    padding: 2px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #d1d5db;
    background-color: #f3f4f6;
    color: #4b5563;
}
</style>
