import { appStore } from '../stores/appStore';

interface ITransactionParameters {
    to: string;
    from: string;
    value: string;
    gas: string;
    gasPrice?: string;
}

interface ISendTransactionParams {
    toAddress: string;
    amount: number;
    gasPrice?: string;
}

export const connectWalletService = async () => {
    try {
        appStore().setIsLoading(true);

        if (!window.ethereum) {
            alert('Please install MetaMask as your Google extension!');
            return;
        }

        const accounts = (await window.ethereum.request({
            method: 'eth_requestAccounts'
        })) as string[];

        if (accounts.length > 0) {
            console.log('Your wallet is connected:', accounts[0]);

            appStore().setUserAddress(accounts[0]);
            appStore().setIsWindowOpen(false);

            localStorage.setItem('userAddress', accounts[0]);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        appStore().setIsLoading(false);
    }
};

export const disconnectWalletService = async () => {
    try {
        appStore().setIsLoading(true);

        if (appStore().userAddress) {
            appStore().setUserAddress('');
            appStore().setIsWindowOpen(true);

            if (typeof window !== 'undefined') {
                localStorage.removeItem('userAddress');
                sessionStorage.removeItem('userAddress');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        appStore().setIsLoading(false);
    }
};

export const sendTransactionService = async ({
    toAddress,
    amount,
    gasPrice
}: ISendTransactionParams) => {
    try {
        appStore().setIsLoading(true);

        if (!window.ethereum) {
            throw new Error('Install MetaMask please!');
        }

        if (!appStore().userAddress) {
            throw new Error('Network error, please try again');
        }

        const transactionParameters: ITransactionParameters = {
            to: toAddress,
            from: appStore().userAddress,
            value: '0x' + (amount * 1e18).toString(16),
            gas: '0x5208'
        };

        if (gasPrice) {
            transactionParameters.gasPrice = gasPrice;
        }

        const txHash = (await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters]
        })) as string;

        console.log('Your transaction has been sent!', txHash);

        trackTransactionStatus(txHash).catch((e) => console.error('Track status error', e));

        return txHash;
    } catch (error) {
        console.error('Transaction failed', error);
        throw error;
    } finally {
        appStore().setIsLoading(false);
    }
};

export const getBalanceService = async () => {
    try {
        if (!window.ethereum || !appStore().userAddress) {
            return '0';
        }

        const balanceHex = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [appStore().userAddress, 'latest']
        });

        const balanceWei = BigInt(balanceHex);

        const balanceEth = Number(balanceWei) / 1e18;

        return balanceEth.toString();
    } catch (error) {
        console.error('Ошибка получения баланса:', error);
        return '0';
    }
};

export const restoreWalletState = () => {
    try {
        if (typeof window !== 'undefined') {
            const savedAddress = localStorage.getItem('userAddress');

            if (savedAddress) {
                appStore().setUserAddress(savedAddress);
                appStore().setIsWindowOpen(false);
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error restoring wallet state:', error);
        return false;
    }
};

export const isWalletConnected = (): boolean => {
    return !!appStore().userAddress;
};

export const getGasPriceService = async () => {
    try {
        if (!window.ethereum) {
            return '0';
        }

        const gasPrice = (await window.ethereum.request({
            method: 'eth_gasPrice'
        })) as string;

        return gasPrice;
    } catch (error) {
        console.error('Ошибка получения цены газа:', error);
        return '0';
    }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const trackTransactionStatus = async (txHash: string) => {
    const provider = window.ethereum;
    if (!provider) return;

    for (let attempt = 0; attempt < 120; attempt++) {
        try {
            const receipt = (await provider.request({
                method: 'eth_getTransactionReceipt',
                params: [txHash]
            })) as any | null;

            if (receipt) {
                const statusHex = receipt.status as string;
                const blockNumberHex = receipt.blockNumber as string | undefined;
                const blockNumber = blockNumberHex ? parseInt(blockNumberHex, 16) : 0;

                if (statusHex === '0x1') {
                    appStore().updateResentTransaction(txHash, {
                        status: 'Success',
                        block: blockNumber
                    });
                } else if (statusHex === '0x0') {
                    appStore().updateResentTransaction(txHash, {
                        status: 'Invalid',
                        block: blockNumber
                    });
                } else {
                    appStore().updateResentTransaction(txHash, {
                        status: 'Validated',
                        block: blockNumber
                    });
                }
                return;
            }
        } catch (e) {
            console.error('Receipt fetch error', e);
        }
        await delay(5000);
    }
};
