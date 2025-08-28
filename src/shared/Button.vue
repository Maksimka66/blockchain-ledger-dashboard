<template>
    <button :class="['custom-button', props.class]" :width="props.width" :height="props.height">
        <slot name="icon" />
        <slot />
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    width: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    icon: {
        type: [Object, Function],
        required: false
    },
    class: {
        type: String,
        required: false
    }
});
</script>

<style scoped>
.custom-button {
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    padding: 0;
    border-radius: 24px;
}

.custom-button:hover {
}

.blue-background-btn {
    padding: 4px 16px;
    background-color: rgb(53, 53, 231);
    color: #ffffff;
    justify-content: center;
}

.close-btn {
    position: absolute;
    right: 16px;
    top: 16px;
}

.disconnect {
    border: 1px solid #0f0f0f;
    padding: 4px 16px;
}

.resent-transactions-button {
    padding: 4px 8px;
    border-radius: 8px;
    border: 1px solid #0f0f0f;
    color: gray;
}

.current-transaction {
    max-width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    padding: 4px 12px;
}

.confirm {
    padding: 16px 80px;
    background-color: transparent;
    border: 1px solid #0f0f0f;
    font-size: 24px;
}

.reject {
    padding: 16px 80px;
    background-color: rgb(53, 53, 231);
    color: #ffffff;
    font-size: 24px;
}
</style>
