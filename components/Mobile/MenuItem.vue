<script setup>
const props = defineProps({
    node: {
        type: Object,
        default: null
    }
})


const { toggleMenu } = useMobileMenu();

</script>

<template>
                <slot name="node" :node="props.node"/>
</template>

<style scoped></style>