
<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },

    nodes: {
        type: Array,
        default: []
    }
})

const emits = defineEmits(['update:modelValue'])


const { countNestedChildren } = useHelpers();
const locale = useLocalePath();

const title = ref("Asosiy Menu");
const isOpenMenu = ref(false);

const OpenMenu = (label) => {
    isOpenMenu.value = !isOpenMenu.value;
    isOpenMenu.value ? title.value = label : title.value = "Asosiy Menu";
}

const step = ref(2);

</script>

<template>
    <Transition name="slide-fade">
        <aside v-bind="$attrs" v-if="props.modelValue" class=" min-w-[300px] h-screen fixed top-0 left-0 z-[9999] bg-white">

            <div class="flex items-center flex-nowrap justify-between  border-b-2" style="padding:10px;">
                <div class=" text-2xl text-red">OLcha.uz</div>

                <div @click="emits('update:modelValue', false)" class="!p-2 text-lg text-red absolute top-0 right-0">
                    <i class="fa fa-close"></i>
                </div>
            </div>

            <div class="menu absolute w-full h-full bg-white">
                <div class="menu-item" v-for="parent, index in  props.nodes ">
                    <MobileMenuItem :node="parent">
                        <template #node="{ node: parent, active, show: showMenu1 }">
                            <div class="btn w-full flex items-center justify-between flex-nowrap" @click="showMenu1(true)">
                                <b class="flex items-center">
                                    <img :src="parent.image" alt="" width="30px">
                                    {{ parent.name }}
                                </b>
                                <i class="fa-solid fa-angle-right"></i>
                            </div>

                            <div :class="[active ? 'left-0 transition-all duration-[.5s]' : 'transition-all duration-[.5s] -left-[100%]']"
                                class="sub-menu absolute top-0  w-full h-full bg-white">
                                <div class="!p-2 border-b-2 flex gap-1 items-center" @click="showMenu1(false)">
                                    <i class="fa fa-angle-left"></i>
                                    <b>Orqaga qaytish</b>
                                </div>
                                <div class="!p-2 border-b-2 flex gap-2 items-center">
                                    <b>Barcha {{ parent.name }}</b>
                                </div>
                                <div class="sub-menu-item" v-for=" sub in parent.children">
                                    <MobileMenuItem :node="sub" :title="parent.name">
                                        <template #node="{ node: sub, active, show: showMenu2 }">
                                            <div class="btn w-full flex items-center justify-between flex-nowrap"
                                                @click="showMenu2(true)">
                                                <b class="flex items-center">
                                                    {{ sub.name }}
                                                </b>
                                                <i class="fa-solid fa-angle-right"></i>
                                            </div>

                                            <div :class="[active ? 'left-0 transition-all duration-[.5s]' : 'transition-all duration-[.5s] -left-[100%]']"
                                                class="child-menu top-0 absolute w-full h-full bg-white">

                                                <div class="!p-2 border-b-2 flex gap-1 items-center"
                                                    @click="showMenu2(false)">
                                                    <i class="fa fa-angle-left"></i>
                                                    <b>Orqaga qaytish</b>
                                                </div>
                                                <div class="!p-2 border-b-2 flex gap-2 items-center">
                                                    <b>Barcha {{ sub.name }}</b>
                                                </div>

                                                <div class="child-menu-item" v-for=" child  in  sub.children ">
                                                    <MobileMenuItem :node="child">
                                                        <template #node="{ node: child, active, show: showMenu3 }">
                                                            <b class="flex items-center">
                                                                {{ child.name }}
                                                            </b>
                                                        </template>
                                                    </MobileMenuItem>
                                                </div>
                                            </div>


                                        </template>
                                    </MobileMenuItem>


                                </div>

                            </div>
                        </template>
                    </MobileMenuItem>

                </div>
            </div>
        </aside>
    </Transition>
    <main v-if="props.modelValue" @click="emits('update:modelValue', false)"
        class=" bg-[#0000003e] w-full h-full absolute top-0 left-0 z-[9998]"></main>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

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