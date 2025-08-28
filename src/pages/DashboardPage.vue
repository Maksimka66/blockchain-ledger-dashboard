<template>
    <Loader>
        <div>
            <Header />
            <main>
                <NavBar />
                <div class="layout">
                    <DashboardLayout class="resent-transactions-layout">
                        <h3 class="transactions-title">Resent Transactions</h3>
                        <TransactionFilters />
                        <ResentTransactions />
                    </DashboardLayout>
                    <div class="balance-assets-layout">
                        <DashboardLayout>
                            <div class="layout title-layout">
                                <h3 class="transactions-title wallet-title">Wallet Balance</h3>
                            </div>
                            <p class="amount-description">Total Portfolio Value</p>
                            <p class="amount-value">
                                ${{
                                    totalValue.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })
                                }}
                            </p>
                        </DashboardLayout>
                        <DashboardLayout>
                            <h3 class="transactions-title">Assets</h3>
                            <Assets />
                        </DashboardLayout>
                    </div>
                </div>
                <!-- <div v-else>
                    <h2>No transactions found</h2>
                </div> -->
            </main>
        </div>
    </Loader>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Header from '../components/Header.vue';
import NavBar from '../components/NavBar.vue';
import TransactionFilters from '../components/TransactionFilters.vue';
import ResentTransactions from '../components/ResentTransactions.vue';
import DashboardLayout from '../shared/DashboardLayout.vue';
import Loader from '../shared/Loader.vue';
import { appStore } from '../stores/appStore';

import Assets from '../components/Assets.vue';
import { getBalanceService } from '../services/useWallet';

const totalValue = ref<number>(0);

const getBalance = async () => {
    const value = await getBalanceService(appStore().userAddress); //
    totalValue.value = value;
};

onMounted(() => {
    getBalance();
});
</script>

<style scoped>
.layout {
    display: flex;
    justify-content: space-between;
}

.balance-assets-layout {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 30%;
}

.title-layout {
    align-items: center;
}

.title-layout .transactions-title {
    margin-bottom: 0;
}

.transactions-title {
    font-weight: 600;
    margin-bottom: 24px;
}

.wallet-title::before {
    content: '$';
    color: blue;
    margin-right: 32px;
}

.amount-description {
    font-size: 16px;
    font-weight: 600;
}

.amount-value {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    font-size: 48px;
}
</style>
