<template>
    <div class="toast-container" :class="positionClass">
        <transition-group name="toast-fade" tag="div">
            <div v-for="item in items" :key="item.id" class="toast" :class="`toast-${item.type}`">
                <span class="toast-message">{{ item.message }}</span>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toastStore } from '../stores/toastStore';

const props = defineProps<{ position?: 'top' | 'top-center' | 'bottom' }>();

const store = toastStore();
const items = computed(() => store.items);

const positionClass = computed(() => {
    switch (props.position) {
        case 'top':
        case 'top-center':
        default:
            return 'pos-top-center';
    }
});
</script>

<style scoped>
.toast-container {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    width: max-content;
    width: 90vw;
}

.pos-top-center {
    top: 24px;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
    transition:
        opacity 0.2s,
        transform 0.2s;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.toast {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    margin: 8px 0;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    color: #111827;
    border: 1px solid transparent;
    backdrop-filter: saturate(1.2) blur(3px);
}

.toast-success {
    background: #ecfdf5;
    border-color: #a7f3d0;
}
.toast-error {
    background: #fef2f2;
    border-color: #fca5a5;
}
.toast-info {
    background: #eff6ff;
    border-color: #bfdbfe;
}
.toast-warning {
    background: #fffbeb;
    border-color: #fde68a;
}

.toast-message {
    white-space: pre-wrap;
}
</style>
