<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block"
    >
        <!-- Вертикальная черта по всей высоте символа -->
        <line
            x1="32"
            y1="8"
            x2="32"
            y2="56"
            stroke="#2563eb"
            stroke-width="3"
            stroke-linecap="round"
        />
        <!-- Контур буквы S -->
        <path
            d="M40 18c0-4.971-3.582-9-8-9s-8 4.029-8 9c0 4.971 3.582 9 8 9s8 4.029 8 9c0 4.971-3.582 9-8 9s-8-4.029-8-9"
            fill="none"
            stroke="#2563eb"
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
