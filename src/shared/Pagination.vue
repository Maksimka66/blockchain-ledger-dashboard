<template>
    <div class="pagination-container">
        <Button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">
            Previous
        </Button>
        <span class="pagination-info">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} items
        </span>
        <Button @click="nextPage" :disabled="currentPage >= totalPages" class="pagination-button">
            Next
        </Button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from './Button.vue';

import type { PaginationProps, PaginationEmits } from '../types';

const props = withDefaults(defineProps<PaginationProps>(), {
    pageSize: 5,
    initialPage: 1
});

const emit = defineEmits<PaginationEmits>();

const currentPage = ref(props.initialPage);
const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));

const startIndex = computed(() => (currentPage.value - 1) * props.pageSize);
const endIndex = computed(() => Math.min(startIndex.value + props.pageSize, props.totalItems));

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        emit('page-change', currentPage.value);
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        emit('page-change', currentPage.value);
    }
};

watch(
    () => props.initialPage,
    (newPage) => {
        currentPage.value = newPage;
    }
);

defineExpose({
    goToPage: (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
            emit('page-change', currentPage.value);
        }
    },
    reset: () => {
        currentPage.value = 1;
        emit('page-change', currentPage.value);
    }
});
</script>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.pagination-button {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-info {
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    min-width: 150px;
    text-align: center;
}
</style>
