<template>
  <div class="choice-block">
    <ul>
      <li 
        v-for="(choice, cindex) in choices" 
        class="choice"
        :key="cindex" 
        :class="cindex <= listIndex ? 'choice-visible' : ''"
      >
        <input type="radio" :value="cindex" v-model="chosen">
        <label>{{ choice.text }}</label>
      </li>
    </ul>
    <div v-if="chosen != null">
      <p>
        <SlideLine 
          :id="`${id}-${chosen}`"
          :text="choices[chosen].result.text" 
          @complete="doneResult = 1"
        />
      </p>
      <button v-if="doneResult" @click="toNext">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFadeInList } from '../composables/fadeInList';
import SlideLine from './SlideLine.vue';

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  choices: {
    type: Array,
    default: () => { return [] }
  },
  preWait: {
    type: Number,
    default: 0
  },
  wordWait: {
    type: Number,
    default: 600
  },
  postWait: {
    type: Number,
    default: 0
  }
});

const emits = defineEmits("complete");

const chosen = ref(null);
const doneResult = ref(0);
const choices = computed(() => {
  return props.choices;
});

const { listIndex } = useFadeInList(choices, props, () => { return; });

onMounted(() => {
  console.log("mounted choices?");
})

const toNext = () => {
  emits("complete");
};
</script>

<style>
.choice-block {
  list-style-type: 0;
  padding-left: 0;
}

.choice {
  display: block;
  opacity: 0;
}

.choice-visible {
  opacity: 1;
  transition: 0.3s opacity;
}

.choice-auto {
  opacity: 1;
  transition: none;
}
</style>