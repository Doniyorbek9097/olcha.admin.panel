<script setup>
const props = defineProps({
    node: {
        type: Object,
        default: null
    },

    title: String
})

const active = ref(false);

const showMenu = (bool) => active.value = bool;
</script>

<template>
    <div class="row w-full items-center justify-between !p-[10px] border-b-2 cursor-pointer">
        <slot name="node" :node="props.node" :show="showMenu" :active="active" />
    </div>
</template>

<style scoped></style>