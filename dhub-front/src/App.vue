<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<style>
/* 全局应用样式 */
#app {
  min-height: 100vh;
}
</style>
