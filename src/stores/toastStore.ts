import { defineStore } from 'pinia';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface IToastItem {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
}

interface IToastState {
    items: IToastItem[];
    nextId: number;
}

export const toastStore = defineStore('toastStore', {
    state: (): IToastState => ({
        items: [],
        nextId: 1
    }),
    actions: {
        show(message: string, type: ToastType = 'info', duration = 3000) {
            const id = this.nextId++;
            const toast: IToastItem = { id, message, type, duration };
            this.items.push(toast);

            setTimeout(() => {
                this.remove(id);
            }, duration);
        },
        success(message: string, duration = 3000) {
            this.show(message, 'success', duration);
        },
        error(message: string, duration = 4000) {
            this.show(message, 'error', duration);
        },
        info(message: string, duration = 3000) {
            this.show(message, 'info', duration);
        },
        warning(message: string, duration = 3000) {
            this.show(message, 'warning', duration);
        },
        remove(id: number) {
            this.items = this.items.filter((t) => t.id !== id);
        }
    }
});
