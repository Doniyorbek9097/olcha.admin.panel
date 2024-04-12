<script setup>
const props = defineProps({
    modelValue: {
        type: String
    },
    rules: String,
    maxlength: Number
})
const emits = defineEmits("update:modelValue")

const updateValue = computed({
    get:() => props.modelValue,
    set:(newVal) => emits("update:modelValue", newVal)
})

const updateValueLength = computed(() => updateValue.value.length)
const rules = val => val && val.length > 0 || props.rules; 


</script>

<template>
    <QInput v-model="updateValue" :maxlength="maxlength" outlined dense :rules="[props.rules && rules]">
        <template #append>
            <p class="text-sm" v-if="updateValueLength">
            <span>{{maxlength}}</span> /
            <span>{{updateValueLength}}</span>
            </p>
        </template>
    </QInput>
</template>