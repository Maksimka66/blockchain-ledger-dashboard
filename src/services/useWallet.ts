import { ethers } from 'ethers';
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

export async function connectWalletService() {
    try {
        appStore().setIsLoading(true);

        if (!window.ethereum) {
            alert('Please install MetaMask as your Google extension!');
            return;
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        const balance = await getBalanceService(accounts[0]);

        if (accounts.length > 0) {
            appStore().setUserAddress(accounts[0]);
            localStorage.setItem('userAddress', accounts[0]);
            return {
                address: accounts[0],
                balance
            };
        } else {
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        appStore().setIsLoading(false);
    }
}

export async function getBalanceService(address: string): Promise<number> {
    try {
        if (!window.ethereum) return 0;

        const balanceHex = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest']
        });

        const balanceWei = BigInt(balanceHex);
        const balanceEth = parseFloat(ethers.formatEther(balanceWei));

        const ethToUsdRate = 4502.83;
        return balanceEth * ethToUsdRate;
    } catch (error) {
        console.error('Error!', error);
        return 0;
    }
}

export async function getAllTransactionsService(address: string) {
    try {
        const apiKey = 'YXD5ZJ4XVJ3MAJDVEJ6ASIX5Z55WKTUDGX';

        const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        const transactions = data.result;

        return transactions;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentTransaction(hash: string) {
    const res = await window.ethereum?.request({
        method: 'eth_getTransactionByHash',
        params: [hash]
    });

    return res;
}

export async function disconnectWalletService() {
    try {
        appStore().setIsLoading(true);

        if (appStore().userAddress) {
            appStore().setUserAddress('');
            appStore().setIsWindowOpen(true);

            if (typeof window !== 'undefined') {
                localStorage.removeItem('userAddress');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        appStore().setIsLoading(false);
    }
}

export async function sendTransactionService({
    toAddress,
    amount,
    gasPrice
}: ISendTransactionParams) {
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

        console.log(amount);

        const currentBalance = await getBalanceService(appStore().userAddress);

        if (amount > currentBalance) {
            throw Error('Your balance is not enough for this transaction!');
        }

        if (gasPrice) {
            transactionParameters.gasPrice = gasPrice;
        }

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters]
        });

        return txHash;
    } catch (error) {
        console.error('Transaction failed', error);
        throw error;
    } finally {
        appStore().setIsLoading(false);
    }
}

export async function restoreWalletState() {
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
}

export async function isWalletConnected(): Promise<boolean> {
    return !!appStore().userAddress;
}

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

async function trackTransactionStatus(txHash: string) {
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
                        status: 'Validated',
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
}
