<template>
  <form class="search-form">
    <input
      type="text"
      class="search-input"
      placeholder="Search Item"
      v-model="searchText"
      @keyup="$emit('searchedList',searchText)"
      required
    />
  </form>
</template>
<script setup>
import { ref, defineEmits } from "vue";

const searchText = ref("");


defineEmits(["searchedList"]);
</script>
