<template>
  <main>
    <!-- <template v-for="(slide, index) in slides" :key="index"> -->
    <SlideSingle v-bind="slides[slideIndex]" @complete="nextSlide" />
    <!-- </template> -->
    <button class="nextButton" v-if="!autoplay" @click="nextSlide">Next</button>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import slidesBase from './data/lines.json';
import SlideSingle from './components/SlideSingle.vue';

const slideIndex = ref(0);
const autoplay = ref(true);

const slides = computed(() => {
  slidesBase.forEach((slide, i) => {
    slide.id = `${i}`;

    // add some prewait if we're exiting a white slide
    if (i > 0 && slidesBase[i - 1].type == "white") {
      if (slide.lines[0].type) {
        // if we have a title, prewait the first line of text (2nd thing)
        slide.lines[1].preWait = 500;
      } else {
        // if no title, prewait the first line (1st thing)
        slide.lines[0].preWait = 500;
      }
    }

    // if (slide.lines[0].type && slide.lines[0].type == "title" && !("wordWait" in slide.lines[0])) {
    //   slide.lines[0].wordWait = 500;
    // }

    slide.lines.forEach((line, j) => {
      line.id = `${i}-${j}`;
      if (!("type" in line)) {
        line.type = "text";
      }

      // if we're on the last line of a slide,
      // don't make the slide postwait longer
      if (j == slide.lines.length - 1) {
        if (!("postWait" in line)) {
          line.postWait = 0;
        }

        // if that last line is a choices,
        // don't make the whole slide wait after the "next" btn
        if (line.type == "choices") {
          slide.postWait = 0;
        }
      }

      // if we're on a white slide, we shouldn't
      // be waiting for the text to appear
      if (slide.type && slide.type == "white") {
        if (!("wordWait" in line)) {
          line.wordWait = 0;
        }
      }
    });
  });
  return slidesBase;
});

const nextSlide = (e) => {
  console.log(e);

  if (!e) {
    // if we came from a finished slide and autoplay is on, proceed
    slideIndex.value += autoplay.value ? 1 : 0;
  } else {
    // we've clearly clicked a button
    slideIndex.value++;
  }
};
</script>

<style>
.nextButton {
  position: absolute;
  bottom: 0;
}
</style>
