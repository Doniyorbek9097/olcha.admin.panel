<template>
  <div>
    <!-- <NuxtLoadingIndicator  color="lime"/> -->
    <Loading/>
    <NuxtLayout name="default">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>

</script>

<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}


::-webkit-scrollbar {
  display: none;
}



</style>