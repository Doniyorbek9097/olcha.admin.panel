<template>
    <div class="row gap-2 m-5">
        <el-checkbox-group class="col-12" v-model="selectedColors" @change="clearColor">
            <el-checkbox-button v-for="color, index in colors" :key="color.name" :label="color" >
                {{ color.name }}
            </el-checkbox-button>
        </el-checkbox-group>

        <div v-for="color, index in selectedColors" class="col-12">
            <ElText><b>{{ color.name }}</b> uchun rasm tanlang</ElText>
            <Uploader v-if="color" @result="(val) => sendFormData(color.images = val)"></Uploader>
        </div>
    </div>
</template>

<script setup>


const emits = defineEmits(['result']);


const colors = ref([
    {
        name:"Oq",
        code:"white",
        images:[]
    },

    {
        name:"Qora",
        code:"back",
        images:[]
    },

    {
        name:"Qizil",
        code:"red",
        images:[]
    },

    {
        name:"Sariq",
        code:"Yellow",
        images:[]
    },

    {
        name:"Ko'k",
        code:"blue",
        images:[]
    },
    
]);

const selectedColors = ref([]);

const sendFormData = () => {
    emits("result", selectedColors);
}

const clearColor = () => {
    emits("result", selectedColors);
}

</script>

<style lang="scss" scoped></style>