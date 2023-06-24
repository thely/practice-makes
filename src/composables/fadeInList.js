import { ref, computed, onMounted, watch } from "vue";

// the list you pass in should be computed
export function useFadeInList(list, props, callback) {
  console.log(props.id, props.preWait, props.wordWait, props.postWait);
  console.log(list.value);
  const index = ref(-1);

  const isFinished = computed(() => {
    return index.value >= list.value.length;
  });
  
  onMounted(() => {
    init();
  });
  
  watch(() => props.id, (newV) => {
    if (newV) {
      index.value = 0;
      init();
    }
  });

  const init = () => {
    setTimeout(() => {
      startTimeouts();
      // }
    }, props.preWait);
  }

  const startTimeouts = () => {
    const opt = optionalWordWait(index.value);
    if (isFinished.value) {
      setTimeout(() => {
        callback();
      }, props.postWait);
    } 
    
    else {
      index.value++;
      // console.log(props.wordWait + opt)
      setTimeout(startTimeouts, props.wordWait + opt);
    }
  }

  // const startInterval = () => {
  //   const interval = setInterval(() => {
  //     if (isFinished.value) {
  //       clearInterval(interval);

  //       setTimeout(() => {
  //         callback();
  //       }, props.postWait + optionalWordWait(list.value[index.value]));
  //     } 
      
  //     else {
  //       index.value++;
  //       // console.log(index.value);
  //     }
  //   }, props.wordWait);
  // }

  const optionalWordWait = (listVal) => {
    const val = list.value[listVal];
    let len = 0;
    console.log(val);

    if (typeof val == "string") {
      len += val.length * 10;
    } else {
      return 0;
    }

    if (val.match(/[,:)]/)) {
      console.log("middle punc!");
      len += 250;
    } else if (val.match(/[?!.;]/)) {
      console.log("end punc!");
      len += 400;
    }

    return len;
  };

  return { listIndex: index };
}