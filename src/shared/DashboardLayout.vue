<template>
    <div :class="['dashboard-layout', props.class]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
        default: ''
    }
});
</script>

<style scoped>
.dashboard-layout {
    padding: 20px 16px;
    border: 1px solid black;
    border-radius: 12px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.resent-transactions-layout {
    width: 60%;
}
</style>
