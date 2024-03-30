<template>
    <div v-if="show" class="loading-wrapper">
        <div class="pulse-container">
            <div class="pulse-bubble pulse-bubble-1"></div>
            <div class="pulse-bubble pulse-bubble-2"></div>
            <div class="pulse-bubble pulse-bubble-3"></div>
        </div>
    </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const show = ref(false);

addRouteMiddleware('global-loader', () => {
    show.value = true
}, {
    global: true
})

nuxtApp.hook('page:finish', () => { show.value = false; })
</script>


<style scoped>
.loading-wrapper {
    display: flex;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    background: rgba(245, 242, 242, 0.836);
}

.pulse-container {
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pulse-bubble {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
}

.pulse-bubble-1 {
    animation: pulse .4s ease 0s infinite alternate;
}

.pulse-bubble-2 {
    animation: pulse .4s ease .2s infinite alternate;
}

.pulse-bubble-3 {
    animation: pulse .4s ease .4s infinite alternate;
}



@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
}


</style>