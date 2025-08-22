<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <defs>
            <mask id="backSquareMask">
                <rect width="64" height="64" fill="white" />

                <rect x="22" y="22" width="30" height="30" fill="black" />
            </mask>
        </defs>

        <rect
            x="12"
            y="12"
            width="30"
            height="30"
            rx="6"
            ry="6"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linejoin="round"
            mask="url(#backSquareMask)"
        />

        <rect
            x="22"
            y="22"
            width="30"
            height="30"
            rx="6"
            ry="6"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linejoin="round"
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
