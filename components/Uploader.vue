<template>
    <el-upload ref="upload" action="#" :multiple="props.multiple" :on-remove="handleRemove"
        :on-preview="handlePictureCardPreview" @change="ImgListPush" :on-exceed="handleExceed" :list-type="props.listType"
        :limit="props.limit" :file-list="images" accept="image/*" :auto-upload="false">
        <template #trigger>
            <slot />
        </template>
    </el-upload>
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: Array,
        default: []
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

    width: Number,
    height: Number
});


const emits = defineEmits(['update:modelValue', 'result']);

import { ref } from 'vue'
import type { UploadFile, UploadInstance, UploadProps } from 'element-plus'
import { ElMessage, genFileId } from 'element-plus'

const upload = ref<UploadInstance>();
const images = ref([]);
const isError = ref(false);

const ImgListPush = (file: UploadFile, files: UploadFile[]) => {

    if (props.width || props.height) {
        const image = new Image();
        image.src = file.url as string;

        image.onload = () => {
            if (image.width !== props.width && image.height !== props.height) {
                isError.value = true;
                ElMessage.error(`Rasmning ${props.width ? "Bo'yi:" + props.width : ""} ${props.height ? "Kengligi:" + props.height : ""} pixel bo'lishi lozim`);
                return ElMessage.error(`Siz tanlangan rasmning ${image.width ? "Bo'yi:" + image.width : ""} ${image.height ? "Kengligi:" + image.height : ""} pixel`)
            }

        }

        if (props.multiple) {
            emits("update:modelValue", files);
            emits("result", files);
        } else {
            emits("update:modelValue", file);
            emits("result", file);
        }


    } else {

        if (props.multiple) {
            emits("update:modelValue", files);
            emits("result", files);
        } else {
            emits("update:modelValue", file);
            emits("result", file);
        }


    }


}

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
  