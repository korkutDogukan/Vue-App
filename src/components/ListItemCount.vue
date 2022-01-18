<template>
  <span>Listede {{ itemCount }} adet item vardır.</span>
</template>
<script setup>
import { inject } from "vue";
import { computed } from "vue";
const itemList = inject("itemList");

const itemCount = computed(() => {
  return itemList.value.length;
});
</script>
