<script setup>
const props = defineProps({
    modelValue: {
        type: String
    },
    rules: String,
    maxlength: Number
})
const emits = defineEmits("update:modelValue")

const code = ref("+998 94")
const phone_number = ref("");

const updateValue = computed({
    get:() => props.modelValue,
    set:(newVal) => emits("update:modelValue", newVal)
})


watchEffect(() => updateValue.value = code.value+" "+ phone_number.value)

const updateValueLength = computed(() => updateValue.value.length);

const rules = val => val && val.length > 0 || props.rules; 
const codes = ref(["+998 94", "+998 93", "+998 77", "+998 88", "+998 33", "+998 55", "+998 91", "+998 90"])

</script>



<template>
    <QInput type="tel" v-model="phone_number" outlined maxlength="9" required :rules="[props.rules && rules]" mask="### ## ##" placeholder="000 00 00">
        <template #prepend>
            <div v-bind="$attrs" class="h-full w-full">
                <select v-model="code" class="h-full bg-transparent outline-none border-none">
                <option v-for="(item, index) in codes" :key="index" :value="item">{{ item }}</option>
            </select>
            </div>
        </template>
    </QInput>

</template>

<style scoped>
</style>

