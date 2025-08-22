import { appStore } from '../stores/appStore';

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            alert('Please install MetaMask as your Google extension!');
            return;
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        console.log(accounts);

        if (accounts.length > 0) {
            console.log('Your wallet is connected:', accounts[0]);

            appStore().setUserAddress(accounts[0]);
            appStore().setIsWindowOpen(false);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
