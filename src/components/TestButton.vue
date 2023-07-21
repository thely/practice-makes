<template>
  <button class="test-white-button" @click="flipScreen">Test</button>
</template>

<script setup>
import { onBeforeUnmount } from 'vue';

const emit = defineEmits(["pressed"]);

const flipScreen = () => {
  document.querySelector(".slide-single").classList.toggle("type-test");
  emit("pressed");
}

onBeforeUnmount(() => {
  // console.log("do I die?");
  document.querySelector(".slide-single").classList.remove("type-test");
});

</script>

<style>
.type-test {
  background-color: white;
  color: black;
}
</style>