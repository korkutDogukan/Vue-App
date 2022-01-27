<template>
  <ul>
    <li v-for="(item, index) in itemList" :key="index">
      <span :class="favTextChange"
        ><i class="fas fa-angle-right"></i> {{ item.text }}</span
      >
      <div class="btnGroups">
        <button @click="favItem(item)" :class="favBtnChange" class="btnGroups1">
          <i class="fas fa-star"></i>
        </button>
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
import { ref, computed } from "vue";
import { inject } from "vue";
import axios from "axios";
import swal from "sweetalert";
import { useStore } from "vuex";

const store = useStore();
const itemList = inject("itemList");

const favStyle = ref(false);

const favTextChange = computed(() => {
  return { textYellow: favStyle.value };
});

const favBtnChange = computed(() => {
  return { btnColor: favStyle.value };
});

const favItem = (item) => {
  console.log(item);
  favStyle.value = !favStyle.value;
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
