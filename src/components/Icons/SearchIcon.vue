<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <circle cx="28" cy="28" r="14" fill="none" stroke="#000000" stroke-width="3" />
        <line
            x1="40"
            y1="40"
            x2="54"
            y2="54"
            stroke="#000000"
            stroke-width="3"
            stroke-linecap="round"
        />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    size?: number | string;
}
withDefaults(defineProps<Props>(), {
    size: 32
});
</script>
