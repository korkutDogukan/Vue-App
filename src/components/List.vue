<template>
  <ul>
    <li v-for="item in itemList" :key="item.id">
      <span><i class="fas fa-angle-right"></i> {{ item.text }}</span>
      <div class="btnGroups">
        <button class="btnGroups1">
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
// import { ref } from "vue";
import { inject } from "vue";
import axios from "axios";
import swal from "sweetalert";
import { useStore } from "vuex";

const store = useStore();
const itemList = inject("itemList");

// const itemText = ref("");

// const textYellowValue = ref(false);

// const favItem = (item) => {
  // axios.get("http://localhost:3000/favList").then((get_response) => {
  //   const obj = get_response.data.find((i) => i.text === `${item.text}`);
  //   if (get_response.data.includes(obj)) {
  //     textYellowValue.value = false;
  //     axios.delete(`http://localhost:3000/favList/${item.id}`);
  //   } else {
  //     textYellowValue.value = true;
  //     axios.post(`http://localhost:3000/favList`, {
  //       text: item.text,
  //       itemId: item.itemId,
  //       userId: store.state.user.id,
  //       id: item.id,
  //     });
  //   }
  // });
// };

// const favTextChange = computed(() => {
//   return { textYellow: textYellowValue.value };
// });

// const favBtnChange = computed(() => {
//   return { btnColor: textYellowValue.value };
// });

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
