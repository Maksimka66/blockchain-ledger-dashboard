<template>
    <div class="layout">
        <div class="layout-item">
            <FilterIcon />
            <h3 class="filters-title">Filters</h3>
        </div>
        <div class="fields-layout">
            <select class="filter-field select-field" v-model="status">
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Validated">Validated</option>
                <option value="Invalid">Invalid</option>
            </select>

            <input class="filter-field" type="text" placeholder="Search by Tx ID" v-model="txId" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { appStore } from '../stores/appStore';
import FilterIcon from './Icons/FilterIcon.vue';

const store = appStore();

const status = computed({
    get: () => store.txStatusFilter,
    set: (v: any) => store.setTxStatusFilter(v)
});

const txId = computed({
    get: () => store.txIdQuery,
    set: (v: string) => store.setTxIdQuery(v)
});
</script>

<style scoped>
.layout {
    padding: 12px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    row-gap: 12px;
    background-color: #f8f9fa;
    border-radius: 12px;
}

.layout-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 8px;
}

.filters-title {
    text-align: left;
    font-weight: 600;
    color: #1f2937;
}

.fields-layout {
    display: flex;
    column-gap: 12%;
    width: 100%;
    justify-content: center;
}

.filter-field {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px 12px;
    border: 2px solid #e5e7eb;
    width: 50%;
    transition: all 0.2s ease;
    font-size: 14px;
}

/* Search icon inside the input without overlapping placeholder */
input.filter-field {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-3.8-3.8"/></svg>');
    background-repeat: no-repeat;
    background-position: 12px center;
    background-size: 16px 16px;
    padding-left: 38px;
}

.filter-field:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.select-field {
    cursor: pointer;
}
</style>

