<template>
    <Loader>
        <div v-if="appStore().userAddress">
            <Header />
            <main>
                <NavBar />
                <div v-if="!appStore().totalValue" class="layout">
                    <DashboardLayout>
                        <h3 class="transactions-title">Resent Transactions</h3>
                        <TransactionFilters />
                        <ResentTransactions />
                        <Pagination />
                    </DashboardLayout>
                    <div class="">
                        <DashboardLayout>
                            <div class="layout title-layout">
                                <DollarIcon />
                                <h3 class="transactions-title">Wallet Balance</h3>
                            </div>
                            <p class="amount-description">Total Portfolio Value</p>
                            <p class="amount-value">$ {{ appStore().totalValue }}</p>
                        </DashboardLayout>
                        <DashboardLayout>
                            <h3 class="transactions-title">Assets</h3>
                        </DashboardLayout>
                    </div>
                </div>
                <div v-else>
                    <h2>No transactions found</h2>
                </div>
            </main>
        </div>
    </Loader>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
import NavBar from '../components/NavBar.vue';
import TransactionFilters from '../components/TransactionFilters.vue';
import ResentTransactions from '../components/ResentTransactions.vue';
import DashboardLayout from '../shared/DashboardLayout.vue';
import Loader from '../shared/Loader.vue';
import { appStore } from '../stores/appStore';
import Pagination from '../shared/Pagination.vue';
import DollarIcon from '../components/Icons/DollarIcon.vue';
</script>

<style scoped>
.layout {
    display: flex;
    justify-content: space-between;
}

.title-layout {
    align-items: center;
}

.title-layout .transactions-title {
    margin-bottom: 0;
}

.transactions-title {
    text-align: left;
    margin-bottom: 24px;
}

.amount-description {
    text-align: left;
}

.amount-value {
    text-align: left;
    width: 100%;
}
</style>
