<template>
  <span>Listede adet item vardır.</span>
  <button @click="selam">selam</button>
</template>
<script setup>
import { inject } from "vue";
// import { computed } from "vue";
const searchedList = inject("searchedList");
const selam = () => {
  console.log(searchedList);
};
// const searchedListCount = computed(() => {
//   return searchedList.value.length;
// });
</script>
