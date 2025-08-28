<template>
    <div class="layout">
        <div class="layout-item">
            <FilterIcon />
            <h3 class="filters-title">Filters</h3>
        </div>
        <div class="fields-layout">
            <select class="filter-field" v-model="status">
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
import { computed, ref, watch } from 'vue';
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

// Локальная логика фильтрации
const searchHash = ref('');
const allTransactions = ref<any[]>([]);
const filteredTransactions = ref<any[]>([]);

// Слушаем изменения в txId и применяем фильтрацию
watch(txId, (newValue) => {
    searchHash.value = newValue;
    handleSearch();
});

const handleSearch = () => {
    if (searchHash.value.trim()) {
        filteredTransactions.value = allTransactions.value.filter((tx) =>
            tx.hash.toLowerCase().includes(searchHash.value.toLowerCase())
        );
    } else {
        filteredTransactions.value = [];
    }
};

// Экспортируем функции для использования в ResentTransactions
defineExpose({
    setAllTransactions: (transactions: any[]) => {
        allTransactions.value = transactions;
        handleSearch();
    },
    getFilteredTransactions: () => filteredTransactions.value,
    getSearchHash: () => searchHash.value
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
}

.filters-title {
    text-align: left;
}

.fields-layout {
    display: flex;
    column-gap: 12%;
    width: 100%;
    justify-content: center;
}

.filter-field {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 4px 8px;
    border: 1px solid gray;
    width: 50%;
}
</style>
