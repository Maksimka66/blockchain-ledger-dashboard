<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <path
            d="M32 8 L48 16 L48 32 C48 40 40 48 32 56 C24 48 16 40 16 32 L16 16 Z"
            fill="none"
            stroke="#6B7280"
            stroke-width="2"
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
