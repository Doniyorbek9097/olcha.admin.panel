<script setup>
const nodes = [
    {
        label:"Elektironika",
        children: [
            {
                label: "Telefonlar",
                children: [
                    {
                        label: "Uyali Telefonlar",
                        children: [
                            {
                                label: "Samsung",
                                children: [{
                                    children:[]
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const { countNestedChildren } = useHelpers();

const nodesChildrenLength = NestedChildren(nodes);

</script>

<template>

<div class="wrapper">
    <div class="AllList">
        {{ nodesChildrenLength }}
        <!-- <div class="list" v-for="node in nodes">
            <pre>{{ node }}</pre>
        </div> -->
    </div>
</div>

</template>