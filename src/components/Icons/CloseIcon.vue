<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <line
            x1="20"
            y1="20"
            x2="44"
            y2="44"
            stroke="#000000"
            stroke-width="3"
            stroke-linecap="round"
        />

        <line
            x1="44"
            y1="20"
            x2="20"
            y2="44"
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
