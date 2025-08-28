<template>
    <div class="modal-window" v-if="appStore().isWindowOpen" @click="hideWindow">
        <div @click.stop class="modal-content">
            <Button :width="28" :height="28" @click="hideWindow" class="close-btn">
                <template #icon><CloseIcon size="28" /></template>
            </Button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import CloseIcon from '../components/Icons/CloseIcon.vue';
import { appStore } from '../stores/appStore';
import Button from './Button.vue';

const emit = defineEmits(['update:modelValue']);

const hideWindow = () => {
    emit('update:modelValue', false);
};
</script>

<style>
.modal-window {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #00000080;
    position: fixed;
    display: flex;
    z-index: 999;
}

.modal-content {
    position: relative;
    display: flex;
    background-color: #ffffff;
    margin: auto;
    border-radius: 12px;
    min-width: 400px;
    max-width: 600px;
    padding: 32px;
}
</style>
