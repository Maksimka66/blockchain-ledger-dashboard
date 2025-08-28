export interface Transaction {
    hash: string;
    type: string;
    timeStamp: string;
    status: string;
    blockNumber: string;
}

export interface TransactionDetails {
    hash: string;
    from: string;
    endorsements: any[];
}

export interface PaginationState {
    currentPage: number;
    pageSize: number;
    totalPages: number;
}

export interface PaginationProps {
    totalItems: number;
    pageSize?: number;
    initialPage?: number;
}

export interface PaginationEmits {
    (e: 'page-change', page: number): void;
}

export interface ITransactionData {
    hash: string;
    type: string;
    timestamp: string;
    status: 'Validated' | 'Pending' | 'Invalid';
    block: number;
    amount: number;
}
