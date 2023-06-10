<template>
    <template v-for="(word, index) in sentence" :key="index">
      <span v-show="index < wordIndex" class="word">{{ word }}&nbsp;</span>
    </template>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
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

const wordIndex = ref(-1);
const sentence = computed(() => {
  return props.text.split(" ");
});
const isFinished = computed(() => {
  return wordIndex.value - 1 >= sentence.value.length;
});

onMounted(() => {
  console.log("mounted", props.text);
  init();
});

watch(() => props.id, (newV) => {
  console.log(newV);
  if (newV) {
    wordIndex.value = 0;
    init();
  }
});

const init = () => {
  setTimeout(() => {
    // if (props.wordWait == 0) {
    //   wordIndex.value = sentence.value.length - 1;

    //   setTimeout(() => {
    //     emits("complete");
    //   }, props.postWait);
    // } else {
      startInterval();
    // }
  }, props.preWait);
}

const startInterval = () => {
  const interval = setInterval(() => {
    if (isFinished.value) {
      clearInterval(interval);

      setTimeout(() => {
        emits("complete");
      }, props.postWait);
    } 
    
    else {
      wordIndex.value++;
    }
  }, props.wordWait);
}
</script>

<style>
.slide-line {
  display: inline;
}
.word {
  display: inline-block;
}
</style>