<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <path
            d="M 16 12 L 16 52 M 16 12 L 24 12 M 16 52 L 24 52"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            fill="none"
        />

        <path
            d="M 32 32 L 48 32 M 48 32 L 44 28 M 48 32 L 44 36"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
        />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    size?: number | string;
}

withDefaults(defineProps<Props>(), {
    size: 24
});
</script>
