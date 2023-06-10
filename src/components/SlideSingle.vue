<template>
  <div class="slide-single" :class="`type-${props.type}`">
    <template v-for="(line, index) in lines" :key="index">
      <h1 v-if="line.type == 'title'">
        <SlideLine v-bind="line" @complete="nextLine"/>
      </h1>
      <p v-if="line.type == 'text'">
        <SlideLine v-bind="line" @complete="nextLine"/>
      </p>
      <SlideChoices v-if="line.type == 'choices'" v-bind="line" @complete="nextLine"/>
    </template>
    <!-- {{ lines }} -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import SlideLine from './SlideLine.vue';
import SlideChoices from './SlideChoices.vue';
const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "black",
  },
  lines: {
    type: Array,
    default: () => { return []; }
  },
  postWait: {
    type: Number,
    default: 1500
  }
});

const emits = defineEmits(["complete"]);

const lineIndex = ref(0);
const lines = computed(() => {
  return props.lines.slice(0, lineIndex.value + 1);
});

const nextLine = () => {
  lineIndex.value++;

  if (lineIndex.value >= lines.value.length) {
    setTimeout(() => {
      emits("complete", false);
    }, props.postWait);
  }
};

watch(() => props.lines, (newV) => {
  console.log(newV);
  if (newV) {
    lineIndex.value = 0;
  }
});
</script>

<style>
.slide-single {
  display: block;
  font-size: 1.7rem;
  padding: 12.5vh 12.5vw;
  height: 100vh;
  width: 100vw;
}

.slide-single.type-white {
  background-color: white;
  color: rgb(48, 181, 48);
}

.slide-single p {
  margin-bottom: 1em;
}
</style>