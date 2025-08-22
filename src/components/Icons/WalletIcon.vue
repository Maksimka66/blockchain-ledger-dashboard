<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <rect
            x="20"
            y="20"
            width="24"
            height="24"
            rx="3"
            ry="3"
            fill="none"
            :stroke="strokeColor"
            stroke-width="2"
        />

        <rect
            x="20"
            y="20"
            width="24"
            height="6"
            rx="3"
            ry="3"
            fill="none"
            :stroke="strokeColor"
            stroke-width="2"
        />

        <rect
            x="44"
            y="22"
            width="4"
            height="20"
            rx="2"
            ry="2"
            fill="none"
            :stroke="strokeColor"
            stroke-width="2"
        />

        <circle cx="46" cy="32" r="1.5" :fill="strokeColor" />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    size?: number | string;
    strokeColor?: string;
}

withDefaults(defineProps<Props>(), {
    size: 32,
    strokeColor: '#000000'
});
</script>
