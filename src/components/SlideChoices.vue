<template>
  <div class="choice-block">
    <ul>
      <li v-for="(choice, cindex) in props.choices" :key="cindex">
        <input type="radio" :value="cindex" v-model="chosen">
        <label>{{ choice.text }}</label>
      </li>
    </ul>
    <div v-if="chosen != null">
      <p>
        {{ choices[chosen].result.text }}
      </p>
      <button @click="toNext">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  choices: {
    type: Array,
    default: () => { return [] }
  }
});

const emits = defineEmits("complete");

let chosen = ref(null);

watch(chosen, (newV) => {
  console.log(newV);
});

const toNext = () => {
  emits("complete");
};
</script>

<style lang="scss">

</style>