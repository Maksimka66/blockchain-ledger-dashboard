import { defineStore } from 'pinia';
import type { ITransactionData } from '../types';

interface IAppState {
    userAddress: string;
    totalValue: number;
    resentTransactions: ITransactionData[];
    isWindowOpen: boolean;
    isLoading: boolean;
    txStatusFilter: 'All' | 'Pending' | 'Validated' | 'Invalid';
    txIdQuery: string;
    txPage: number;
    txPageSize: number;
}

export const appStore = defineStore('appStore', {
    state: (): IAppState => ({
        userAddress: '',
        totalValue: 0,
        resentTransactions: [],
        isWindowOpen: true,
        isLoading: false,
        txStatusFilter: 'All',
        txIdQuery: '',
        txPage: 1,
        txPageSize: 5
    }),
    getters: {
        filteredResentTransactions(state): ITransactionData[] {
            const byStatus =
                state.txStatusFilter === 'All'
                    ? state.resentTransactions
                    : state.resentTransactions.filter((t) => t.status === state.txStatusFilter);

            const q = state.txIdQuery.trim().toLowerCase();
            if (!q) return byStatus;
            return byStatus.filter((t) => t.id.toLowerCase().includes(q));
        },
        pagedResentTransactions(): ITransactionData[] {
            const list = (appStore() as any).filteredResentTransactions as ITransactionData[];
            const start = (this.txPage - 1) * this.txPageSize;
            return list.slice(start, start + this.txPageSize);
        },
        totalFilteredCount(): number {
            const list = (appStore() as any).filteredResentTransactions as ITransactionData[];
            return list.length;
        }
    },
    actions: {
        setUserAddress(address: string) {
            this.userAddress = address;
        },
        setTotalValue(value: number) {
            this.totalValue = value;
        },
        setIsWindowOpen(open: boolean) {
            this.isWindowOpen = open;
        },
        setIsLoading(toggle: boolean) {
            this.isLoading = toggle;
        },
        addResentTransaction(tx: ITransactionData) {
            console.log(tx);

            this.resentTransactions.unshift(tx);
        },
        updateResentTransaction(id: string, partial: Partial<ITransactionData>) {
            console.log(partial);

            const index = this.resentTransactions.findIndex((t) => t.id === id);
            if (index !== -1) {
                this.resentTransactions[index] = {
                    ...this.resentTransactions[index],
                    ...partial
                };
            }
        },
        setTxStatusFilter(value: 'All' | 'Pending' | 'Validated' | 'Invalid') {
            this.txStatusFilter = value;
            this.txPage = 1;
        },
        setTxIdQuery(value: string) {
            this.txIdQuery = value;
            this.txPage = 1;
        },
        setTxPage(page: number) {
            const total = (this as any).totalFilteredCount as number;
            const maxPage = Math.max(1, Math.ceil(total / this.txPageSize));
            this.txPage = Math.min(Math.max(1, page), maxPage);
        },
        nextTxPage() {
            this.setTxPage(this.txPage + 1);
        },
        prevTxPage() {
            this.setTxPage(this.txPage - 1);
        },
        setTxPageSize(size: number) {
            this.txPageSize = size;
            this.txPage = 1;
        }
    }
});
