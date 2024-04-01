<template>
     <q-field class="w-full" ref="fieldRef" dense v-bind:model-value="modelValue" no-error-icon borderless
      :rules="[val => isEmpty ? val.length || isEmpty : true]">
      <template #control>
    <div>
        <div class="w-full flex flex-nowrap gap-2" v-if="changeImageUrl">
            <q-input v-model="input" @keyup.enter="ImgListPush(input)" :label="props.label" dense :required="props.required" />
            <q-btn @click="ImgListPush(input)" class="bg-green text-white" label="Qo'shish" dense/>
        </div>
    
        <div v-else class="w-full flex flex-nowrap gap-2">
            <q-input type="file" @update:model-value="(file) => ImgListPush(file)"/>
        </div>

        <q-toggle 
        v-model="changeImageUrl"  
        :label="changeImageUrl ? 'Rasmni Xotiradan yuklash': 'Rasmni havola manzilini yuklash'"
        checked-icon="check"
        unchecked-icon="clear"
        />
    </div>
    
</template>
</q-field>

<div class="flex items-start gap-2 p-2">
            <q-card v-for="image, i in imagesList" class="w-[120px] relative">
                <q-img :src="image" />
                <div
                    class=" w-[100%] h-[100%] bg-[#00000049] absolute z-20 left-0 top-0 flex justify-center items-center">
                    <q-icon name="delete" class="text-[30px] text-[white] hover:text-[red]"
                        @click="deleteListItem(i, image)" />
                </div>
            </q-card>
</div>

</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: [Array, String],
    },
    multiple: {
        type: Boolean,
        default: false
    },

    limit: {
        type: Number,

    },

    listType: {
        type: String,
        default: "picture"
    },

    label: {
        type: String,
        default: "Rasmni havlasi"
    },

    isEmpty: {
        type: String,
        default:""
    },

    required: {
        type:Boolean,
        default: false
    },

    width: Number,
    height: Number
});


const emits = defineEmits(['update:modelValue', 'delete-image']);

const changeImageUrl = ref(true);
const input = ref<string>("");
const imagesList = ref([]);

onMounted(() => {
    if (typeof props.modelValue == "object") {
        imagesList.value = props.modelValue;
    }

    if (typeof props.modelValue == "string") {
        props.modelValue !== "" && imagesList.value.push(props.modelValue)
    }
})


const ImgListPush = async (file: string | object) => {
    let base64;
    if(typeof file == 'object') {
        base64 = await fileReander(file[0]).catch(err => console.log(err))
    }
    else if(typeof file == "string") {
        base64 = file;
    }
    else {
        return;
    }

    // if (props.width || props.height) {
    //     const image = new Image();
    //     image.src = file.url as string;

    //     image.onload = () => {
    //         if (image.width !== props.width && image.height !== props.height) {
    //             isError.value = true;
    //             ElMessage.error(`Rasmning ${props.width ? "Bo'yi:" + props.width : ""} ${props.height ? "Kengligi:" + props.height : ""} pixel bo'lishi lozim`);
    //             return ElMessage.error(`Siz tanlangan rasmning ${image.width ? "Bo'yi:" + image.width : ""} ${image.height ? "Kengligi:" + image.height : ""} pixel`)
    //         }

    //     }
    // }


    if (props.multiple) {
        imagesList.value.push(base64);
        emits('update:modelValue', imagesList.value);
        input.value = "";
    } else {
        imagesList.value = [base64];
        emits('update:modelValue', imagesList.value.join());
        input.value = "";
    }
}



const deleteListItem = (index: number, imagePath) => {
    emits("delete-image", imagePath, index);
    imagesList.value.splice(index, 1);
    if (props.multiple) {
        emits('update:modelValue', imagesList.value);

    } else {
        emits('update:modelValue', imagesList.value.join());
    }
};


</script>

<style>
.el-upload--picture-card {}
</style>