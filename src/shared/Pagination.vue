<template>
    <div class="layout">
        <p>
            Showing {{ start + 1 }} to {{ Math.min(start + pageSize, total) }} of
            {{ total }} transactions
        </p>
        <div class="layout pagination-buttons">
            <Button class="pagination-button" @click="prev" :disabled="page === 1">Previous</Button>
            <Button class="pagination-button" @click="next" :disabled="end >= total">Next</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { computed } from 'vue';
import { appStore } from '../stores/appStore';

const store = appStore();

const page = computed(() => store.txPage);
const pageSize = computed(() => store.txPageSize);
const total = computed(() => store.totalFilteredCount);
const start = computed(() => (page.value - 1) * pageSize.value);
const end = computed(() => start.value + pageSize.value);

const prev = () => store.prevTxPage();
const next = () => store.nextTxPage();
</script>

<style scoped>
.layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pagination-buttons {
    column-gap: 12px;
}
</style>
