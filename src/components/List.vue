<template>
  <div>
    <SearhListInput
      :itemList="itemList"
      @searchedList="searchItem"
    ></SearhListInput>
    <ul v-if="searchedList.length == 0 && searchedText.length == 0">
      <li v-for="(item, index) in itemList" :key="index">
        <span><i class="fas fa-angle-right"></i> {{ item.text }}</span>
        <div class="btnGroups">
          <button
            @click.prevent="favItem(item, $event.currentTarget)"
            :class="favItemIdList.includes(item.itemId) ? btnColor : btnGroups1"
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
    <ul v-else>
      <li v-for="(item, index) in searchedList" :key="index">
        <span><i class="fas fa-angle-right"></i> {{ item.text }}</span>
        <div class="btnGroups">
          <button
            @click.prevent="favItem(item, $event.currentTarget)"
            :class="favItemIdList.includes(item.itemId) ? btnColor : btnGroups1"
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
  </div>
</template>

<script setup>
import SearhListInput from "./SearchListInput.vue";
import { ref, computed } from "vue";
import { inject } from "vue";
import axios from "axios";
import swal from "sweetalert";
import { useStore } from "vuex";

const store = useStore();
const itemList = inject("itemList");
const text = '<i class="fas fa-star"></i>';
const favItemIdList = ref([]);
axios
  .get(
    `http://localhost:3000/favList?userId=${store.getters._getCurrentUser.id}`
  )
  .then((get_response) => {
    for (let i = 0; i < get_response.data.length; i++) {
      favItemIdList.value.push(get_response.data[i].itemId);
    }
  });

const favItem = (item, target) => {
  let list = target.classList;
  if (list.contains("btnColor")) {
    list.remove("btnColor");
    list.add("btnGroups1");
    axios.delete(`http://localhost:3000/favList/${item.id}`);
  } else {
    list.remove("btnGroups1");
    list.add("btnColor");
    axios.post("http://localhost:3000/favList", item);
  }
};

const btnColor = computed(() => {
  return "btnColor";
});

const btnGroups1 = computed(() => {
  return "btnGroups1";
});

const infoItem = (item) => {
  swal(
    `Item Text : ${item.text} \nItem ID : ${item.itemId} \nThe user who added the item : ${store.state.user.userName} \n`
  );
};

const deleteItem = (item) => {
  axios
    .get(`http://localhost:3000/favList?itemId=${item.itemId}`)
    .then((get_response) => {
      if (get_response.data.length > 0) {
        swal("You can not delete your favorite item!!!");
      } else {
        axios.delete(`http://localhost:3000/itemList/${item.id}`);
        itemList.value = itemList.value.filter((i) => i != item);
      }
    });
};

const searchedList = ref([]);
const searchedText = ref("");
const searchItem = (searchText) => {
  searchedText.value = searchText;
  searchedList.value = itemList.value.filter((item) =>
    item.text.includes(searchText)
  );
};
</script>
