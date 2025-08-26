import { defineStore } from 'pinia';

export interface ITransactionData {
    id: string;
    type: string;
    timestamp: string;
    status: 'Validated' | 'Pending' | 'Invalid' | 'Success';
    block: number;
}

interface IAppState {
    userAddress: string;
    totalValue: number;
    resentTransactions: ITransactionData[];
    isWindowOpen: boolean;
    isLoading: boolean;
    txStatusFilter: 'All' | 'Pending' | 'Success' | 'Validated' | 'Invalid';
    txIdQuery: string;
    txPage: number;
    txPageSize: number;
}

export const appStore = defineStore('appStore', {
    state: (): IAppState => ({
        userAddress: '',
        totalValue: 0,
        resentTransactions: [
            {
                id: '0xa1b2c3d4e5f6789',
                type: 'Transfer',
                timestamp: '2024-08-19 10:30:15',
                status: 'Invalid',
                block: 3457821
            },
            {
                id: '0xf6e5d4c3b2a1098',
                type: 'Mint',
                timestamp: '2024-08-19 10:25:42',
                status: 'Validated',
                block: 3457820
            },
            {
                id: '0x9876543210abcdef',
                type: 'Transfer',
                timestamp: '2024-08-19 10:20:08',
                status: 'Pending',
                block: 3457819
            }
        ],
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
        setIsWindowOpen(open: boolean) {
            this.isWindowOpen = open;
        },
        setIsLoading(toggle: boolean) {
            this.isLoading = toggle;
        },
        addResentTransaction(tx: ITransactionData) {
            this.resentTransactions.unshift(tx);
        },
        updateResentTransaction(id: string, partial: Partial<ITransactionData>) {
            const index = this.resentTransactions.findIndex((t) => t.id === id);
            if (index !== -1) {
                this.resentTransactions[index] = {
                    ...this.resentTransactions[index],
                    ...partial
                };
            }
        },
        setTxStatusFilter(value: 'All' | 'Pending' | 'Success' | 'Validated' | 'Invalid') {
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
