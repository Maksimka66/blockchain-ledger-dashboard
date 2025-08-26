<template>
    <Loader>
        <div v-if="appStore().userAddress">
            <Header />
            <main>
                <NavBar />
                <form class="sendTransactionForm" @submit.prevent="handleSendTransaction">
                    <div class="formContainer">
                        <h2 class="formTitle">Send Transaction</h2>
                        <div class="fieldsLayout">
                            <div class="fieldGroup">
                                <label for="address" class="fieldLabel">Address</label>
                                <input
                                    id="address"
                                    v-model="formData.toAddress"
                                    type="text"
                                    placeholder="0x..."
                                    class="formInput"
                                    required
                                />
                            </div>
                            <div class="fieldGroup">
                                <label for="amount" class="fieldLabel">Amount (ETH)</label>
                                <input
                                    id="amount"
                                    v-model="formData.amount"
                                    type="text"
                                    placeholder="0.001"
                                    class="formInput"
                                    @input="handleAmountInput"
                                    required
                                />
                            </div>
                        </div>
                        <Button :width="24" :height="24" class="blue-background-btn">Send</Button>
                    </div>
                    <!-- Local toast positioned outside (to the right) of the centered form -->
                    <transition name="toast-slide-fade">
                        <div
                            v-if="localToast.visible"
                            class="local-toast"
                            :class="`local-toast-${localToast.type}`"
                        >
                            {{ localToast.message }}
                        </div>
                    </transition>
                </form>
            </main>
        </div>
    </Loader>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { getBalanceService, getGasPriceService } from '../services/useWallet';
import Header from '../components/Header.vue';
import NavBar from '../components/NavBar.vue';
import { sendTransactionService } from '../services/useWallet';
import Button from '../shared/Button.vue';
import Loader from '../shared/Loader.vue';
import { appStore } from '../stores/appStore';
// import { useToast } from 'vue-toastification';

const formData = reactive({
    toAddress: '',
    amount: ''
});

// const toast = useToast(); // not used after local toast introduction

const localToast = reactive({
    visible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    timer: 0 as unknown as number
});

const showLocalToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration = 3000
) => {
    localToast.message = message;
    localToast.type = type;
    localToast.visible = true;
    clearTimeout(localToast.timer);
    // @ts-ignore - timer id type compatible in browser
    localToast.timer = setTimeout(() => {
        localToast.visible = false;
    }, duration);
};

const handleAmountInput = (event: Event) => {
    const input = event.target as HTMLInputElement;

    let sanitized = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

    if (sanitized.startsWith('.')) {
        sanitized = '0' + sanitized;
    }

    sanitized = sanitized.replace(/^0+(?=\d)/, '');

    formData.amount = sanitized;
};

const handleSendTransaction = async () => {
    const parsedAmount = parseFloat(formData.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        showLocalToast('Please enter a valid amount', 'error');
        return;
    }

    const balanceEthStr = await getBalanceService();
    const balanceEth = parseFloat(balanceEthStr);

    const gasPriceHex = await getGasPriceService();
    const gasPriceWei = parseInt(gasPriceHex, 16);
    const gasLimit = 21000;
    const feeEth = (gasPriceWei * gasLimit) / 1e18;

    const totalEthNeeded = parsedAmount + feeEth;

    if (balanceEth < totalEthNeeded) {
        showLocalToast(
            `Insufficient funds. Needed ≈ ${totalEthNeeded.toFixed(6)} ETH (incl. fee ~${feeEth.toFixed(6)} ETH).`,
            'error'
        );
        return;
    }

    try {
        const txHash = await sendTransactionService({
            toAddress: formData.toAddress,
            amount: parsedAmount
        });

        appStore().addResentTransaction({
            id: txHash,
            type: 'Transfer',
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            status: 'Pending',
            block: 0
        });

        showLocalToast('Transaction sent', 'success');

        formData.toAddress = '';
        formData.amount = '';
    } catch (err: any) {
        if (err?.code === 4001) {
            showLocalToast('Transaction was rejected', 'warning');
        } else {
            showLocalToast('Transaction failed. Please try again.', 'error');
        }
        console.error(err);
    }
};
</script>

<style scoped>
.local-toast {
    position: absolute;
    top: 12px;
    left: calc(50% + 252px);
    transform: none;
    max-width: 320px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1f2937;
    padding: 10px 14px;
    border-radius: 10px;
    text-align: left;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    z-index: 2;
}

.local-toast-success {
    background: #ecfdf5;
    border-color: #a7f3d0;
    color: #065f46;
}
.local-toast-error {
    background: #fef2f2;
    border-color: #fca5a5;
    color: #7f1d1d;
}
.local-toast-warning {
    background: #fffbeb;
    border-color: #fde68a;
    color: #92400e;
}
.local-toast-info {
    background: #eff6ff;
    border-color: #bfdbfe;
    color: #1e3a8a;
}

.toast-slide-fade-enter-active,
.toast-slide-fade-leave-active {
    transition: all 0.25s ease;
}
.toast-slide-fade-enter-from,
.toast-slide-fade-leave-to {
    opacity: 0;
    transform: translateX(6px);
}
.sendTransactionForm {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 80vh;
}

.formContainer {
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 2.5rem;
    width: 100%;
    max-width: 480px;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.formTitle {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin-bottom: 2rem;
    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
}

.fieldsLayout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.fieldGroup {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.fieldLabel {
    text-align: left;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
}

.formInput {
    padding: 0.875rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
    transition: all 0.2s ease;
    background: #f9fafb;
}

.formInput:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.formInput::placeholder {
    color: #9ca3af;
}

.formInput:hover {
    border-color: #d1d5db;
    background: white;
}

/* Responsive design */
@media (max-width: 640px) {
    .formContainer {
        padding: 1.5rem;
        margin: 1rem;
    }

    .formTitle {
        font-size: 1.5rem;
    }

    .fieldsLayout {
        gap: 1rem;
    }
}
</style>
