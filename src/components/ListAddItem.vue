<template>
  <div>
    <h3><i class="fas fa-list-ul"></i> Todo List</h3>
    <form>
      <input
        @keydown.enter="addItem"
        type="text"
        class="input-box"
        placeholder="Add Item"
        required
        v-model="addText"
      />
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { inject } from "vue";
import swal from "sweetalert";

const store = useStore();

const itemList = inject("itemList");
const addText = ref("");

const addItem = () => {
  if (addText.value.length > 0) {
    const obj = itemList.value.find((item) => item.text === `${addText.value}`);
    if (itemList.value.includes(obj)) {
      swal("The element you want to add already exists.");
    } else {
      itemList.value.push({
        id: new Date().getTime(),
        text: addText.value,
        itemId: new Date().getTime()+1,
        userId: store.state.user.id,
      });
      axios.post("http://localhost:3000/itemList", {
        id: new Date().getTime(),
        text: addText.value,
        itemId: new Date().getTime()+1,
        userId: store.state.user.id,
      });
      addText.value = "";
    }
  } else {
    swal("Please fill in the blanks!!!");
  }
};
</script>
