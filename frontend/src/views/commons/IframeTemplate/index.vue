<template>
  <div></div>
</template>
<script setup>
import {createApp, onMounted, reactive} from 'vue'
import Vue from '../../../assets/js/vue.global.js'
onMounted(() => {
  window.Vue = Vue
  window.reactive = reactive
  window.createApp = createApp
})


</script>

<style>

</style>