<template>
<div>
    <el-switch v-model="changeImageUrl" class="ml-2" inline-prompt
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="Rasmni urlni yuklash"
        inactive-text="Rasmni upload qilish" />

    <div class="w-full flex flex-nowrap gap-2" v-if="changeImageUrl">
        <ElInput v-model="input" @keyup.enter="ImgListPush(input)" :placeholder="props.label" />
        <ElButton @click="ImgListPush(input)" class="bg-green text-white">Qo'shish</ElButton>
    </div>

    
    <el-upload v-else ref="upload" action="#" :multiple="props.multiple"
        @change="(file) => ImgListPush(file.raw)" :limit="props.limit" :file-list="images" accept="image/*"
        :auto-upload="false">
        <template #trigger>
            <slot />
        </template>
        <template #file>{{ }}</template>
    </el-upload>

        <div class="flex items-start gap-2 p-2">
        <q-card v-for="image, i in imagesList" class="w-[120px] relative">
            <q-img :src="image" />
            <div class=" w-[100%] h-[100%] bg-[#00000049] absolute z-20 left-0 top-0 flex justify-center items-center">
                <q-icon name="delete" class="text-[30px] text-[white] hover:text-[red]" @click="deleteListItem(i)"/>
            </div>
        </q-card>
    </div>
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

    width: Number,
    height: Number
});


const emits = defineEmits(['update:modelValue', 'result']);

import { ref } from 'vue'
import type { UploadFile, UploadInstance, UploadProps } from 'element-plus'
import { ElMessage, genFileId } from 'element-plus'


const changeImageUrl = ref(true);
const input = ref<string>("")
const upload = ref<UploadInstance>();
const images = ref([]);
const imagesList = ref([]);

onMounted(() => {
    if(typeof props.modelValue == "object") {
        imagesList.value.concat(props.modelValue);
    }
    
    if(typeof props.modelValue == "string") {
        props.modelValue !== "" && imagesList.value.push(props.modelValue)
    }
})


const ImgListPush = async (file: string | object) => {
    const base64: string = await fileReander(file).catch(err => console.log(err)) as string;   
    
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


        if(props.multiple) {
            imagesList.value.push(base64);
            emits('update:modelValue', imagesList.value);
            input.value = "";
        } else {
            imagesList.value = [base64];
            emits('update:modelValue',  imagesList.value.join());
            input.value = "";
        }
    }



const deleteListItem = (index: number) => {
    if(props.multiple) {
        imagesList.value.splice(index, 1)
        emits('update:modelValue',  imagesList.value);

    } else {
        imagesList.value.splice(index, 1);
        emits('update:modelValue',  imagesList.value.join());

    }
};


const handleRemove = (file: UploadFile, files: UploadFile[]) => {
    if (props.multiple) {
        emits("update:modelValue", files);
        emits("result", files);
    } else {
        emits("update:modelValue", "");
        emits("result", "");
    }

}

const handlePictureCardPreview = (file: UploadFile) => {

}


const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}


const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log("ddd");

    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

</script>
  
<style>
.el-upload--picture-card {}
</style>