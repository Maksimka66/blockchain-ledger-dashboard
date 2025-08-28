<template>
    <ul class="transactions-list">
        <li class="transactions-header">
            <p class="transactions-cell">Transaction ID</p>
            <p class="transactions-cell">Type</p>
            <p class="transactions-cell">Timestamp</p>
            <p class="transactions-cell">Status</p>
            <p class="transactions-cell">Block</p>
        </li>

        <li class="transactions-row" v-for="value in transactions" :key="value.hash">
            <Button
                @click="getTransactionInfo(value.hash)"
                class="transaction-id current-transaction"
            >
                {{ value.hash }}
            </Button>
            <p class="transactions-cell">
                <span class="type-badge">{{ value.type }}</span>
            </p>
            <p class="transactions-cell">{{ value.timeStamp }}</p>
            <p class="transactions-cell">
                <!-- <span :class="getStatusClass(value.status)">{{ value.status }}</span> -->
            </p>
            <p class="transactions-cell">{{ value.blockNumber }}</p>
            <div class="transactions-actions" v-if="value.status === 'Invalid'">
                <Button class="resent-transactions-button"> Retry </Button>
            </div>
        </li>
    </ul>

    <Pagination
        :total-items="
            appStore().txIdQuery.trim() ? filteredTransactions.length : allTransactions.length
        "
        :page-size="pageSize"
        @page-change="handlePageChange"
    />

    <Modal v-model="appStore().isWindowOpen" v-if="modalType === 'transaction'">
        <div class="transaction-details">
            <h3 class="transaction-details-title">Transaction Details</h3>
            <div class="transaction-details-grid">
                <div class="detail-item">
                    <span class="detail-label">Transaction ID</span>
                    <span class="detail-value">{{ selectedTx.hash }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Creator</span>
                    <span class="detail-value">{{ selectedTx.from }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Endorsements</span>
                    <span class="detail-value">{{ selectedTx.endorsements }}</span>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Button from '../shared/Button.vue';
import Modal from '../shared/Modal.vue';
import Pagination from '../shared/Pagination.vue';
import { getAllTransactionsService, getCurrentTransaction } from '../services/useWallet';
import { appStore } from '../stores/appStore';
import type { ITransactionData, Transaction, TransactionDetails } from '../types';

defineProps<{
    transactions: ITransactionData[];
}>();

const res = ref<Transaction[]>([]);
const allTransactions = ref<Transaction[]>([]);
const filteredTransactions = ref<Transaction[]>([]);

const currentPage = ref(1);
const pageSize = 5;

const selectedTx = ref<TransactionDetails>({
    hash: '',
    from: '',
    endorsements: []
});

const modalType = ref<'transaction' | 'confirmation' | ''>('');

const getTransactionInfo = async (txHash: string) => {
    appStore().isWindowOpen = true;
    modalType.value = 'transaction';
    const txData = await getCurrentTransaction(txHash);

    selectedTx.value = txData;
};

const handlePageChange = (page: number) => {
    currentPage.value = page;
    updateDisplayedTransactions();
};

watch(
    () => appStore().txIdQuery,
    () => {
        currentPage.value = 1;
        updateDisplayedTransactions();
    }
);

const updateDisplayedTransactions = () => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;

    const searchActive = appStore().txIdQuery;

    if (searchActive.trim()) {
        filteredTransactions.value = allTransactions.value.filter((tx) =>
            tx.hash.toLowerCase().includes(searchActive.toLowerCase())
        );
        res.value = filteredTransactions.value.slice(start, end);
    } else {
        res.value = allTransactions.value.slice(start, end);
    }
};

// const getStatusClass = (status: string) => {
//     switch (status.toLowerCase()) {
//         case 'validated':
//         case 'valid':
//             return 'status-badge status-valid';
//         case 'success':
//             return 'status-badge status-success';
//         case 'pending':
//         case 'in progress':
//             return 'status-badge status-pending';
//         case 'invalid':
//         case 'failed':
//             return 'status-badge status-invalid';
//         default:
//             return 'status-badge status-default';
//     }
// };

// onMounted(async () => {
//     try {
//         const response = await getAllTransactionsService(appStore().userAddress);
//         allTransactions.value = response;
//         updateDisplayedTransactions();
//     } catch (error) {
//         console.log(error);
//     }
// });
</script>

<style scoped>
.transactions-list {
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    overflow: hidden;
    background: #ffffff;
    list-style: none;
    padding: 0;
    margin: 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}

.transactions-header {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
    gap: 16px;
    background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
    padding: 14px 18px;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
    letter-spacing: 0.2px;
}

.transactions-row {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
    gap: 16px;
    padding: 14px 18px;
    border-bottom: 1px solid #f3f4f6;
    transition:
        background 0.2s ease,
        transform 0.1s ease;
}

.transactions-row:nth-child(odd) {
    background: #fcfcfd;
}

.transactions-row:last-child {
    border-bottom: none;
}

.transactions-row:hover {
    background: #f8fafc;
    transform: translateY(-1px);
}

.status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
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

.type-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #e5e7eb;
    background-color: #f8fafc;
    color: #374151;
}

/* Модальное окно с деталями транзакции */
.transaction-details {
    padding: 24px;
    max-width: 520px;
}

.transaction-details-title {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 24px 0;
    text-align: center;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 12px;
}

.transaction-details-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;
}

.detail-item:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-label {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.detail-value {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    word-break: break-all;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: #ffffff;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

/* Адаптивность */
@media (max-width: 768px) {
    .transactions-header,
    .transactions-row {
        grid-template-columns: 1.6fr 0.9fr 1.8fr 0.9fr 0.8fr;
        gap: 12px;
        padding: 12px 12px;
    }

    .transactions-list {
        border-radius: 12px;
        box-shadow: 0 6px 22px rgba(0, 0, 0, 0.05);
    }
}
</style>
