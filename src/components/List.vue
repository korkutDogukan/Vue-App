<template>
  <ul>
    <li v-for="(item, index) in itemList" :key="index">
      <span><i class="fas fa-angle-right"></i> {{ item.text }}</span>
      <div class="btnGroups">
        <button
          @click.prevent="favItem(item, $event.currentTarget)"
          class="btnGroups1"
          v-html="text"
        ></button>
        <button @click="infoItem(item)" class="btnGroups2">
          <i class="fas fa-info"></i>
        </button>
        <button @click="deleteItem(item)" class="btnGroups3">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { inject } from "vue";
import axios from "axios";
import swal from "sweetalert";
import { useStore } from "vuex";

const store = useStore();
const itemList = inject("itemList");
const text = '<i class="fas fa-star"></i>';
const favItemList = ref([]);

axios.get("http://localhost:3000/favList").then((get_response) => {
  favItemList.value = get_response.data;
});

const favItem = (item, target) => {
  let list = target.classList;
  console.log(item);
  if (list.contains("btnColor")) {
    list.remove("btnColor");
    list.add("btnGroups1");
    axios.delete(`http://localhost:3000/favList/${item.id}`);
  } else {
    list.remove("btnGroups1");
    list.add("btnColor");
    axios.post("http://localhost:3000/favList", item).then((post_response) => {
      console.log(post_response.data);
    });
  }
};

const infoItem = (item) => {
  swal(
    `Item Text : ${item.text} \nItem ID : ${item.itemId} \nThe user who added the item : ${store.state.user.userName} \n`
  );
};

const deleteItem = (item) => {
  axios.delete(`http://localhost:3000/itemList/${item.id}`);
  itemList.value = itemList.value.filter((i) => i != item);
};
</script>
