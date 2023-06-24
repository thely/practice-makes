<template>
    <template v-for="(word, index) in sentence" :key="index">
      <span 
        class="word" 
        :class="{
          'word-visible': index < listIndex,
          'word-auto': props.wordWait == 0
        }"
      >
          {{ word }}&nbsp;
      </span>
    </template>
</template>

<script setup>
import { computed } from 'vue';
import { useFadeInList } from '../composables/fadeInList.js';

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  text: {
    type: String,
    default: ""
  },
  preWait: {
    type: Number,
    default: 0
  },
  wordWait: {
    type: Number,
    default: 150
  },
  postWait: {
    type: Number,
    default: 500
  },
  style: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["complete"]);

// const wordIndex = ref(-1);
const sentence = computed(() => {
  return props.text.split(" ");
});

const { listIndex } = useFadeInList(sentence, props, () => { 
  emits("complete"); 
  console.log("done with postwait?");
});

console.log(listIndex, listIndex.value);

</script>

<style>
.slide-line {
  display: inline;
}
.word {
  display: inline-block;
  opacity: 0;
}

.word-visible {
  opacity: 1;
  transition: 0.3s opacity;
}

.word-auto {
  opacity: 1;
  transition: none;
}
</style>