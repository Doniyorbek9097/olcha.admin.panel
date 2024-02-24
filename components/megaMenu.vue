<script setup>
const props = defineProps({
    modelValue: {
        type:Boolean,
        default:false
    },
    nodes: {
        type: Array,
        default: []
    }
});

const emits = defineEmits(['update:modelValue'])

const locale = useLocalePath();

const nodes = ref(props.nodes);
const subNodes = ref([]);

const title = ref("");
const active = ref(false)

const OpenMenu = (node) => {
    active.value = !active.value;
    subNodes.value = node.children;
}

const backMenu = () => active.value = false;
</script>

<template>
<div>
<Transition name="slide-fade">
    <aside v-bind="$attrs" v-if="props.modelValue">
<div class="flex items-center flex-nowrap justify-between h-[30px] border-b-2" style="padding:10px;" >
        <div>
            <div @click="backMenu" v-if="active">
                <i class="fa fa-angle-left"></i>
                <span class="title" >Back </span>
            </div>
        </div>
        
        <div @click="emits('update:modelValue', false)">
            <i class="fa fa-close"></i>
        </div>
    </div>


<div class="menu" v-for="node, index in nodes">
    <div class="label" @click="OpenMenu(node)">
        <slot name="node" :node="node" />
        <i class="fa-solid fa-angle-right"></i>
    </div>
</div>

<div class="subMenu" :class="{ 'active': active }">
    <div class="flex items-center justify-center p-10" v-if="!subNodes.length">
        Hech narsa topilmadi
    </div> 
    <div v-for="node, index in subNodes" class="label">
        <slot name="sub" :sub="node" :title="setTitle"/>
        <div v-for="child in node.children">
            <slot name="child" :child="child" />
        </div>
    </div>

</div>

</aside>
</Transition>

<main v-if="props.modelValue" @click="emits('update:modelValue', false)" class="bg-[#00000015] w-full h-full absolute top-0 left-0 z-[9998]"></main>
</div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

aside {
    width: 100%;
    min-height: 100vh;
    max-width: 300px;
    background-color: white;
    overflow: hidden;
    position: fixed;
    cursor: pointer;
    box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.42);
    z-index: 9999;
    top: 0;
}



aside .menu > .label {
    padding: 10px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.365);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

aside .subMenu {
    background: white;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 40px;
    right: -100%;
    transition: .5s;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
}


aside .subMenu > .label {
    padding: 10px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.365);
    display: flex;
    flex-direction: column;
    gap: 5px;
}



aside .subMenu.active {
    right: 0;
}



/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

</style>