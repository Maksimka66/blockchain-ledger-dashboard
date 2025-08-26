<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <path
            d="M12 14H52L38 30V44H26V30L12 14Z"
            fill="none"
            stroke="#000000"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
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
