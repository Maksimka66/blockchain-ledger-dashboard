import { defineStore } from 'pinia';

interface AppState {
    userAddress: string;
    isWindowOpen: boolean;
}

export const appStore = defineStore('appStore', {
    state: (): AppState => ({
        userAddress: '',
        isWindowOpen: true
    }),
    actions: {
        setUserAddress(address: string) {
            this.userAddress = address;
        },
        setIsWindowOpen(open: boolean) {
            this.isWindowOpen = open;
        }
    }
});
