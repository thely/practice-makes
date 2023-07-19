<template>
  <div class="slide-single" :class="`type-${props.type}`">
    <template v-for="(line, index) in lines" :key="index">
      <h1 v-if="line.type == 'title'">
        <SlideLine v-bind="line" @complete="nextLine"/>
      </h1>
      <p 
        v-if="line.type == 'text'"
        class="line-para"
        :style="`--line-left: ${styles[index]}%`"
      >
        <SlideLine v-bind="line" @complete="nextLine"/>
        </p>
      <SlideChoices v-if="line.type == 'choices'" v-bind="line" @complete="nextLine"/>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from 'vue';
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
    default: 2000
  },
  left: {
    type: Number,
    default: 0
  }
});

const emits = defineEmits(["complete"]);

const lineIndex = ref(0);
const lines = computed(() => {
  return props.lines.slice(0, lineIndex.value + 1);
});
const styles = reactive([]);

const nextLine = () => {
  lineIndex.value++;

  if (lineIndex.value >= lines.value.length) {
    setTimeout(() => {
      emits("complete", false);
    }, props.postWait);
  }
};

onMounted(() => {
  styleGen();
});

watch(() => props.lines, (newV) => {
  console.log(newV);
  if (newV) {
    styleGen();
    lineIndex.value = 0;
  }
});

const styleGen = () => {
  props.lines.forEach((_elem, index) => {
    styles[index] = Math.random() * 20 * (index % 2);
  });
}
</script>

<style>
.slide-single {
  display: block;
  /* font-size: max(1.7rem, 16px); */
  font-size: clamp(1.7rem, 2vw, 4.5rem);
  /* padding: 12.5vh 12.5vw; */
  /* padding: 12.5vh 4vw; */
  padding: 12vh clamp(6rem, 13vw, 12rem);
  height: 100%;
  width: 100%;
}

.slide-single.type-white {
  background-color: white;
  color: rgb(48, 181, 48);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.slide-single.type-white h1 {
  /* font-size: clamp(10rem, 21vw, 30rem); */
  font-size: clamp(10rem, 27vw, 30rem);
  line-height: 0.8;
  letter-spacing: min(-30px, -3rem);
  text-align: center;
}

.slide-single .line-para {
  --line-width: 70%;
  --line-left: 0%;
  margin-bottom: 1em;
  margin-left: var(--line-left);
  width: var(--line-width);
}
</style>