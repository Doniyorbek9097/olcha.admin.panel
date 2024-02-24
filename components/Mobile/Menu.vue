
<script setup>
const props = defineProps({
    nodes: {
        type: Array,
        default: []
    }
})


const { countNestedChildren } = useHelpers();
const locale = useLocalePath();

const title = ref("Asosiy Menu");
const isOpenMenu = ref(false);

const OpenMenu = (label) => {
    isOpenMenu.value = !isOpenMenu.value;
    isOpenMenu.value ? title.value = label : title.value = "Asosiy Menu";
}

const children = ref([]);



</script>

<template>
    <aside v-bind="$attrs">
        <div class="header">
            <div class="back" @click="() => isOpenMenu = true ? isOpenMenu = false : title.value = 'Asosiy Menu'">
                <i class="fa fa-angle-left"></i>
            </div>
            <div class="title">
                {{ title }}
            </div>
            <div class="close">
                <q-icon name="close" />
            </div>
        </div>

        <div class="menu" v-for="node, index in props.nodes">
            <MobileMenuItem :node="node">
                <template #node="{ node }">
                    <div class=" flex justify-between items-center text-bold" style="padding: 10px" @click="openMenuList()">
                        <span>{{ node.label }}</span>
                        <i class="fa-solid fa-angle-right"></i>
                    </div>

                    <div class="w-full" v-for="child in node.children">
                        <MobileMenuItem :node="child">
                            <template #node="{ node }">
                                <div class=" flex justify-between items-center" style="padding: 10px">
                                    <span>{{ node.label }}</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </div>

                            </template>
                        </MobileMenuItem>
                    </div>
                </template>
            </MobileMenuItem>
            <!-- <div class="subMenu" :class="{'active':isOpenMenu}">
        {{ index }}
        {{ node.children[0].label }}
        <div class="label">
            <slot name="subnode" :subnode="node.children[index]"/>
        </div>

        <div class="childMenu" v-for="childNode in node.children[index].children">
            <div class="label">
                <slot name="childnode" :childnode="childNode"/>
            </div>
        </div>

    </div> -->
        </div>
    </aside>
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
    border: 1px solid;
}

aside .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
}


aside .header .back {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid;
}

aside .header .title {
    font-weight: bolder;
}

aside .header .close {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid;
}



aside .menu {
    position: relative;
}

aside .menu>.label {
    padding: 10px;
    font-weight: bold;
    border-bottom: 1px solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

aside .subMenu {
    background: white;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: -100%;
    transition: .5s;
}

aside .subMenu>.label {
    font-weight: bold;
    display: block;
    margin: 10px 0;
    padding: 0 10px;
}


aside .subMenu.active {
    right: 0;
}

aside .childMenu>.label {
    padding: 0 10px;
}
</style>