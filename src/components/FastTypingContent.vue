<template>
  <div class="fastTypingContent">
    <div v-if="!isFinish" class="fastTypingCard">
      <h3>Fast Typing Contest</h3>
      <p>Test How Fast You Are</p>
      <hr />
      <div class="fastTypingWords">
        <div>
          <span
            v-for="(word, index) in words.filter((word, index) => index < 10)"
            :key="index"
            :class="index === 0 ? writingWordBG : null"
          >
            {{ word }}
          </span>
        </div>
      </div>
      <div class="inputGroup">
        <input type="text" v-model="writingWord" required />
        <span>{{ timer }} sec</span>
        <button :disabled="isRunning" @click="getWord">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
    <div v-else class="resultCard">
      <h1>Time is over <i class="fas fa-hourglass-half"></i></h1>
      <h3>{{ wpnCount }} WPN</h3>
      <p class="wpn">(words per minute)</p>
      <p>Accuracy : <span style="color: rgb(131, 156, 19)">{{accuracyRate}}%</span></p>
      <p>
        Correct Word :
        <span style="color: rgb(46, 148, 71)">{{ trueCount }}</span>
      </p>
      <p>
        Wrong Word :
        <span style="color: rgb(139, 35, 22)">{{ falseCount }}</span>
      </p>
      <button @click="playAgain">
        Play Again <i class="fas fa-play-circle"></i>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import wordList from "@/assets/words.json";

const words = ref([]);

const writingWord = ref("");
const isTrue = ref(true);
const trueCount = ref(0);
const falseCount = ref(0);
const timer = ref(60);
const interval = ref(false);
const isRunning = ref(false);
const isFinish = ref(false);

watch(writingWord, (val) => {
  if (!val || val === " ") {
    writingWord.value = "";
    isTrue.value = true;
    return;
  }

  if (!isRunning.value) {
    toggleTimer();
  }

  const word = words.value[0].slice(0, val.length);
  const userWord = val.replace(" ", "");
  isTrue.value = word.toLowerCase() === userWord.toLowerCase();

  if (val.indexOf(" ") !== -1) {
    isTrue.value ? trueCount.value++ : falseCount.value++;
    words.value.splice(0, 1);
    writingWord.value = "";
    isTrue.value = true;
  }
});

const toggleTimer = () => {
  isRunning.value = true;
  interval.value = setInterval(() => {
    timeProccess();
  }, 1000);
};

const timeProccess = () => {
  if (timer.value === 0) {
    writingWord.value = "";
    isFinish.value = true;
    clearInterval(interval.value);
    return;
  } else {
    timer.value--;
  }
};

const getWord = () => {
  words.value = wordList.sort(() => Math.random() - 0.5).splice(0, 300);
};

getWord();

const playAgain = () => {
  getWord();
  isFinish.value = false;
  timer.value = 60;
  isTrue.value = true;
  isRunning.value = false;
};

const writingWordBG = computed(() => {
  return isTrue.value ? "writingWordBG" : "falseWord";
});

const wpnCount = computed(() => {
  return 300 - words.value.length;
});

const accuracyRate = computed(() => {
  const totalCount = trueCount.value + falseCount.value;
  return 100 / (totalCount / trueCount.value);
});
</script>