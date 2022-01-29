<template>
  <div class="listContent">
    <div class="todoListContainer">
      <ListAddItem></ListAddItem>
      <List></List>
      <div class="itemCount">
        <ListItemCount></ListItemCount>
      </div>
    </div>
  </div>
</template>
<script setup>
import ListAddItem from "@/components/ListAddItem";
import List from "@/components/List";
import ListItemCount from "@/components/ListItemCount";

import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { provide } from "vue";

const store = useStore();

const itemList = ref([]);

axios
  .get(`http://localhost:3000/itemList?userId=${store.state.user.id}`)
  .then((get_response) => {
    itemList.value = get_response.data;
  });
provide("itemList", itemList);
</script>
